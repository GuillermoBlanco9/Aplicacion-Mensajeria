<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    $exist = sing_up($_POST['username']);
	if($exist===FALSE){ 
        echo "FALSE";
        return;
    }else{
        echo "TRUE";   
        return;
    }  	
} 