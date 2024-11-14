<?php
include 'phpheader.php';
?>
<!DOCTYPE html>
<html lang="de">

<head>
    <link rel="stylesheet" href="css/dashboard.css">
    <script src="sw_instal.min.js" defer></script>
    <script src="js/lib.min.js?" defer></script>
    <script src="js/dashboard.js" defer></script>

    <?php
    $beschreibung = 'Peer ist ein blockchainbasiertes soziales Netzwerk. Die Blockchain-Technologie schützt die Privatsphäre der Benutzer:innen und bietet ihnen die Möglichkeit die eigenen Daten kontrolliert zu monetarisieren.';
    include 'meta.min.php';
    ?>
    <title>Dashboard</title>
</head>

<body>
    <header>
        <svg class="none">
            <symbol id="post-comment" viewBox="0 0 44 45">
                <path d="m4.4 33c0.092-0.449 0.0274-0.915-0.183-1.32-1.42-2.74-2.22-5.86-2.22-9.17 0-3.96 1.17-7.82 3.37-11.1 2.2-3.29 5.32-5.85 8.98-7.37s7.68-1.91 11.6-1.14c3.88 0.772 7.44 2.68 10.2 5.47 2.8 2.8 4.7 6.36 5.47 10.2s0.376 7.9-1.14 11.6c-1.51 3.65-4.08 6.78-7.37 8.98s-7.16 3.37-11.1 3.37c-3.31 0-6.43-0.8-9.17-2.22-0.407-0.21-0.873-0.275-1.32-0.183l-8.94 1.83 1.83-8.94z" stroke="#FFFAFA" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" />
            </symbol>
            <symbol id="post-like" viewBox="0 0 48 45">
                <path id="mener" d="m34.3 2.5c-4.5 0-8.38 2.66-10.3 6.54-1.95-3.88-5.83-6.54-10.3-6.54-6.45 0-11.7 5.46-11.7 12.2s4 12.9 9.16 17.9 12.8 9.88 12.8 9.88 7.42-4.74 12.8-9.88c5.78-5.48 9.16-11.2 9.16-17.9s-5.22-12.2-11.7-12.2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" />

            </symbol>
            <symbol id="post-view" fill="none" viewBox="0 0 56 39">
                <g stroke="#FFFAFA" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
                    <path d="m36.4 19.5c0 2.22-0.885 4.34-2.46 5.91s-3.71 2.45-5.94 2.45-4.36-0.88-5.94-2.45-2.46-3.69-2.46-5.91c0-2.22 0.885-4.34 2.46-5.91 1.58-1.57 3.71-2.45 5.94-2.45s4.36 0.88 5.94 2.45c1.58 1.57 2.46 3.69 2.46 5.91z" />
                    <path d="m28 37c-11.9 0-21.5-7.17-25.8-17.5 4.36-10.3 14-17.5 25.8-17.5s21.5 7.17 25.8 17.5c-4.36 10.3-14 17.5-25.8 17.5z" />
                </g>
            </symbol>

        </svg>
    </header>


    <article class="dashboard">
        <header class="header">
            <div>
                <img src="svg/logo_sw.svg" alt="Peer Network Logo">
                <h1 id="h1">Dashboard</h1>
            </div>
            <div class="search-group">
                <input name="search" id="searchText" type="text" placeholder="Search for anything" aria-label="Search">
                <img class="lupe" src="svg/lupe.svg" alt="search">
            </div>
            <div class="postOptions">
                <div class="postOptionsButton" title="show trends">
                    <span>Trendig</span><img src="svg/trending.svg" alt="trending">
                </div>
                <div class="postOptionsButton" title="my followed">
                    <span>Subscriptions</span><img src="svg/followed.svg" alt="followed">
                </div>
                <div class="postOptionsButton" title="your friends like">
                    <span>Friends</span><img src="svg/friends.svg" alt="friends">
                </div>
            </div>
        </header>

        <!-- Sidebar -->
        <aside class="sidebar">
            <form class="filterContainer">


                <menu class="filter">
                    <div class="center">
                        <img class="icon" src="svg/filterApply.svg" alt="apply Filter">&nbsp;apply filter
                    </div>
                    <div class="filterGroup">
                        <input checked id="filterImage" type="checkbox" class="filterButton">
                        <label for="filterImage" class="filterButton" title="Fotos"><img src="svg/filterImage.svg" alt="Image filter"></label>
                        <input checked id="filterNotes" type="checkbox" class="filterButton">
                        <label for="filterNotes" class="filterButton" title="Notes"><img src="svg/filterNotes.svg" alt="Notes filter"></label>
                        <input checked id="filterMusic" type="checkbox" class="filterButton">
                        <label for="filterMusic" class="filterButton" title="Music"><img src="svg/filterMusic.svg" alt="Music filter"></label>
                    </div>
                    <div class="filterGroup">
                        <input checked id="filterVideo" type="checkbox" class="filterButton">
                        <label for="filterVideo" class="filterButton" title="Video"><img src="svg/filterVideo.svg" alt="Video filter"></label>
                        <input checked id="filterPodcast" type="checkbox" class="filterButton">
                        <label for="filterPodcast" class="filterButton" title="playlist"><img src="svg/filterPodcast.svg" alt="Podcast filter"></label>
                        <input checked id="filterFickFuck" type="checkbox" class="filterButton">
                        <label for="filterFickFuck" class="filterButton" title="local"><img src="svg/filterFickFuck.svg" alt="Local filter"></label>
                    </div>
                    <div class="filterGroup">
                        <input checked id="filterPolls" class="filterButton" type="checkbox" class="filterButton">
                        <label for="filterPolls" class="filterButton" title="Polls"><img src="svg/filterPolls.svg" alt="Polls filter"></label>
                        <input checked id="filterQuiz" type="checkbox" class="filterButton">
                        <label for="filterQuiz" class="filterButton" title="Quiz"><img src="svg/filterQuiz.svg" alt="Quiz filter"></label>
                        <input checked id="filterEvent" type="checkbox" class="filterButton">
                        <label for="filterEvent" class="filterButton" title="Event"><img src="svg/filterEvent.svg" alt="Event filter"></label>
                    </div>
                </menu>
                <!-- <label for="advancedFilter" style="color: white;">advanced filter</label> -->
                <select id="advancedFilter" class="dark-select">
                    <option class="none" value="" disabled selected>advanced filter</option>
                    <option value="1">was soll hier stehen?</option>
                    <option value="2">und wie siehts aus</option>
                    <option value="2">miau</option>
                    <option value="2">wuff</option>
                </select>

                <div class="menu">
                    <div class="menu-item aktive">
                        <img class="icon" src="svg/paid.svg">
                        <p>paid&nbsp;content</p>
                    </div>
                    <div class="menu-item">
                        <img class="icon" src="svg/free.svg">
                        <p>free&nbsp;content</p>
                    </div>

                </div>
            </form>
        </aside>

        <!-- Main Content Area (Mittlere Spalte mit einem inneren Grid) -->
        <main id="main" class="main">
            <!-- <section class="card" tabindex="0">
                <div class="post">
                    <img src="img/bg.png" alt="">
                </div>
                <div class="post-inhalt">
                    <h1>überschrift</h1>
                    <p class="post-text"> dck fj fjew fkewj wek ewkjwe wkej wkj wkj kjw fkjew wkef sdkc dkc skjd cksjd kjdsc ksjdc skj skj skjd skj skj skjskjkjcdkj skj skj skjsljanclkalka calj kjs dkj </p>
                </div>
                <div class="social">
                    <svg class="">
                        <use href="#post-view" />
                    </svg>
                    <span></span>
                    <svg class="">
                        <use href="#post-like" />
                    </svg>
                    <span></span>
                    <svg class="">
                        <use href="#post-comment" />
                    </svg>
                    <span></span>
                </div>
            </section> -->

        </main>

        <!-- Extra Content Area (Rechte Spalte) -->
        <aside class="profil">
            <div id="profil-container">
                <!-- Profil-Bild und Name -->
                <div class="profile-header">
                    <img id="profilbild" src="img/ender.png" alt="Profile Picture" class="profile-picture">
                    <div id="badge" class="badge">79</div>
                    <h2 id="username">Julia Harrison</h2>
                    <p class="username">@mc_juli_420</p>
                </div>

                <!-- Statistiken -->
                <div class="stats">
                    <div class="stat">
                        <span id="userPosts">42</span>
                        <p>Posts</p>
                    </div>
                    <div class="stat">
                        <span id="followers">6.9k</span>
                        <p>Followers</p>
                    </div>
                    <div class="stat">
                        <span id="following">420</span>
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
                            <!-- <svg class="icon" width="100%" height="100%" viewBox="0 0 100 100">
                                <g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="11">
                                    <path d="m50 10v80" />
                                    <path d="m90 50h-80" />
                                </g>
                            </svg> -->
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
        <div id="footer" class="footer">
            <img src="svg/logo_farbe.svg" alt="loading">
        </div>
    </article>
    <div id="postView" class="none">
        <div class="cImg">
            
            <div id="comment-title"></div>
            <img id="comment-img" src="" alt="">
            <div id="comment-text"></div>
            <!-- <div class="shadow"></div> -->
        </div>
        <div id="comments" class="comments">
            <div class="comment">
                <div class="commentUser">
                    <img src="img/ender.png" alt="user image">
                    <span>ender</span>
                </div>
                <p>kjascka kha  ac kha ckas ckahs cka ka ckaa cka cka ka cka ckha kha cak kh akhc aks </p>
                <span class="commentDate" >datum</span>
            </div> 
        </div>
        <div id="close"><img src="svg/plus2.svg" alt="close"></div>
    </div>
</body>

</html>