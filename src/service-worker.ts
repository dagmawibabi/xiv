/* eslint-disable @typescript-eslint/no-unused-vars */
self.addEventListener('install', (event) => {
	// @ts-expect-error didn't want to make this a JS file
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	// @ts-expect-error didn't want to make this a JS file
	clients.claim();
});
