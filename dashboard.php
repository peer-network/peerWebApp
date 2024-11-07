<?php
include 'phpheader.php';
?>
<!DOCTYPE html>
<html lang="de">


<head>
    <link rel="stylesheet" href="css/dashboard.css">
    <script src="sw_instal.min.js" defer></script>
    <script src="js/dashboard.js" defer></script>

    <?php
    $beschreibung = 'Peer ist ein blockchainbasiertes soziales Netzwerk. Die Blockchain-Technologie schützt die Privatsphäre der Benutzer:innen und bietet ihnen die Möglichkeit die eigenen Daten kontrolliert zu monetarisieren.';
    include 'meta.min.php';
    ?>
    <title>Dashboard</title>
</head>

<body>

    <article class="dashboard">
        <!-- Header -->
        <header class="header">
            <div>
                <img src="svg/logo_sw.svg" alt="Peer Network Logo">
                <h1 id="h1">Dashboard</h1>
            </div>
            <div class="search-group">
                <input name="search" id="searchText" type="text" placeholder="Search for anything" aria-label="Search">
                <img class="lupe" src="svg/lupe.svg" alt="search">
            </div>
            <div>
                <span>Trendig</span>
                <span>Subscriptions</span>
                <span>Friends</span>
            </div>
        </header>

        <!-- Sidebar -->
        <aside class="sidebar">
            <form class="filterContainer">
                <button type="submit" class="filterButton">
                    <img src="svg/filterApply.svg" alt="apply Filter"> Filter apply
                </button>

                <menu class="filter">
                    <p>Fotos, Notes, Music</p>
                    <div class="filterGroup">
                        <input id="filterImage" type="checkbox" class="filterButton">
                        <label for="filterImage"><img src="svg/filterImage.svg" alt="Image filter"></label>
                        <input id="filterNotes" type="checkbox" class="filterButton">
                        <label for="filterNotes"><img src="svg/filterNotes.svg" alt="Notes filter"></label>
                        <input id="filterMusic" type="checkbox" class="filterButton">
                        <label for="filterMusic"><img src="svg/filterMusic.svg" alt="Music filter"></label>
                    </div>
                    <p>Video</p>
                    <div class="filterGroup">
                        <input id="filterVideo" type="checkbox" class="filterButton">
                        <label for="filterVideo"><img src="svg/filterVideo.svg" alt="Video filter"></label>
                        <input id="filterPodcast" type="checkbox" class="filterButton">
                        <label for="filterPodcast"><img src="svg/filterPodcast.svg" alt="Podcast filter"></label>
                        <input id="filterFickFuck" type="checkbox" class="filterButton">
                        <label for="filterFickFuck"><img src="svg/filterFickFuck.svg" alt="Local filter"></label>
                    </div>
                    <p>Polls, Quiz, Event</p>
                    <div class="filterGroup">
                        <input id="filterPolls" type="checkbox" class="filterButton">
                        <label for="filterPolls"><img src="svg/filterPolls.svg" alt="Polls filter"></label>
                        <input id="filterQuiz" type="checkbox" class="filterButton">
                        <label for="filterQuiz"><img src="svg/filterQuiz.svg" alt="Quiz filter"></label>
                        <input id="filterEvent" type="checkbox" class="filterButton">
                        <label for="filterEvent"><img src="svg/filterEvent.svg" alt="Event filter"></label>
                    </div>
                </menu>
            </form>
        </aside>

        <!-- Main Content Area (Mittlere Spalte mit einem inneren Grid) -->
        <main class="main">
            <div class="card" tabindex="0">Karte 1 - Inhalt</div>
            <div class="card" tabindex="0">Karte 2 - Inhalt</div>
            <div class="card" tabindex="0">Karte 3 - Inhalt</div>
            <div class="card" tabindex="0">Karte 4 - Inhalt</div>
            <div class="card" tabindex="0">Karte 5 - Inhalt</div>
            <div class="card" tabindex="0">Karte 6 - Inhalt</div>
            <div class="card" tabindex="0">Karte 7 - Inhalt</div>
            <div class="card" tabindex="0">Karte 8 - Inhalt</div>
            <div class="card" tabindex="0">Karte 9 - Inhalt</div>
            <div class="card" tabindex="0">Karte 10 - Inhalt</div>
            <div class="card" tabindex="0">Karte 11 - Inhalt</div>
            <div class="card" tabindex="0">Karte 12 - Inhalt</div>
            <div class="card" tabindex="0">Karte 13 - Inhalt</div>
            <div class="card" tabindex="0">Karte 14 - Inhalt</div>
            <div class="card" tabindex="0">Karte 15 - Inhalt</div>
            <div class="card" tabindex="0">Karte 16 - Inhalt</div>
            <div class="card" tabindex="0">Karte 17 - Inhalt</div>
            <div class="card" tabindex="0">Karte 18 - Inhalt</div>
            <div class="card" tabindex="0">Karte 19 - Inhalt</div>
            <div class="card" tabindex="0">Karte 20 - Inhalt</div>
            <div class="card" tabindex="0">Karte 21 - Inhalt</div>
            <div class="card" tabindex="0">Karte 22 - Inhalt</div>
            <div class="card" tabindex="0">Karte 23 - Inhalt</div>
            <div class="card" tabindex="0">Karte 24 - Inhalt</div>
            <div class="card" tabindex="0">Karte 25 - Inhalt</div>
            <div class="card" tabindex="0">Karte 26 - Inhalt</div>
            <div class="card" tabindex="0">Karte 27 - Inhalt</div>
            <div class="card" tabindex="0">Karte 28 - Inhalt</div>
            <div class="card" tabindex="0">Karte 29 - Inhalt</div>
            <div class="card" tabindex="0">Karte 30 - Inhalt</div>
            <div class="card" tabindex="0">Karte 31 - Inhalt</div>
            <div class="card" tabindex="0">Karte 32 - Inhalt</div>
            <div class="card" tabindex="0">Karte 33 - Inhalt</div>
            <div class="card" tabindex="0">Karte 34 - Inhalt</div>
            <div class="card" tabindex="0">Karte 35 - Inhalt</div>
            <div class="card" tabindex="0">Karte 36 - Inhalt</div>
            <div class="card" tabindex="0">Karte 37 - Inhalt</div>
            <div class="card" tabindex="0">Karte 38 - Inhalt</div>
            <div class="card" tabindex="0">Karte 39 - Inhalt</div>
            <div class="card" tabindex="0">Karte 40 - Inhalt</div>

        </main>

        <!-- Extra Content Area (Rechte Spalte) -->
        <aside class="profil">
            <div id="profil-container">
                <!-- Profil-Bild und Name -->
                <div class="profile-header">
                    <img src="img/ender.png" alt="Profile Picture" class="profile-picture">
                    <div class="badge">79</div>
                    <h2>Julia Harrison</h2>
                    <p class="username">@mc_juli_420</p>
                </div>

                <!-- Statistiken -->
                <div class="stats">
                    <div class="stat">
                        <span>42</span>
                        <p>Posts</p>
                    </div>
                    <div class="stat">
                        <span>6.9k</span>
                        <p>Followers</p>
                    </div>
                    <div class="stat">
                        <span>420</span>
                        <p>Following</p>
                    </div>
                </div>

                <!-- Menü -->
                <div class="menu stats">
                    <div class="menu-item active">
                        <img class="icon" src="svg/icon-dashboard.svg" alt="dashboard">
                        <p>Dashboard</p>
                    </div>
                    <div class="menu-item">
                        <img class="icon" src="svg/icon-messages.svg" alt="messages">
                        <p>Messages</p>
                        <div class="notification-badge">8</div>
                    </div>
                    <div class="menu-item">
                        <img class="icon" src="svg/icon-network.svg" alt="network">
                        <p>Network</p>
                    </div>
                    <div class="menu-item">
                        <img class="icon" src="svg/icon-wallet.svg" alt="wallet">
                        <p>Wallet</p>
                    </div>
                    <!-- Bottom-Icons -->
                    <div class="bottom-icons">
                        <div class="icon-add">
                            <img class="icon" src="svg/icon-add.svg" alt="add">
                        </div>

                    </div>
                    <div class="group-icon">
                        <img class="icon icon-group" src="svg/icon-group.svg" alt="settings">
                    </div>
                </div>
            </div>
            <div id="profil-login" class="none">
                <a href="/login.php">login</a>
                <a href="/register.php">register</a>
            </div>
        </aside>
        <footer>
            <img src="svg/logo_farbe.svg" alt="loading">
        </footer>
    </article>

</body>

</html>