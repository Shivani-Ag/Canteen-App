<?php

$data = array();
$request = file_get_contents('php://input');
$input = json_decode($request);

$username = $input->username;
$useremail = $input->useremail;
$userphone = $input->userphone;
$useraddress = $input->useraddress;
$selectedProd = $input->selectedProd;


$someArray = json_decode(json_encode($selectedProd), true);


    
$connection = mysqli_connect("localhost", "root", "");// Establishing Connection with Server
$db = mysqli_select_db( $connection, "canteen"); // Selecting Database from Server

foreach($someArray as $row => $value)
{
    $canteenid = $value['cantid'];
    $id = $value['id'];
    $name = $value['name'];
    $price = $value['price'];
    $quantity = $value['quantity'];
     print_r($canteenid);

   $query = mysqli_query($connection, "insert into buyer(canteen_id ,customer_email,customer_phone, customer_address, customer_name, product_name , product_price , product_quantity , product_id) values 
    ('$canteenid', '$useremail', '$userphone', '$useraddress', '$username' , '$name' , '$price' , '$quantity','$id' )");

}
        //header( "location:http://localhost/Canteen-App/index.html#/app/first");*/
  
mysqli_close($connection);
?>