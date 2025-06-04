<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'services';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $filter = isset($_GET['filter']) ? $_GET['filter'] : '';
    if ($filter !== '') {
        $stmt = $pdo->prepare("SELECT * FROM services WHERE name LIKE ?");
        $like = '%' . $filter . '%';
        $stmt->execute([$like]);
    } else {
        $stmt = $pdo->query("SELECT * FROM services");
    }
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
