const currentCache = 'v1.3';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(currentCache).then((cache) => {
			return cache.addAll([
				'/',
				'/js/app.js',
				'/css/style.css',
				'/index.html',
				'/digimon.html',
				'/images/cuernito.jpeg',
			]);
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== currentCache) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
