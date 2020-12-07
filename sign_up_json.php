
<?php 
require_once 'db.php';
require 'sessions_json.php';
if(!check_session()) return;
if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    $exist = sing_up($_POST['username'], $_POST['name'], $_POST['surname']
     ,$_POST['email'], $_POST['address'] ,$_POST['password']);
	if($exist===FALSE){ 
        echo "FALSE";
        return;
    }else{
        echo "TRUE";   
        return;
    }  	
} 