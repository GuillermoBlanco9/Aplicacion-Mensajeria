<?php
require 'sessions_json.php';
$check = check_session();
if($check == "FALSE"){
    echo "FALSE";
    return;
}else{
    echo $_SESSION['user'];
    return;
}