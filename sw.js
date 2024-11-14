// service-worker.js

const CACHE_NAME = "peer-cache-v6";

// Dateiendungen, die gecacht werden sollen
const fileExtensionsToCache = [
  ".png",
  ".jpg",
  ".jpeg",
  ".bmp",
  ".gif",
  ".webp",
  ".js",
  ".css",
  ".json",
  ".woff2",
  ".php"
];

// Installations-Ereignis: Basis-Assets cachen
self.addEventListener("install", (event) => {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     return cache.addAll([
  //       "../fonts/Poppins-Medium.woff2"
  //     ]);
  //   })
  // );
  event.waitUntil(
    fetch("cache.php") // Die JSON-Datei abrufen
      .then((response) => response.json())
      .then(async (files) => {
        const cache = await caches.open(CACHE_NAME);
        return await Promise.all(
          files.map(async (file) => {
            try {
              return await cache.add(file);
            } catch (error) {
              console.error("Fehler beim Cachen der Datei:", file, error);
            }
          })
        );
      })
  );
});

// Aktivierungs-Ereignis: Alte Caches löschen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch-Ereignis: Dynamisches Caching für bestimmte Dateitypen
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;
  if (event.request.method !== "GET" ) {
    /* If we don't block the event as shown below, then the request will go to
           the network as usual.
        */
    /*  console.log('WORKER: fetch event ignored.', event.request.method, event.request.url); */
    return;
  }
  // Überprüfe, ob die Anfrage eine der gewünschten Dateiendungen enthält
  const myString = requestUrl;
  const start = myString.lastIndexOf(".");
  const end = myString.indexOf("?", start);

  // Extrahiert den Teil zwischen letztem Punkt und erstem Fragezeichen
  const result = myString.substring(start, end === -1 ? myString.length : end);

  if (fileExtensionsToCache.some((extension) => result.endsWith(extension))) {
    if (event.request.url.endsWith(".php") || event.request.url.endsWith("sw.min.js")) {
      event.respondWith(
        fetch(event.request)
          .then(async (response) => {
            // Erfolgreiche Netzwerkantwort, speichern im Cache
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            // Bei Netzwerkfehler Rückgriff auf Cache
            return caches.match(event.request);
          })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then((response) => {
          // Wenn die Datei im Cache ist, liefere sie zurück
          if (response) {
            return response;
          }

          // Falls nicht, hole sie über das Netzwerk und speichere sie im Cache
          return fetch(event.request).then((networkResponse) => {
            // Überprüfe, ob die Antwort gültig ist
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            // Klone die Antwort und speichere sie im Cache
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
          });
        })
      );
    }
  } else {
    // Standardverhalten für andere Anfragen
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
