<?php 
require_once 'db.php'; 
require 'sessions_json.php';
if(check_session() != "FALSE"){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {   
        $chats = get_chats($_POST['user']);
        if($chats===FALSE){ 
            echo "FALSE";
            return; 
        }else{   
            //$array = iterator_to_array($chats);
            //print_r($chats);
            $json = json_encode($chats);   
            echo $json;
            return;
        }  	
    } 
}
