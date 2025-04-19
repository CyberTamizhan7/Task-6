<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){

        $code = $_POST['code'];

        if($code=='C'){
            $sql_s_customers = "SELECT a.Customer_ID, b.Name, b.Age, b.Address, b.Username
                                FROM Customer a 
                                JOIN Customer_Info b 
                                ON a.Customer_ID = b.Customer_ID;";
            $customer_data = [];
            $result = $conn->query($sql_s_customers);
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    $customer_data[] = $row;
                }
            }
            echo json_encode($customer_data);
        }

        if($code=='P'){
            $sql_s_products = "SELECT SKU_ID, Product_ID, Name, b.Category, Price
                               FROM Products a 
                               JOIN Product_Categories b
                               ON a.Category_ID = b.Category_ID;";
            $product_data = [];
            $result = $conn->query($sql_s_products);
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    $product_data[] = $row;
                }
            }
            echo json_encode($product_data);
        }
    }

?>