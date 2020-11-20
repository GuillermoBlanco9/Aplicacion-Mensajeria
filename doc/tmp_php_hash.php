<?php

$array = array(
    "david1234",
    "adrian1234",
    "daniel1234",
    "guillermo1234",
    "bernardo1234",
    "lu123456",
    "angelica1234",
    "jorge1234",
    "roberto1234",
    "ariel1234"
);

$arrayHash = array();
for ($i = 0; $i < 10; $i++) {
    $arrayHash[$i] = password_hash($array[$i], PASSWORD_BCRYPT);
}
foreach ($arrayHash as &$valor) {
    echo "<br>";
    echo $valor;
    echo "<br>";}