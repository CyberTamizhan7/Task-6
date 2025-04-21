<?php

    include('connection.php');

    // Tables:

    // Table : Admin
    $sql_ct_admin = "CREATE TABLE IF NOT EXISTS Admin (
                        Admin_ID VARCHAR(255) UNIQUE,
                        Username VARCHAR(255) UNIQUE,
                        Password VARCHAR(255),
                        Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (Admin_ID));";
    
    // Table : Customer
    $sql_ct_customer = "CREATE TABLE IF NOT EXISTS Customer (
                            Customer_ID VARCHAR(255) UNIQUE,
                            Username VARCHAR(255),
                            Password VARCHAR(255),
                            Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            PRIMARY KEY (Customer_ID));";

    // Table : Customer_Info
    $sql_ct_customer_info = "CREATE TABLE IF NOT EXISTS Customer_Info (
                                Customer_ID VARCHAR(255) UNIQUE,
                                Name VARCHAR(255),
                                Username VARCHAR(255),
                                Age INT,
                                Address VARCHAR(255),
                                Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP);";

    // Table : Products
    $sql_ct_products = "CREATE TABLE IF NOT EXISTS Products (
                            SKU_ID VARCHAR(255) UNIQUE,
                            Product_ID VARCHAR(255),
                            Category_ID VARCHAR(255),
                            Name VARCHAR(255),
                            Price INT,
                            Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            PRIMARY KEY (SKU_ID));";

    // Table : Product_Categories
    $sql_ct_product_categories = "CREATE TABLE IF NOT EXISTS Product_Categories (
                                    Category_ID VARCHAR(255) UNIQUE,
                                    Category VARCHAR(255),
                                    Created_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    PRIMARY KEY (Category_ID));";

    // Table : Orders
    $sql_ct_orders = "CREATE TABLE IF NOT EXISTS Orders (
                        Order_ID VARCHAR(255) UNIQUE,
                        Customer_ID VARCHAR(255),
                        SKU_ID JSON,
                        Product_ID JSON,
                        Category_ID JSON,
                        Quantity JSON,
                        Price JSON,
                        Shipping_Address VARCHAR(255),
                        Billing_Address VARCHAR(255),
                        Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (Order_ID));";

    // Table : Admin_Operations
    $sql_ct_admin_operations = "CREATE TABLE IF NOT EXISTS Admin_Operations (
                                    Admin_ID VARCHAR(255),
                                    Operation_Mode VARCHAR(255),
                                    SKU_ID VARCHAR(255),
                                    Done_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP);";
  
    // Execution
    if ($conn->query($sql_ct_admin) === FALSE){
        echo "Error: Table 'Admin' Creation";
    }

    if ($conn->query($sql_ct_customer) === FALSE){
        echo "Error: Table 'Customer' Creation";
    }

    if ($conn->query($sql_ct_customer_info) === FALSE){
        echo "Error: Table 'Customer Info' Creation";
    }

    if ($conn->query($sql_ct_products) === FALSE){
        echo "Error: Table 'Products' Creation";
    }

    if ($conn->query($sql_ct_product_categories) === FALSE){
        echo "Error: Table 'Product_Categories' Creation";
    }

    if ($conn->query($sql_ct_orders) === FALSE){
        echo "Error: Table 'Orders' Creation";
    }

    if ($conn->query($sql_ct_admin_operations) === FALSE){
        echo "Error: Table 'Admin Operations' Creation";
    }

    // Data Insertion
    $sql_c_admin = "SELECT COUNT(*) AS admins FROM Admin";
    $result = $conn->query($sql_c_admin);
    $row = $result->fetch_assoc();
    $next_admin_id = $row['admins'] + 1;
    $admin_id = 'A'.str_pad($next_admin_id, 3, '0', STR_PAD_LEFT);
    
    $sql_i_admin = "INSERT IGNORE INTO Admin (Admin_ID, Username, Password)
                        VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql_i_admin);
    $username = 'admin';
    $password = 'admin';
    $stmt->bind_param("sss", $admin_id, $username, $password);
    $stmt->execute();


?>