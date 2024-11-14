// Funktion zum Aktualisieren des Offline-Status
function updateOnlineStatus() {
  const statusBanner = document.getElementById("h1");
  if (!navigator.onLine) {
    // Wenn offline, Banner anzeigen
    statusBanner.classList.add("offline");
    statusBanner.textContent = "offline";
  } else {
    // Wenn online, Banner ausblenden
    statusBanner.classList.remove("offline");
    statusBanner.textContent = "Dashboard";
  }
}
window.addEventListener("load", () => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  const close = document.getElementById("close");
  close.addEventListener("click", () => {
    document.getElementById("postView").classList.toggle("postViewShow");
  });

  updateOnlineStatus(); // Initialen Status setzen
});
document.addEventListener("DOMContentLoaded", () => {
  // Prüfen, ob die App im Standalone-Modus läuft
  if (window.matchMedia("(display-mode: standalone)").matches) {
    // Optional: Vollbildmodus automatisch aktivieren
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn(
        `Vollbildmodus konnte nicht aktiviert werden: ${err.message}`
      );
    });
  }
});

async function getUser() {
  const profil = await fetchHelloData();
  const id = getCookie("userID");
  if (!id) {
    const profil_container = document.getElementById("profil-container");
    const profil_login = document.getElementById("profil-login");
    profil_container.classList.add("none");
    profil_login.classList.remove("none");
  } else {
    document.getElementById("username").innerText =
      profil.data.profile.affectedRows.username;
    document.getElementById("userPosts").innerText =
      profil.data.profile.affectedRows.amountposts;
    document.getElementById("followers").innerText =
      profil.data.profile.affectedRows.amountfollower;
    document.getElementById("following").innerText =
      profil.data.profile.affectedRows.amountfollowed;
    document.getElementById("profilbild").src = tempMedia(
      profil.data.profile.affectedRows.img
    );
  }
  return profil;
}
function appendPost(json) {
  const parentElement = document.getElementById("parent-id"); // Das übergeordnete Element
  const letztesDiv = parentElement.lastElementChild;
}
hello();
getUser();
async function postsLaden() {
  const posts = await getPosts(0, 100, "2024-07-01", "2024-11-30");
  // Übergeordnetes Element, in das die Container eingefügt werden (z.B. ein div mit der ID "container")
  const parentElement = document.getElementById("main"); // Das übergeordnete Element

  // Array von JSON-Objekten durchlaufen und für jedes Objekt einen Container erstellen
  posts.data.getallposts.forEach((objekt) => {
    // Haupt-<section> erstellen
    const card = document.createElement("section");
    card.classList.add("card");
    card.setAttribute("tabindex", "0");

    // <div class="post"> erstellen und Bild hinzufügen
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    const img = document.createElement("img");
    img.src = tempMedia(objekt.media);
    img.alt = "";
    postDiv.appendChild(img);

    const shadowDiv = document.createElement("div");
    shadowDiv.classList.add("shadow");
    postDiv.appendChild(shadowDiv);

    // <div class="post-inhalt"> erstellen und Titel und Text hinzufügen
    const inhaltDiv = document.createElement("div");
    inhaltDiv.classList.add("post-inhalt");
    const h1 = document.createElement("h1");
    h1.textContent = objekt.title;
    const p = document.createElement("p");
    p.classList.add("post-text");
    p.textContent = objekt.mediadescription;
    inhaltDiv.appendChild(h1);
    inhaltDiv.appendChild(p);

    const svgNS = "http://www.w3.org/2000/svg";
    // <div class="social"> erstellen mit Social-Icons und leeren <span>
    const socialDiv = document.createElement("div");
    socialDiv.classList.add("social");
    const viewContainer = document.createElement("div");

    // Erstes SVG-Icon mit #post-view
    const svgView = document.createElementNS(svgNS, "svg");
    const useView = document.createElementNS(svgNS, "use");
    useView.setAttribute("href", "#post-view");
    svgView.appendChild(useView);
    viewContainer.appendChild(svgView);

    // Leeres <span> für #post-view
    const spanView = document.createElement("span");
    spanView.textContent = formatNumber(objekt.amountviews);
    viewContainer.appendChild(spanView);
    socialDiv.appendChild(viewContainer);

    // Zweites SVG-Icon mit #post-like
    const likeContainer = document.createElement("div");

    const svgLike = document.createElementNS(svgNS, "svg");
    svgLike.setAttribute("id", objekt.id);

    if (objekt.isliked) {
      // svgLike.addEventListener("click", function () {
      //   dislikePost(objekt.id);
      // });
      svgLike.classList.add("fill-red"); // Rot hinzufügen
    } else {
      svgLike.addEventListener("click", function handleLikeClick() {
        likePost(objekt.id);
        let e = document.getElementById(objekt.id);
        e.classList.add("fill-red");

        // Prüfen, ob das <span> "K" oder "M" enthält
        if (
          e.nextElementSibling.textContent.includes("K") ||
          e.nextElementSibling.textContent.includes("M")
        ) {
          return; // Wenn ja, wird das Hochzählen übersprungen
        } else {
          let currentCount = parseInt(e.nextElementSibling.textContent);
          currentCount++;
          e.nextElementSibling.textContent = formatNumber(currentCount);
        }
        svgLike.removeEventListener("click", handleLikeClick);
      });
    }
    const useLike = document.createElementNS(svgNS, "use");
    useLike.setAttribute("href", "#post-like");
    svgLike.appendChild(useLike);
    likeContainer.appendChild(svgLike);
    const spanLike = document.createElement("span");
    spanLike.textContent = formatNumber(objekt.amountlikes);
    likeContainer.appendChild(spanLike);
    socialDiv.appendChild(likeContainer);

    // Drittes SVG-Icon mit #post-comment
    const commentContainer = document.createElement("div");
    const svgComment = document.createElementNS(svgNS, "svg");
    const useComment = document.createElementNS(svgNS, "use");
    useComment.setAttribute("href", "#post-comment");
    svgComment.appendChild(useComment);
    commentContainer.appendChild(svgComment);

    // Leeres <span> für #post-comment
    const spanComment = document.createElement("span");
    spanComment.textContent = objekt.amountcomments;
    commentContainer.appendChild(spanComment);

    socialDiv.appendChild(commentContainer);

    // Alles in die Haupt-<section> hinzufügen
    card.appendChild(postDiv);
    card.appendChild(inhaltDiv);
    card.appendChild(socialDiv);
    card.addEventListener("click", function handleCardClick() {
      postClicked(objekt);
    });
    // Die <section class="card"> in das übergeordnete Container-Element hinzufügen
    parentElement.appendChild(card);
  });

  // console.log("amountcomments:", objekt.amountcomments);
  // console.log("amountdislikes:", objekt.amountdislikes);
  // console.log("amountlikes:", objekt.amountlikes);
  // console.log("amountviews:", objekt.amountviews);
  // console.log("contenttype:", objekt.contenttype);
  // console.log("createdat:", objekt.createdat);
  // console.log("isdisliked:", objekt.isdisliked);
  // console.log("isliked:", objekt.isliked);
  // console.log("isreported:", objekt.isreported);
  // console.log("issaved:", objekt.issaved);
  // console.log("isviewed:", objekt.isviewed);
  // console.log("media:", objekt.media);
  // console.log("mediadescription:", objekt.mediadescription);
  // console.log("title:", objekt.title);
}
function postClicked(objekt) {
  const el = document.getElementById("postView");
  el.classList.toggle("postViewShow");
  const image = document.getElementById("comment-img");
  image.src = tempMedia(objekt.media);
  const title = document.getElementById("comment-title");
  title.innerText = objekt.title;
  const text = document.getElementById("comment-text");
  text.innerText = objekt.mediadescription;
  // console.log(objekt.id );
  // console.log(objekt.media );
  const comments = document.getElementById("comments");
  comments.innerHTML = "";
  objekt.comments
    .slice()
    .reverse()
    .forEach(function (c) {
      const comment = document.createElement("div");
      comment.classList.add("comment");

      // User-Info-Container <div class="commentUser">
      const commentUser = document.createElement("div");
      commentUser.classList.add("commentUser");

      // Benutzerbild <img src="userImage" alt="user image">
      const img = document.createElement("img");

      img.src = c.user.img ? tempMedia(c.user.img) : "svg/friends.svg";
      img.alt = "user image";

      // Benutzername <span>userName</span>
      const userNameSpan = document.createElement("span");
      userNameSpan.textContent = c.user.username;

      // Kommentar-Text <p>commentText</p>
      const commentParagraph = document.createElement("p");
      commentParagraph.textContent = c.content;

      const commentDate = document.createElement("span");
      commentDate.textContent = c.createdat;
      commentDate.classList.add("commentDate");
      // Zusammenfügen der Elemente
      commentUser.appendChild(img);
      commentUser.appendChild(userNameSpan);
      comment.appendChild(commentUser);
      comment.appendChild(commentParagraph);
      comment.appendChild(commentDate);
      comments.appendChild(comment);
    });
}
postsLaden();
// Das Footer-Element auswählen
const footer = document.getElementById("footer");

// Funktion erstellen, die aufgerufen wird, wenn der Footer in den Viewport kommt
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("Der Footer ist jetzt im Viewport sichtbar!");
      // Hier kannst du jede beliebige Aktion durchführen, wenn der Footer sichtbar wird
    }
  });
};

// Optionen für den Observer (optional)
const observerOptions = {
  root: null, // null bedeutet, dass der Viewport als root genutzt wird
  threshold: 0.1, // 10% des Footers müssen im Viewport sein, um die Funktion auszulösen
};

// Intersection Observer erstellen
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Den Observer auf den Footer anwenden
observer.observe(footer);
