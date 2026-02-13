self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("construccion-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./css/style.css",
        "./js/precios.js",
        "./js/core.js",
        "./js/muros.js"
      ]);
    })
  );
});
