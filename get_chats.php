<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $chats = get_chats($_POST['user']);
	if($chats===FALSE){ 
        echo "FALSE"; 
    }else{   
        //$array = iterator_to_array($chats);
	    $json = json_encode($chats);   
        echo $json;
    }  	
} 