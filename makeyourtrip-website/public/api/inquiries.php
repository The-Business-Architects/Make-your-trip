<?php
/**
 * MakeYourTrip Inc. — Inquiries API
 * Handles:
 *  - POST (public): Submit inquiry from website form
 *  - GET (admin): List all inquiries with filters & stats
 *  - PUT (admin): Update inquiry status
 *  - OPTIONS: Preflight CORS
 */

require_once __DIR__ . '/config.php';

// Handle CORS Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    http_response_code(200);
    exit;
}

$pdo = getDbConnection();

// Auto-create tables if they don't exist yet
if ($pdo) {
    $schemaFile = __DIR__ . '/schema.sql';
    if (file_exists($schemaFile)) {
        try {
            $pdo->exec(file_get_contents($schemaFile));
        } catch (Exception $e) {
            // ignore if already exists
        }
    }
}

// -------------------------------------------------------------
// Helper: Fallback File Storage if Database is not yet connected
// -------------------------------------------------------------
$fallbackDir = __DIR__ . '/data';
if (!is_dir($fallbackDir)) {
    @mkdir($fallbackDir, 0755, true);
}
$fallbackFile = $fallbackDir . '/inquiries.json';

function getFallbackInquiries($fallbackFile) {
    if (!file_exists($fallbackFile)) return [];
    $content = file_get_contents($fallbackFile);
    return json_decode($content, true) ?: [];
}

function saveFallbackInquiries($fallbackFile, $data) {
    file_put_contents($fallbackFile, json_encode($data, JSON_PRETTY_PRINT));
}

// -------------------------------------------------------------
// Authentication Check for Admin Requests
// -------------------------------------------------------------
function checkAdminAuth() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (strpos($auth, 'Bearer ') === 0) {
        $token = substr($auth, 7);
        // Token check (simple token = base64(admin:pass) or static token)
        $expected = base64_encode(ADMIN_USER . ':' . ADMIN_PASS);
        if ($token === $expected || $token === 'myt_admin_secret_token_2026') {
            return true;
        }
    }
    return false;
}

$method = $_SERVER['REQUEST_METHOD'];

// =============================================================
// POST: Submit Inquiry (Public or Admin created)
// =============================================================
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        sendJsonResponse(['error' => 'Invalid JSON input'], 400);
    }

    // Basic spam honeypot check
    if (!empty($input['_honey'])) {
        sendJsonResponse(['success' => true, 'message' => 'Processed'], 200);
    }

    $fullName = trim($input['fullName'] ?? $input['full_name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $country = trim($input['country'] ?? '');
    $journeyType = $input['journeyType'] ?? $input['journey_type'] ?? 'one-way';
    $legs = $input['legs'] ?? [];
    $returnDate = $input['returnDate'] ?? $input['return_date'] ?? null;
    $adults = intval($input['adults'] ?? 1);
    $children = intval($input['children'] ?? 0);
    $infants = intval($input['infants'] ?? 0);
    $travelClass = $input['travelClass'] ?? $input['travel_class'] ?? 'economy';
    $requirements = trim($input['requirements'] ?? '');
    $source = $input['source'] ?? (checkAdminAuth() ? 'admin_created' : 'website_form');
    $status = 'new';

    if (!$fullName || !$email || !$phone) {
        sendJsonResponse(['error' => 'Missing required fields (fullName, email, phone)'], 422);
    }

    $refCode = 'MYT-' . strtoupper(substr(uniqid(), -6));
    $legsJson = json_encode($legs);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO inquiries 
                (reference_code, full_name, email, phone, country, journey_type, legs_json, return_date, adults, children, infants, travel_class, requirements, status, source)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $refCode, $fullName, $email, $phone, $country, $journeyType, $legsJson, $returnDate,
                $adults, $children, $infants, $travelClass, $requirements, $status, $source
            ]);
            $newId = $pdo->lastInsertId();

            // Auto initial note
            $noteStmt = $pdo->prepare("INSERT INTO inquiry_notes (inquiry_id, admin_name, note) VALUES (?, 'System', ?)");
            $noteStmt->execute([$newId, "Inquiry received via " . ($source === 'admin_created' ? 'Admin Portal' : 'Website Form')]);

            sendJsonResponse([
                'success' => true,
                'reference_code' => $refCode,
                'id' => $newId,
                'message' => 'Inquiry registered successfully'
            ], 201);
        } catch (Exception $e) {
            // If DB error, fallback to JSON
        }
    }

    // Fallback JSON mode
    $list = getFallbackInquiries($fallbackFile);
    $record = [
        'id' => count($list) + 1,
        'reference_code' => $refCode,
        'full_name' => $fullName,
        'email' => $email,
        'phone' => $phone,
        'country' => $country,
        'journey_type' => $journeyType,
        'legs' => $legs,
        'legs_json' => $legsJson,
        'return_date' => $returnDate,
        'adults' => $adults,
        'children' => $children,
        'infants' => $infants,
        'travel_class' => $travelClass,
        'requirements' => $requirements,
        'status' => $status,
        'source' => $source,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
        'notes' => [
            [
                'id' => 1,
                'admin_name' => 'System',
                'note' => 'Inquiry registered via ' . ($source === 'admin_created' ? 'Admin' : 'Website Form'),
                'created_at' => date('Y-m-d H:i:s')
            ]
        ]
    ];
    array_unshift($list, $record);
    saveFallbackInquiries($fallbackFile, $list);

    sendJsonResponse([
        'success' => true,
        'reference_code' => $refCode,
        'id' => $record['id'],
        'message' => 'Inquiry saved successfully (file mode)'
    ], 201);
}

