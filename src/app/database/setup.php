<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

$host = DB_HOST;
$port = DB_PORT;
$user = DB_USER;
$pass = DB_PASS;
$name = DB_NAME;

$dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
$pdo = null;
$lastError = null;

for ($attempt = 1; $attempt <= 30; $attempt++) {
    try {
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        break;
    } catch (PDOException $e) {
        $lastError = $e;
        error_log("Database is not ready (attempt {$attempt}/30).");
        sleep(2);
    }
}

if (!$pdo) {
    error_log('Database initialization failed: ' . ($lastError ? $lastError->getMessage() : 'unknown error'));
    exit(1);
}

$sql = file_get_contents(__DIR__ . '/schema.sql');

if ($sql === false) {
    error_log('Database schema file could not be read.');
    exit(1);
}

try {
    $pdo->exec($sql);
    echo "Database schema is ready." . PHP_EOL;
} catch (PDOException $e) {
    error_log('Database schema initialization failed: ' . $e->getMessage());
    exit(1);
}
