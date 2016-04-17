<?php
$connection = mysqli_connect("localhost", "root", ""); // Establishing Connection with Server
$db = mysqli_select_db("canteen", $connection); // Selecting Database from Server
if(isset($_POST['submit']))
{ 
    $useremail = $_POST['customer_email'];
    $userpassword = $_POST['customer_password'];
    $sql="SELECT * FROM customer WHERE customer_email='$useremail' and customer_password='$userpassword'";
    $result=mysql_query($sql);
    
    $count=mysql_num_rows($result);
    if($count>=1)
    {
            echo "<script>alert('Login Successful');</script>";
            header( "location:http://localhost/LoginSignUp/index.html#/signup"); 
            
    }
    else 
    {
           echo "<script>alert('Wrong username and password');</script>";
        
    }
}
mysql_close($connection); 
?>

