<head>
    <style>
        input{
            border-radius: 4px;
            border-style: solid;
            padding: 7px;
        }
        
        body{
            background-image: url("pexels-flo-dnd-2122326.jpg");
            background-size: cover;
            text-align: center;
        }

        h1{
            font:"https://fonts.google.com/specimen/Joan";
            color:rgb(241, 229, 245);
        }
    </style>
</head>
<body>
    <div class = "signup-form-form">
        <section class = "signup-form">
            <h1>SIGN UP</h1>
                <form action = "includes/signup.inc.php" method = "post">
                    <input type = "text" name = "name" id = "name" placeholder = "Full name" /><br><br>
                    <input type = "text" name = "email" id = "Email" placeholder = "E-mail id" /><br><br>
                    <input type = "text" name = "userid" id = "Userid" placeholder = "Username" /><br><br>
                    <input type = "password" minlength = 7 name = "pwd" id = "Password" placeholder = "Password" /><br><br>
                    <input type = "password" name = "pwdrepeat" id = "Passwordrepeat" placeholder = "Retype password" /><br><br>
                    <button type = "submit" value = "Submit">Sign-up</button>
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

        else if($_GET["error"] == "invalidemail"){
            echo "<p>The email you typed in is an invalid one</p";
        }

        else if($_GET["error"] == "passwordsdontmatch"){
            echo "<p>The passwords don't match. Recheck it!</p";
        }

        else if($_GET["error"] == "usernamealreadytaken"){
            echo "<p>Oops! The username is already taken</p";
        }

        else if($_GET["error"] == "none"){
            echo "<p>Welcome dear user!</p";
        }

        else if($_GET["error"] == "stmtfailed"){
            echo "<p>Something went wrong, try again!</p";
        }
    }
    ?>
    </section>
</body>

