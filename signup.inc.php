<?php

if(isset($_POST["submit"])){

    $name = $_POST["name"];
    $email = $_POST["email"];
    $username = $_POST["userid"];
    $pwd = $_POST["pwd"];
    $pwdRepeat = $_POST["pwdrepeat"];
 
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';


    if(emptyInputSignup($name, $email, $username, $pwd, $pwdRepeat) !== false){
        header("location: ../signup.html?error=emptyinput");
        exit();
    }

    if(invalidUsername($username) !== false){
        header("location: ../signup.html?error=invalidusername");
        exit();
    }

    if(invalidEmailid($email) !== false){
        header("location: ../signup.html?error=invalidemail");
        exit();
    }

    if(passwordMatch($pwd, $pwdRepeat) !== false){
        header("location: ../signup.html?error=passwordsdontmatch");
        exit();
    }
    
    if(usernameExists($conn, $username, $email) !== false){
        header("location: ../signup.html?error=usernamealreadytaken");
        exit();
    }

    createUser($conn, $name, $email, $username, $pwd);
}

else{
    header("location: ../signup.html");
    exit();
}