// =============================================================
// GET: Admin Fetch Inquiries (Auth Required)
// =============================================================
if ($method === 'GET') {
    if (!checkAdminAuth()) {
        sendJsonResponse(['error' => 'Unauthorized'], 401);
    }

    $statusFilter = $_GET['status'] ?? 'all';
    $search = trim($_GET['search'] ?? '');
    $inquiryId = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($pdo) {
        try {
            if ($inquiryId) {
                // Fetch single inquiry with notes
                $stmt = $pdo->prepare("SELECT * FROM inquiries WHERE id = ?");
                $stmt->execute([$inquiryId]);
                $item = $stmt->fetch();
                if (!$item) sendJsonResponse(['error' => 'Inquiry not found'], 404);

                $item['legs'] = json_decode($item['legs_json'], true) ?: [];
                $notesStmt = $pdo->prepare("SELECT * FROM inquiry_notes WHERE inquiry_id = ? ORDER BY created_at DESC");
                $notesStmt->execute([$inquiryId]);
                $item['notes'] = $notesStmt->fetchAll();

                sendJsonResponse(['success' => true, 'data' => $item]);
            }

            // List inquiries
            $sql = "SELECT * FROM inquiries WHERE 1=1";
            $params = [];
            if ($statusFilter !== 'all') {
                $sql .= " AND status = ?";
                $params[] = $statusFilter;
            }
            if ($search) {
                $sql .= " AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR reference_code LIKE ?)";
                $wild = "%$search%";
                $params[] = $wild;
                $params[] = $wild;
                $params[] = $wild;
                $params[] = $wild;
            }
            $sql .= " ORDER BY created_at DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll();

            foreach ($rows as &$r) {
                $r['legs'] = json_decode($r['legs_json'], true) ?: [];
            }

            // Fetch notes for all inquiries to support timeline and next activity
            if (!empty($rows)) {
                $ids = array_column($rows, 'id');
                $inQuery = implode(',', array_fill(0, count($ids), '?'));
                $notesStmt = $pdo->prepare("SELECT * FROM inquiry_notes WHERE inquiry_id IN ($inQuery) ORDER BY created_at DESC");
                $notesStmt->execute($ids);
                $allNotes = $notesStmt->fetchAll();

                $notesByInquiry = [];
                foreach ($allNotes as $note) {
                    $notesByInquiry[$note['inquiry_id']][] = $note;
                }

                foreach ($rows as &$r) {
                    $r['notes'] = $notesByInquiry[$r['id']] ?? [];
                }
            }

            // Counts
            $countStmt = $pdo->query("SELECT status, COUNT(*) as cnt FROM inquiries GROUP BY status");
            $counts = [];
            while ($c = $countStmt->fetch()) {
                $counts[$c['status']] = intval($c['cnt']);
            }

            sendJsonResponse([
                'success' => true,
                'data' => $rows,
                'counts' => $counts,
                'total' => count($rows),
                'storage' => 'mysql'
            ]);
        } catch (Exception $e) {
            // fallback
        }
    }

    // Fallback JSON mode
    $list = getFallbackInquiries($fallbackFile);
    if ($inquiryId) {
        foreach ($list as $item) {
            if ($item['id'] === $inquiryId) {
                sendJsonResponse(['success' => true, 'data' => $item]);
            }
        }
        sendJsonResponse(['error' => 'Not found'], 404);
    }

    $filtered = array_filter($list, function($it) use ($statusFilter, $search) {
        if ($statusFilter !== 'all' && ($it['status'] ?? '') !== $statusFilter) return false;
        if ($search) {
            $s = strtolower($search);
            $str = strtolower(($it['full_name'] ?? '') . ' ' . ($it['email'] ?? '') . ' ' . ($it['phone'] ?? '') . ' ' . ($it['reference_code'] ?? ''));
            if (strpos($str, $s) === false) return false;
        }
        return true;
    });

    $counts = [];
    foreach ($list as $it) {
        $st = $it['status'] ?? 'new';
        $counts[$st] = ($counts[$st] ?? 0) + 1;
    }

    sendJsonResponse([
        'success' => true,
        'data' => array_values($filtered),
        'counts' => $counts,
        'total' => count($filtered),
        'storage' => 'json_file'
    ]);
}

