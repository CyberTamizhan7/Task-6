<?php

    $server = "localhost";
    $username = "root";
    $password = "";
    $db = "QuickBuy";

    $conn = new mysqli($server, $username, $password, $db);
    
    if($conn->connect_error){
        echo "Error: DB Connection";
    }

?>