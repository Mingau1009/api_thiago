<?php
include("../Classe/Conexao.php");

if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST['id'])) {
    // valida e sanitiza o id
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    if (!$id) {
        die("ID inválido.");
    }

    // prepara e executa o DELETE
    $sql = "DELETE FROM funcionario WHERE id = :id";
    $stmt = Db::conexao()->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        // redireciona de volta para a listagem
        header("Location: index.php");
        exit;
    } else {
        echo "<script>alert('Erro ao deletar o funcionario.'); history.back();</script>";
        exit;
    }
} else {
    // acesso direto sem POST → volta pra lista
    header("Location: index.php");
    exit;
}
