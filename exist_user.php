
<?php 
require_once  'db.php'; 
require 'sessions_json.php';
if(!check_session()) return;
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $exist = exist_user($_POST['user']);
	if($exist==='FALSE'){ 
        echo "FALSE";
        return;
    }else{
        echo "TRUE";   
        return;
    }  	
} 