<?php
require_once 'db.php';
require 'sessions_json.php';
//Este archivo actualiza la info del perfil y deberia subir la imagen
if(check_session() != "FALSE"){
    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        $tmp_user = $_POST['user'];  
        $usu = update_profile($_POST['name'], $_POST['address'], $_POST['email'], $_POST['user']);
        //echo $_POST['user'];
        $tam = $_FILES["myfile"]["size"];
	    if($tam > 1024 *1024){
		    echo "<br>Too big $tam";
		    return;
        }
        $dest = "profilePic/'$tmp_user'.jpg";
        //La linea de abajo sube un archivo bien. La escribiste tu. Sube el archivo con el nombre original
        //$res = move_uploaded_file($_FILES["myfile"]["tmp_name"],"profilePic/" . $_FILES["myfile"]["name"]);
        //La linea de abajo intenta subir la imagen pero cmabiando la ruta de destino a profilePic/user_name.jpg
        // por ejemplo: profilePic/AdrianR.jpg
        //asi no hay que tocar la ruta en la base de datos. ojo tbn se puede hacer por ahí.
        //$res = move_uploaded_file($_FILES["myfile"]["tmp_name"], "profilePic/'$dest'");
        //otro intento pero na
        //$res = file_put_contents("profilePic/" . $_POST['user'] . ".jpg", file_get_contents($_FILES['myfile']['tmp_name']) );
        if($usu===FALSE){ 
            echo "FALSE";
            return; 
        }else{  
            //echo "TRUE";   
            header('Location: login_ajax.html');
        }  	
    } 
}