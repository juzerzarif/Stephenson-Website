<?php

$name = $_POST["name"];
$email_from = $_POST["email"];
$email_to = "wilburqnether69@gmail.com";
$subject = $_POST["subject"];
$message = $_POST["message"];

$header = "From: ".$email_from."\r\n".
            "Name: ".$name."\r\n";

mail($email_to, $subject, $message, $header);

header("Location: index.html");
exit;

?>