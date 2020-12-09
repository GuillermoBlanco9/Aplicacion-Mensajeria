<?php
require 'sessions_json.php';
if(!check_session()) return;
	$tam = $_FILES["myfile"]["size"];
	if($tam > 1024 *1024){
		echo "<br>Too big $tam";
		return;
	}
	$res = move_uploaded_file($_FILES["myfile"]["tmp_name"],"profilePic/" . $_FILES["myfile"]["name"]);
    
   