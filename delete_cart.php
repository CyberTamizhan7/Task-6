<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $sku_id = $_POST['sku_id'];
        $sql_d_carts = "DELETE FROM Carts WHERE SKU_ID = '$sku_id';";
        if($conn->query($sql_d_carts) === FALSE){
            echo "-1";
        }
        else{
            echo "1";
        }
    }
    else{
        echo "0";
    }

?>