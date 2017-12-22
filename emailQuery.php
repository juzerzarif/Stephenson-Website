<?php

print phpinfo();

$name = $_POST["name"];
$email_from = $_POST["email"];
$email_to = "wilburqnether69@gmail.com";
$subject = $_POST["subject"];
$message = $_POST["message"];

$header = "From: ".$email_from."\r\n".
            "Name: ".$name."\r\n";

if(mail($email_to, $subject, $message, $header))
{
    header("Location: index.html");
    exit;
}
else
{
    echo "Email wasn't sent";
}

?>