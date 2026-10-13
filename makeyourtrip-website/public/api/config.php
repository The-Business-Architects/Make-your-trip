<?php
/**
 * MakeYourTrip Inc. — Database Configuration
 * Hostinger MySQL / MariaDB connection
 */

// Hostinger Database Credentials
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'u497145667_myt_app');
define('DB_USER', getenv('DB_USER') ?: 'u497145667_Rahul_sharma');
define('DB_PASS', getenv('DB_PASS') ?: 'Rahul@Myt5656');

// Admin default credentials (used to auto-seed or simple token auth)
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'MakeYourTrip@2026!'); // Change in production

function getDbConnection() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            return null;
        }
    }
    return $pdo;
}

function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    echo json_encode($data);
    exit;
}
