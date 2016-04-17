<?php
$data = json_decode(file_get_contents("php://input"));
$connection = mysqli_connect("localhost", "root", "");// Establishing Connection with Server
$db = mysqli_select_db( $connection, "canteen"); // Selecting Database from Server

 

$query = mysqli_query($connection, "insert into purchase(product_name, product_price, product_quantity, totalprice) values ('$product_name', '$product_price', '$product_quantity', '$totalprice')");
          echo "<script>alert('Data Inserted successfully');</script>";
        //header( "location:http://localhost/Canteen-App/index.html#/app/first");
    


mysqli_close($connection);
?>