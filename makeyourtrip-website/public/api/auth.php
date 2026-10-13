<?php
/**
 * MakeYourTrip Inc. — Admin Authentication API
 */

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
$username = trim($input['username'] ?? '');
$password = trim($input['password'] ?? '');

if ($username === ADMIN_USER && $password === ADMIN_PASS) {
    $token = base64_encode(ADMIN_USER . ':' . ADMIN_PASS);
    sendJsonResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'username' => ADMIN_USER,
            'name' => 'MakeYourTrip Administrator'
        ]
    ]);
}

sendJsonResponse(['error' => 'Invalid username or password'], 401);
