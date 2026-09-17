```javascript
const CACHE_NAME = "nr-kirana-admin-v2";

const ADMIN_FILES = [
  "./admin-login.html",
  "./admin.html",
  "./admin-products.html",
  "./admin-customers.html",
  "./admin-delivery.html",
  "./admin-notifications.html",
  "./admin-manifest.json"
];


/* =========================================
   INSTALL
========================================= */

self.addEventListener("install", function(event) {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(function(cache) {

        return cache.addAll(ADMIN_FILES);

      })
      .then(function() {

        return self.skipWaiting();

      })

  );

});


/* =========================================
   ACTIVATE
========================================= */

self.addEventListener("activate", function(event) {

  event.waitUntil(

    caches.keys()
      .then(function(cacheNames) {

        return Promise.all(

          cacheNames.map(function(cacheName) {

            if (
              cacheName !== CACHE_NAME &&
              cacheName.startsWith("nr-kirana-admin-")
            ) {

              return caches.delete(cacheName);

            }

            return null;

          })

        );

      })
      .then(function() {

        return self.clients.claim();

      })

  );

});


/* =========================================
   FETCH
========================================= */

self.addEventListener("fetch", function(event) {

  const request = event.request;


  /*
    सिर्फ GET requests को handle करें
  */

  if (
    request.method !== "GET"
  ) {

    return;

  }


  /*
    Browser navigation request
    */

  if (
    request.mode === "navigate"
  ) {

    event.respondWith(

      fetch(request)

        .then(function(response) {

          return response;

        })

        .catch(function() {

          return caches.match(
            "./admin-login.html"
          );

        })

    );

    return;

  }


  /*
    बाकी files के लिए:
    Network First
    फिर Cache
  */

  event.respondWith(

    fetch(request)

      .then(function(response) {

        /*
          अगर response सही है
          तो cache में save करें।
        */

        if (
          response &&
          response.status === 200 &&
          response.type === "basic"
        ) {

          const responseClone =
            response.clone();


          caches.open(CACHE_NAME)
            .then(function(cache) {

              cache.put(
                request,
                responseClone
              );

            });

        }


        return response;

      })

      .catch(function() {

        /*
          Internet नहीं है तो
          Cache से file खोलें।
        */

        return caches.match(
          request
        );

      })

  );

});


/* =========================================
   MESSAGE
========================================= */

self.addEventListener(
  "message",
  function(event) {

    if (
      event.data &&
      event.data.type ===
      "SKIP_WAITING"
    ) {

      self.skipWaiting();

    }

  }
);
```
