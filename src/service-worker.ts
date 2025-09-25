self.addEventListener('install', (event) => {
	// @ts-ignore
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	// @ts-ignore
	clients.claim();
});
