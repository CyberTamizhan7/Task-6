<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $name = $_POST['name'];
        $category = $_POST['category'];
        $price = $_POST['price'];
        if($name=="" || $category=="" || $price==""){
            echo "-2";
        }
        else{
            $sql_s_product = "SELECT * FROM Products WHERE Name = '$name';";
            $result = $conn->query($sql_s_product);
            if($result->num_rows>0){
                echo "2";
            }
            else{
                // SKU_ID Generation
                $sql_s_sku_id = "SELECT SKU_ID 
                                FROM Products
                                ORDER BY SKU_ID DESC
                                LIMIT 1;";
                $result = $conn->query($sql_s_sku_id);
                $row = $result->fetch_assoc();
                $next_sku_id = $row['SKU_ID'];
                $next_sku_id = preg_replace('/\D/', '', $next_sku_id);
                $next_sku_id = (int)$next_sku_id+1;
                $next_sku_id = "SKU".str_pad($next_sku_id, 3, '0', STR_PAD_LEFT);

                // Product_ID Generation
                $sql_s_product_id = "SELECT Product_ID 
                        FROM Products
                        ORDER BY PRODUCT_ID DESC
                        LIMIT 1;";
                $result = $conn->query($sql_s_product_id);
                $row = $result->fetch_assoc();
                $next_product_id = $row['Product_ID'];
                $next_product_id = preg_replace('/\D/', '', $next_product_id);
                $next_product_id = (int)$next_product_id + 1;
                $next_product_id = "P".str_pad($next_product_id, 3, '0', STR_PAD_LEFT);

                // Category_ID Fetch
                $sql_s_category_id = "SELECT Category_ID
                                    FROM Product_Categories
                                    WHERE Category = '$category';";
                $result = $conn->query($sql_s_category_id);
                $row = $result->fetch_assoc();
                $category_id = $row['Category_ID'];

                // Product Insertion
                $sql_i_new_product = "INSERT INTO Products (sku_id, product_id, category_id, name, price)
                                        VALUES('$next_sku_id', '$next_product_id', '$category_id', '$name', $price);";
                if($conn->query($sql_i_new_product) === TRUE){
                    echo "1";
                }
                else{
                    echo "-1";
                }
                
            }
        
        }
    }

    else{
        echo "0";
    }

?>