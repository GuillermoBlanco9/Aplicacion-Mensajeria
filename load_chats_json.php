<?php 
require_once 'db.php';
require 'sessions_json.php';
if(!check_session()) return;
if ($_SERVER["REQUEST_METHOD"] == "POST") {   
    $conver = get_conversation($_POST['user'], $_POST['currentUser']);
	if($conver===FALSE){ 
        echo "FALSE"; 
    }else{
        //sesion_start();
        //$_SESSION['user'] = $_POST['user'];  
        //print_r($conver);
       //$array = iterator_to_array($conver);
	    $json = json_encode($conver);   
        echo $json;; 
	    //echo "TRUE";   
    }  	
} 