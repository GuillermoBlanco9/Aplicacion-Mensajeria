<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $chats = get_chats($_POST['user']);
    //$usu = check_user($_POST['user'], $_POST['password']);
	if($chats===FALSE){ 
        echo "FALSE"; 
    }else{   
        //$array = iterator_to_array($chats);
	    //$json = json_encode($array);   
        //echo $json;
        echo "TRUE"   
    }  	
} 