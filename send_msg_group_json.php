<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $send = send_group_message($_POST['currentUser'], $_POST['group'], 
            $_POST['body'], $_POST['time']);
	if($send===FALSE){ 
        echo "FALSE"; 
    }else{   
        //$array = iterator_to_array($chats);
	    //$json = json_encode($chats);   
        //echo $json;
        echo 'TRUE';
    }  	
} 