document.addEventListener("DOMContentLoaded", () => {
  restoreFilterSettings();
  hello();
  getUser();
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();

  const closeComments = document.getElementById("closeComments");
  closeComments.addEventListener("click", () => {
    document.getElementById("overlay").classList.toggle("postViewShow");
  });

  if (window.matchMedia("(display-mode: standalone)").matches) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn(
        `Vollbildmodus konnte nicht aktiviert werden: ${err.message}`
      );
    });
  }

  const scrollContainer = document.getElementById("comments");
  scrollContainer.addEventListener(
    "wheel",
    (event) => {
      // Prüfen, ob das Scrollen am oberen oder unteren Rand des inneren Containers angekommen ist
      const atTop = scrollContainer.scrollTop === 0;
      const atBottom =
        scrollContainer.scrollTop + scrollContainer.clientHeight + 1 >=
        scrollContainer.scrollHeight;

      // Wenn das innere Element am oberen Rand ist und nach oben gescrollt wird, oder am unteren Rand und nach unten gescrollt wird
      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
        // Verhindern, dass das Event weitergegeben wird
        event.preventDefault();
      }
      event.stopPropagation();
    },
    { capture: false, passive: false }
  );

  addScrollBlocker(document.getElementById("addPost"));
  addScrollBlocker(document.getElementById("overlay"));

  const imgContainer = document.getElementById('comment-img-container');

  imgContainer.addEventListener('wheel', (event) => {
      event.preventDefault(); // Verhindert Standard-Scroll-Verhalten
      event.stopPropagation();

      imgContainer.scrollBy({
          left: event.deltaY, // Scroll horizontal entsprechend des Mausrads
          behavior: 'smooth' // Sanftes Scrollen
      });
  },{ capture: true, passive: false });  ;

  const footer = document.getElementById("footer");
  // Funktion erstellen, die aufgerufen wird, wenn der Footer in den Viewport kommt
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        postsLaden();
        console.log("Der Footer ist jetzt im Viewport sichtbar!");
      }
    });
  };
  const observerOptions = {
    root: null, // null bedeutet, dass der Viewport als root genutzt wird
    threshold: 0.1, // 10% des Footers müssen im Viewport sein, um die Funktion auszulösen
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(footer);

  document
    .getElementById("btAddPost")
    .addEventListener("click", function startAddPost() {
      addPost();
    });
  const closeAddPost = document.getElementById("closeAddPost");
  closeAddPost.addEventListener("click", () => {
    document.getElementById("addPost").classList.remove("postViewShow");
    document.getElementById("addPost").classList.add("none");
  });
  document
    .getElementById("createPost")
    .addEventListener("click", async function createPost(event) {
      event.preventDefault(); // Prevent form reload
      const title = document.getElementById("bildueberschrift").value;
      const beschreibung = document.getElementById("bildbeschreibung").value;
      const imageWrappers = document.querySelectorAll(".image-wrapper");

      const combinedHTML = Array.from(imageWrappers)
        .map((wrapper) => wrapper.outerHTML.trim()) // Get the innerHTML of each element and trim whitespace
        .join(" "); // Concatenate the HTML content with a space in between
      if (
        await sendCreatePost({
          title: title,
          media: combinedHTML,
          mediadescription: beschreibung,
          contenttype: "image",
        })
      ) {
        document.getElementById("addPost").classList.remove("postViewShow");
        document.getElementById("addPost").classList.add("none");
        location.reload();
      }
    });

  const checkboxes = document.querySelectorAll(
    '#filter input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      saveFilterSettings();
      const elements = document.querySelectorAll(
        `[content="${event.target.name}"]`
      );
      if (event.target.checked) {
        elements.forEach((element) => {
          element.classList.remove("none");
        });
        console.log(`${event.target.name} wurde aktiviert.`);
      } else {
        elements.forEach((element) => {
          element.classList.add("none");
        });
        console.log(`${event.target.name} wurde deaktiviert.`);
      }
    });
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      header.style.top = "0"; // Stelle sicher, dass der Header sichtbar bleibt
    }
  });

  // const container = document.getElementById("main");
  let lastScrollPosition = 0;
  // let offset=0;
  window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;
    if (window.innerWidth < 9999) {
      if (currentScrollTop > lastScrollPosition) {
        // Runterscrollen: Header verschwindet
        // offset = Math.max( offset - (currentScrollTop - lastScrollPosition),-80);
        // header.style.top = `${offset}px`;
        header.classList.add("none");
      } else {
        // Hochscrollen: Header erscheint wieder
        // offset = Math.min( offset - (currentScrollTop - lastScrollPosition),-0);
        // header.style.top = `${offset}px`;
        header.classList.remove("none");
      }
    }

    // Aktuelle Scroll-Position speichern
    lastScrollPosition = currentScrollTop;
  });

  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("file-input");

  dropArea.addEventListener("click", () => fileInput.click());

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("hover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("hover");
  });

  dropArea.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropArea.classList.remove("hover");

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFiles(files);
    }
  });

  fileInput.addEventListener("change", async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      processFiles(files);
    }
  });
});
// window.addEventListener("load", () => {

