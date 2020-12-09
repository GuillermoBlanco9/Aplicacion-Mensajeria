<?php
require_once 'db.php';
require 'sessions_json.php';
if(check_session() != "FALSE"){
    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        $tmp_user = $_SESSION['user'];  
        $usu = update_profile($_POST['name'], $_POST['address'], $_POST['email'], $_POST['user']);
        $tam = $_FILES["myfile"]["size"];
	    if($tam > 1024 *1024){
		    echo "<br>Too big $tam";
		    return;
        }
        $dest = "profilePic/" . $tmp_user . ".jpg";
        $res = move_uploaded_file($_FILES["myfile"]["tmp_name"],$dest);
        if($usu===FALSE){ 
            echo "FALSE";
            return; 
        }else{   
            header('Location: login_ajax.html');
        }  	
    } 
}