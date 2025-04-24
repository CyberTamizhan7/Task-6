<?php

    include('connection.php');

    $sql_s_products = "SELECT SKU_ID, Name, Category, Price 
                        FROM Products a JOIN Product_Categories b 
                        ON a.Category_ID = b.Category_ID";
    
    $result = $conn->query($sql_s_products);
    
    $products = [];
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $products[] = $row;
        }
    }

    header("Content-Type: application/json");
    echo json_encode($products);

?>