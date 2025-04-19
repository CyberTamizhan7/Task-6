<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $code = $_POST['n'];
        if($code == "1"){
            $sql_s_n_admins = "SELECT COUNT(*) AS n_admin FROM Admin;";
            $result = $conn->query($sql_s_n_admins);
            $rows = $result->fetch_assoc();
            $n_admin = $rows['n_admin'];
            echo $n_admin;
        }
        else if($code == "2"){
            $sql_s_n_customers = "SELECT COUNT(*) AS n_customers FROM Customer;";
            $result = $conn->query($sql_s_n_customers);
            $rows = $result->fetch_assoc();
            $n_customer = $rows['n_customers'];
            echo $n_customer;
        }
        else if($code == "3"){
            $sql_s_n_orders = "SELECT COUNT(*) AS n_orders FROM Orders;";
            $result = $conn->query($sql_s_n_orders);
            $rows = $result->fetch_assoc();
            $n_order = $rows['n_orders'];
            echo $n_order;
        }
        else if($code == "4"){
            $sql_s_n_products = "SELECT COUNT(*) AS n_products FROM Products;";
            $result = $conn->query($sql_s_n_products);
            $rows = $result->fetch_assoc();
            $n_product = $rows['n_products'];
            echo $n_product;
        }
        else{
            echo "Wrong Path Bro!";
        }
    }

?>