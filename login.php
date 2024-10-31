<?php
include 'phpheader.php';
?>
<!DOCTYPE html>
<html lang="de">

<head>
    <link rel="stylesheet" href="css/register.css?<?php echo filemtime('css/register.css'); ?>" media="all" rel="preload">
    <script src="js/login.js?<?php echo filemtime('js/login.js'); ?>" defer></script>
    <!-- <script src="js/sw_instal.min.js" defer></script> -->
    <?php
    $beschreibung = 'Peer ist ein blockchainbasiertes soziales Netzwerk. Die Blockchain-Technologie schützt die Privatsphäre der Benutzer:innen und bietet ihnen die Möglichkeit die eigenen Daten kontrolliert zu monetarisieren.';
    include 'meta.min.php';
    ?>
    <title>Login Peer</title>
</head>

<body class="container">
    <aside class="bild">
        <div class="phone">
            <div class="screen">
                <img src="img/register.webp" alt="Login" width="612" height="612">
            </div>

            <div class="home-button">
                <img src="svg/logo_sw.svg" alt="PeerLogo" width="96" height="96">
            </div>
        </div>
        <img class="logo" src="svg/logo_farbe.svg" alt="Peer logo" width="96" height="96" />
    </aside>

    <form id="registerForm" class="form-container">
        <h1 class="heading">Welcome back!</h1>
        <p class="description">Almost like with any social media you can share the content you love, but with peer, you earn on the side – no fame needed!</p>
        <div class="auth">
            <div class="login-button">
                <img src="svg/github.svg" height="1000" width="1000" alt="Login with GitHub">
            </div>
            <div class="login-button">
                <img src="svg/google.svg" height="24" width="24" alt="Login with Google">
            </div>
            <div class="login-button">
                <img src="svg/apple.svg" height="814" width="1000" alt="Login with Apple">
            </div>
        </div>
        <div class="line-with-text"><span>or</span></div>
        <div class="input-field">
            <input type="email" id="email" name="e_mail" placeholder="E-Mail" required class="input-text" autocomplete="on"></input>
        </div>

        <div class="input-field">
            <input type="password" id="password" name="password" placeholder="Password" required class="input-text"></input>
        </div>

        <input class="button" type="submit" name="Login" value="Login">

        <div class="signIn">
            <a class="link" href="forgotpassword.php">forgot&nbsp;password</a>
        </div>
        <!-- <p class="description" style="opacity: 0;">Start posting with peer today!</p> -->
    </form>

</body>

</html>