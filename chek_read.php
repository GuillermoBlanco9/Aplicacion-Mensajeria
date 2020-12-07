<?php 
require_once 'db.php';
require 'sessions_json.php';
if(check_session() != "FALSE"){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {   
        $check = check_read($_POST['currentUser'], $_POST['user']);
        if($check===FALSE){ 
            echo "FALSE"; 
            return;
        }else{   
            echo 'TRUE';
            return;
        }  	
    } 
}

