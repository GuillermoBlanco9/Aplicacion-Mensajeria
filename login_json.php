<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $usu = check_user($_POST['user'], $_POST['password']);
	if($usu===false){
		$err = true;
		$user = $_POST['user'];
	}else{
		session_start();
		$_SESSION['user'] = $usu;
		header("Location: main.php");
		return;
	}	
} 