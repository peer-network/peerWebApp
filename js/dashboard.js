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
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

async function hello() {
  const accessToken = getCookie("authToken");
  const url = "https://getpeer.eu/graphql";

  // Create headers
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  // Define the GraphQL mutation with variables
  const graphql = JSON.stringify({
    query: `query Hello {
    hello {
        root
        args
        context
        currentuserid
    }
}`,
  });

  // Define request options
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: graphql,
    redirect: "follow",
  };

  try {
    // Send the request and handle the response
    const response = await fetch(url, requestOptions);
    const result = await response.json();

    // Check for errors in response
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    if (result.errors) throw new Error(result.errors[0].message);

    const { root, args, context, currentuserid } = result.data.hello;
    document.cookie = `userID=${currentuserid}; path=/; secure; SameSite=Strict`;
    return { root, args, context, currentuserid };
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
async function getUser() {
  const huhu = await hello();
  const id = getCookie("userID");
  if (!id) {
    const profil_container = document.getElementById("profil-container");
    const profil_login = document.getElementById("profil-login");
    profil_container.classList.add("none")
    profil_login.classList.remove("none")
  }
}
getUser();