// =============================================================
// PUT: Update Inquiry Status or Details (Admin Required)
// =============================================================
if ($method === 'PUT') {
    if (!checkAdminAuth()) {
        sendJsonResponse(['error' => 'Unauthorized'], 401);
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $inquiryId = intval($input['id'] ?? 0);
    $newStatus = $input['status'] ?? null;
    $newNote = trim($input['note'] ?? '');

    if (!$inquiryId) {
        sendJsonResponse(['error' => 'Missing inquiry id'], 400);
    }

    if ($pdo) {
        try {
            if ($newStatus) {
                $stmt = $pdo->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
                $stmt->execute([$newStatus, $inquiryId]);

                $noteStmt = $pdo->prepare("INSERT INTO inquiry_notes (inquiry_id, admin_name, note) VALUES (?, 'Admin', ?)");
                $noteStmt->execute([$inquiryId, "Status updated to: " . strtoupper($newStatus)]);
            }

            if ($newNote) {
                $noteStmt = $pdo->prepare("INSERT INTO inquiry_notes (inquiry_id, admin_name, note) VALUES (?, 'Admin', ?)");
                $noteStmt->execute([$inquiryId, $newNote]);
            }

            sendJsonResponse(['success' => true, 'message' => 'Inquiry updated successfully']);
        } catch (Exception $e) {
            // fallback
        }
    }

    // Fallback JSON mode
    $list = getFallbackInquiries($fallbackFile);
    foreach ($list as &$item) {
        if ($item['id'] === $inquiryId) {
            if ($newStatus) {
                $item['status'] = $newStatus;
                $item['notes'][] = [
                    'id' => count($item['notes'] ?? []) + 1,
                    'admin_name' => 'Admin',
                    'note' => 'Status changed to: ' . strtoupper($newStatus),
                    'created_at' => date('Y-m-d H:i:s')
                ];
            }
            if ($newNote) {
                $item['notes'][] = [
                    'id' => count($item['notes'] ?? []) + 1,
                    'admin_name' => 'Admin',
                    'note' => $newNote,
                    'created_at' => date('Y-m-d H:i:s')
                ];
            }
            $item['updated_at'] = date('Y-m-d H:i:s');
            saveFallbackInquiries($fallbackFile, $list);
            sendJsonResponse(['success' => true, 'message' => 'Updated (file mode)']);
        }
    }

    sendJsonResponse(['error' => 'Inquiry not found'], 404);
}

sendJsonResponse(['error' => 'Method not supported'], 405);
