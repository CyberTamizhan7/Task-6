<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $sku_id = $_POST['sku_id'];
        $name = $_POST['name'];
        $price = $_POST['price'];
        $sql_s_product = "SELECT Name, Price
                          FROM Products
                          WHERE SKU_ID = '$sku_id';";
        $result = $conn->query($sql_s_product);
        $row = $result->fetch_assoc();
        if($price==$row['Price'] && $name==$row['Name']){
            echo "0";
        }
        else{
            $sql_u_products = "UPDATE Products 
                               SET Name = '$name', Price = '$price'
                               WHERE SKU_ID = '$sku_id';";
            if($conn->query($sql_u_products)===TRUE){
                echo "1";
            }
            else{
                echo "-2";
            }
        }
    }
    else{
        echo "-1";
    }

?>