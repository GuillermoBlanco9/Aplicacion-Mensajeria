<?php
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $usu = update_profile($_POST['name'], $_POST['username'], $_POST['email'], $_POST['user']);
	if($usu===FALSE){ 
        echo "FALSE"; 
    }else{
        //sesion_start();
        //$_SESSION['user'] = $_POST['user'];   
	    echo "TRUE";   
    }  	
} 