// });
async function addScrollBlocker(element) {
  element.addEventListener(
    "wheel",
    (event) => {
      event.stopPropagation();
      event.preventDefault();
    },
    { capture: false, passive: false }
  );
}
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

async function postsLaden() {
  if (postsLaden.offset === undefined) {
    postsLaden.offset = 0; // Initialwert
  }

  // // Formular auswählen
  // const form = document.querySelector("#filter");

  // // Alle Checkboxen im Formular auswählen
  // const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

  // // Werte der ausgewählten Checkboxen sammeln
  // const checkedValues = Array.from(checkboxes).map(
  //   (checkbox) => checkbox.value
  // );

  // // JSON-Objekt erstellen
  // const jsonResult = {
  //   filterBy: checkedValues,
  // };

  // // JSON anzeigen (z. B. in der Konsole)
  // console.log(JSON.stringify(jsonResult));
  // Formular mit ID auswählen
  const form = document.querySelector("#filter");

  // Alle Checkboxen innerhalb des Formulars abrufen
  const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

  // Die Werte der angehakten Checkboxen sammeln
  const values = Array.from(checkboxes).map((checkbox) => checkbox.name);

  // Werte als komma-getrennte Zeichenkette zusammenfügen
  const result = values.join(" ");

  // Ergebnis ausgeben
  console.log(result);

  const posts = await getPosts(postsLaden.offset, 12, result);

  // Übergeordnetes Element, in das die Container eingefügt werden (z.B. ein div mit der ID "container")
  const parentElement = document.getElementById("main"); // Das übergeordnete Element

  // Array von JSON-Objekten durchlaufen und für jedes Objekt einen Container erstellen
  posts.data.getallposts.forEach((objekt) => {
    // Haupt-<section> erstellen
    const card = document.createElement("section");
    card.classList.add("card");
    card.setAttribute("tabindex", "0");
    card.setAttribute("content", objekt.contenttype);

    // <div class="post"> erstellen und Bild hinzufügen

    const parts = objekt.media.split(",");

    // Mit einer Schleife durchlaufen
    let trimmedPart;
    let postDiv;
    let img;
    postDiv = document.createElement("div");
    postDiv.classList.add("post");
    if (parts.length > 1) postDiv.classList.add("multi");
    for (const part of parts) {
      trimmedPart = part.trim();
      img = document.createElement("img");

      img.onload = () => {
        img.setAttribute("height", img.naturalHeight);
        img.setAttribute("width", img.naturalWidth);
      };
      img.onerror = (error) => {
        // Fehler behandeln, wenn das Bild nicht geladen werden kann
        // reject(error);
      };

      img.src = tempMedia(trimmedPart);
      img.alt = "";

      postDiv.appendChild(img);
    }

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
      svgLike.addEventListener(
        "click",
        function handleLikeClick(event) {
          event.stopPropagation();
          event.preventDefault();
          likePost(objekt.id).then((success) => {
            if (success) {
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
            }
            svgLike.removeEventListener("click", handleLikeClick);
          });
        },
        { capture: true }
      );
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
    postsLaden.offset++;
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
  const el = document.getElementById("overlay");
  el.classList.toggle("postViewShow");
  const imageContainer = document.getElementById("comment-img-container");

  const parts = objekt.media.split(",");
  let trimmedPart;
  let img;
  imageContainer.classList.add("comment-img");
  imageContainer.innerHTML = "";
  if (parts.length > 1) imageContainer.classList.add("multi");
  for (const part of parts) {
    trimmedPart = part.trim();
    img = document.createElement("img");
    img.src = tempMedia(trimmedPart);
    img.alt = "";
    imageContainer.appendChild(img);
  }

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

      const svgNS = "http://www.w3.org/2000/svg";
      const likeContainer = document.createElement("div");
      likeContainer.classList.add("likeComment");
      const svgLike = document.createElementNS(svgNS, "svg");
      svgLike.setAttribute("id", c.commentid);

      if (c.isliked) {
        // svgLike.addEventListener("click", function () {
        //   dislikePost(objekt.id);
        // });
        svgLike.classList.add("fill-red"); // Rot hinzufügen
      } else {
        svgLike.addEventListener(
          "click",
          function handleLikeClick(event) {
            event.stopPropagation();
            event.preventDefault();
            likeComment(c.commentid);
            c.isliked = true;
            c.amountlikes++;
            let e = document.getElementById(c.commentid);
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
          },
          { capture: true }
        );
      }
      const useLike = document.createElementNS(svgNS, "use");
      useLike.setAttribute("href", "#post-like");
      svgLike.appendChild(useLike);
      likeContainer.appendChild(svgLike);
      const spanLike = document.createElement("span");
      spanLike.textContent = formatNumber(c.amountlikes);
      likeContainer.appendChild(spanLike);

      const commentDate = document.createElement("span");
      commentDate.textContent = c.createdat.substring(0, 10);
      commentDate.classList.add("commentDate");
      likeContainer.appendChild(commentDate);

      // Zusammenfügen der Elemente
      commentUser.appendChild(img);
      commentUser.appendChild(userNameSpan);
      comment.appendChild(commentUser);
      comment.appendChild(commentParagraph);
      comment.appendChild(likeContainer);
      comments.appendChild(comment);
    });
}
// postsLaden();
// Das Footer-Element auswählen

