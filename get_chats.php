<?php 
require_once 'db.php'; 
require 'sessions_json.php';
if(!check_session()) return;
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $chats = get_chats($_POST['user']);
	if($chats===FALSE){ 
        echo "FALSE";
        return; 
    }else{   
        //$array = iterator_to_array($chats);
	    $json = json_encode($chats);   
        echo $json;
        return;
    }  	
} 