<head>
    <style>
        input{
            border-radius: 4px;
            border-style: solid;
            padding: 6px;
            width: 250px;
            border-color: rgb(197, 195, 195);
        }

        body{
            /* background-image: url("galaxy.webp"); */
            /*background-image: url("pexels-cottonbro-6830888.jpg"); */
            text-align: center;
            margin-top: 250px;
        }

        button{
            background-color: white;
            box-shadow: rgba(209, 211, 212, 0.932) 0px 3px 8px; 
            border-radius: 2px;
            width: 250px;
            padding: 4px;
            
        }
        
        button:hover{
            transition-duration: 0.4s;
            background-color: rgb(0, 0, 0);
            color: white;
            
        }
        h2{
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            color: rgb(39, 39, 1);
        }
    </style>
</head>
<body onload="loggedin($username)">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <section class = "login-form">
        <div>
            <h2>LOG IN</h2>
              <form action = "includes/login.inc.php" method = "post">
              <input type = "text" name = "name" id = "Userid/password" placeholder = "Username/e-mail" /><br><br>
              <input type = "password" name = "pwd" id = "Password" placeholder = "Password" /><br><br>
              <input type = "checkbox" name = "rememberme" id = "rememeberme" onclick="setCookie()">
              <label for = "rememberl">Remember me</label>
              <button type = "submit" value = "Submit">LOG IN</button>
              <a href="reset-password.php">Forgot password?</a>
            </form>
        </div>

        <?php
        
        if(isset($_GET["error"])){
            if($_GET["error"] == "emptyinput"){
                echo "<p>You missed out some fields</p";
            }
        
        else if($_GET["error"] == "invalidusername"){
            echo "<p>The username is an invalid one</p";
        }

        else if($_GET["error"] == "wronglogin"){
            echo "<p>Incorrect login information!</p";
        }
    }
    ?>

    </section>

    <script>
        setCookie('rememberme', hash_hmac('sha256', $username . $_SERVER['REMOTE_ADDR'], $storedNonce), time() + 8640000);
        
        function loggedin($username){
            $valid = hash_equals($_COOKIE['rememberme'], hash_hmac('sha256', $username . $_SERVER['REMOTE_ADDR'], $storedNonce));
            if($valid == false){
                header("location: ../login.php");
                exit();
            }
        }
    </script>
</body>