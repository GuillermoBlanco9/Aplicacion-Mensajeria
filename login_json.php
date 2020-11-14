<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $usu = check_user($_POST['user'], $_POST['password']);
	if($usu===FALSE){ 
        echo "FALSE"; 
    }else{         
        echo "TRUE";    
    }  	
} 