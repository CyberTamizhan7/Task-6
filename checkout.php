<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $c_name = $_POST['name'];
        $c_age = $_POST['age'];
        $c_address = $_POST['address'];
        $a_sku_id = $_POST['a_sku_id'];
        $a_product_name = $_POST['a_product_name'];
        $a_product_category = $_POST['a_product_category'];
        $a_product_price = $_POST['a_product_price'];
        $a_quantity = $_POST['a_quantity'];
        $a_sku_id_ = json_decode($a_sku_id, true);
        $a_product_name_ = json_decode($a_product_name, true);
        $a_product_category_ = json_decode($a_product_category, true);
        $a_product_price_ = json_decode($a_product_price, true);
        $a_quantity_ = json_decode($a_quantity, true);

        $a_product_id = [];
        $a_category_id = [];
        
        for($i=0;$i<count($a_sku_id_);$i++){
            $product_name = $a_product_name_[i];
            $sql_s_product_id = "SELECT Product_ID FROM Products WHERE Name = '$product_name'";
            $result = $conn->query($sql_s_product);
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                $a_product_id[] = $row['Product_ID'];
            }
        }
        
        echo $a_product_id[0];
    }

    else{
        echo "0";
    }

?>