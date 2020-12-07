<?php 
require_once 'db.php';
require 'sessions_json.php';
if(check_session() != "FALSE"){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {   
        $conver = get_conersation_group($_POST['group']);
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
}