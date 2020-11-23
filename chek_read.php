<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $check = get_conversation($_POST['currentUser'], $_POST['user']);
	if($check===FALSE){ 
        echo "FALSE"; 
        return;
    }else{   
        foreach($check as $value){
            if($value['read'] === '0'){
                echo "FALSE"; 
                return;
            }
        }
        echo 'TRUE';
        return;
    }  	
} 