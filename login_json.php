<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $usu = check_user($_POST['user'], $_POST['password']);
	if($usu===FALSE){ 
        echo "FALSE"; 
    }else{   
        $array = iterator_to_array($usu);
	    $json = json_encode($array);   
	    echo $json;   
    }  	
} 