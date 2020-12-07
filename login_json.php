<?php 
require_once 'db.php';
require 'sessions_json.php';
//if(!check_session()) return; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $usu = check_user($_POST['user'], $_POST['password']);
	if($usu===FALSE){ 
        echo "FALSE"; 
    }else{
               
        session_start();		
        $_SESSION['user'] = $usu;
        $_SESSION['pass'] = $_POST['password'];
        echo "TRUE";  
    }  	
} 