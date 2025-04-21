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

        else if($code=='P'){
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

        else if($code=='O'){
            $sql_s_orders = "SELECT Order_ID, a.Customer_ID, b.Name, b.Username, SKU_ID, Product_ID, Category_ID, Quantity, Price, a.Created_At
                             FROM Orders a
                             JOIN Customer_Info b
                             ON a.Customer_ID = b.Customer_ID;";
            $order_data = [];
            $result = $conn->query($sql_s_orders);
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    $order_data[] = $row;
                }
            }
            echo json_encode($order_data);
        }

        else if($code=='A'){
            $sql_s_admins = "SELECT Admin_ID, Username, Created_At
                             FROM Admin;";
            $admin_data = [];
            $result = $conn->query($sql_s_admins);
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    $admin_data[] = $row;
                }
            }
            echo json_encode($admin_data);
        }

    }

?>