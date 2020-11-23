<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $check = update_read($_POST['currentUser'], $_POST['user']);
	if($check===FALSE){ 
        echo "FALSE"; 
    }else{   
        echo 'TRUE';
    }  	
} 