const header = document.getElementById("header");
// let lastScrollPosition = 0;

// function handleScroll() {
//   const main = document.getElementById("main");
//   // Überprüfen, ob die Bildschirmbreite die Bedingung erfüllt
//   if (window.innerWidth < 1200) {
//     // Beispiel: Nur auf größeren Bildschirmen
//     const currentScrollPosition = main.scrollY;

//     // Header aus dem Viewport scrollen lassen
//     if (currentScrollPosition > lastScrollPosition) {
//       // Runterscrollen: Header verschwindet
//       header.style.top = `-${header.offsetHeight}px`;
//     } else {
//       // Hochscrollen: Header erscheint wieder
//       header.style.top = "0";
//     }

//     // Aktuelle Scroll-Position speichern
//     lastScrollPosition = currentScrollPosition;
//   } else {
//     // Auf kleinen Bildschirmen: Header bleibt sichtbar
//     header.style.top = "0";
//   }
// }

// const main = document.getElementById("main");
// // Scroll-Event-Listener hinzufügen
// main.addEventListener("scroll", handleScroll);

// Responsiveness: Prüfen bei Fensteränderungen

async function processFiles(files) {
  const previewContainer = document.getElementById("preview-container");
  let previewItem;
  files.forEach(async (file) => {
    if (!file.type.startsWith("image/")) {
      info("Information", `${file.name} ist keine Bilddatei.`);
      return;
    }
    previewItem = document.createElement("div");
    previewItem.className = "preview-item";
    previewItem.innerHTML = `
    <p>${file.name}</p>
    <img class="image-wrapper none" alt="Vorschau" />
    <img src="svg/logo_farbe.svg" class="loading" alt="loading">
    <img src="svg/plus2.svg" class="none btClose deletePost" alt="delete">
  `;
    previewContainer.appendChild(previewItem);

    const progressBar = previewItem.querySelector("progress");
    const imageElement = previewItem.querySelector("img");

    const base64 = await convertImageToBase64(file, progressBar);

    imageElement.src = `data:image/webp;base64,${base64}`;
    // imageElement.style.display = "block";
    imageElement.classList.remove("none");
    imageElement.nextElementSibling.remove();
    imageElement.nextElementSibling.classList.remove("none");
  });
  document.querySelectorAll(".deletePost").forEach(addDeleteListener);
}
// Funktion, die dem Element den Event-Listener hinzufügt
function addDeleteListener(element) {
  // Entfernt eventuelle alte Event-Listener, indem eine benannte Funktion verwendet wird
  element.removeEventListener("click", handleDelete);

  // Fügt den neuen Event-Listener hinzu
  element.addEventListener("click", handleDelete);
}

// Die Funktion, die beim Event aufgerufen wird
function handleDelete(event) {
  event.preventDefault(); // Verhindert Standardverhalten (z. B. Link-Weiterleitung)
  console.log("Post löschen:", event.target);
  event.target.parentElement.remove();
  document.getElementById("file-input").value = ""; // Datei-Auswahl zurücksetzen
}

function createPreviewItem(fileName) {
  const previewItem = document.createElement("div");
  previewItem.className = "preview-item";

  previewItem.innerHTML = `
    
    <p>${fileName}</p>
    <img class="image-wrapper none" alt="Vorschau" />
    <img src="svg/logo_farbe.svg" class="loading" alt="loading">
    <img src="svg/plus2.svg" class="none btClose deletePost" alt="delete">
  `;

  return previewItem;
}

async function convertImageToBase64(file, progressBar) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
    };
    reader.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Konvertiere zu WebP und hole die Base64-Daten
      const webpDataUrl = canvas.toDataURL("image/webp");
      resolve(webpDataUrl.split(",")[1]); // Base64-Teil zurückgeben
    };

    reader.readAsDataURL(file);
  });
}

function updateProgress(progressBar, value) {
  progressBar.value = value;
}
function addPost(objekt) {
  const el = document.getElementById("addPost");
  el.classList.toggle("none");
  el.classList.toggle("postViewShow");
}

function saveFilterSettings() {
  let filterSettings = {};
  let checkboxes = document.querySelectorAll('#filter input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    filterSettings[checkbox.name] = checkbox.checked; // Speichert Name und Zustand
  });

  localStorage.setItem("filterSettings", JSON.stringify(filterSettings)); // In localStorage speichern
}
function restoreFilterSettings() {
  let filterSettings = JSON.parse(localStorage.getItem("filterSettings")); // Aus localStorage laden

  if (filterSettings) {
    let checkboxes = document.querySelectorAll(
      '#filter input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
      if (filterSettings[checkbox.name] !== undefined) {
        checkbox.checked = filterSettings[checkbox.name]; // Zustand setzen
      }
    });
  }
}
