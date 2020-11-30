<?php 
require_once 'db.php'; 
if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    $exist = get_profile($_POST['username']);
	if($exist===FALSE){ 
        echo "FALSE";
        return;
    }else{
        echo "TRUE";   
        return;
    }  	
} 