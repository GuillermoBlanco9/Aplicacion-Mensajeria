<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $usu = get_conversation($_POST['user'], $_POST['currentUser']);
	if($usu===FALSE){ 
        echo "FALSE"; 
    }else{
        //sesion_start();
        //$_SESSION['user'] = $_POST['user'];   
	    echo "TRUE";   
    }  	
} 