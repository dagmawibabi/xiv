// import { svelteKitHandler } from 'better-auth/svelte-kit';
// import { mongoClient } from '$db/db';
// import { auth } from '$lib/auth';

// mongoClient
// 	.connect()
// 	.then(() => {
// 		console.log('Connected to MongoDB');
// 	})
// 	.catch((e) => {
// 		console.error('MongoDB connection error:', e);
// 	});

// export async function handle({ event, resolve }) {
// 	return svelteKitHandler({ event, resolve, auth });
// }

import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/auth';
// import { authClient } from '$lib/auth_client';
import { redirect } from '@sveltejs/kit';
// Initialize auth when the server starts
const authInstance = await auth;

// export async function handle({ event, resolve }) {
//   return svelteKitHandler({ event, resolve, auth: authInstance });
// }

export async function handle({ event, resolve }) {
	// Run better-auth first so it attaches session info to event.locals
	const response = await svelteKitHandler({
		event,
		resolve,
		auth: authInstance,
		building: false
	});

	const session = await (
		await auth
	).api.getSession({
		headers: event.request.headers
	});

	// Make session and user available on server
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	// Define public routes that don't need auth
	const publicRoutes = [
		'/auth/sign_in',
		'/auth/sign_up',
		'/auth/sign_out',
		'/api/auth/get-session',
		'/api/auth/sign-in/social',
		'/api/auth/sign-in/anonymous',
		'/landing'
	];

	if (
		session == null &&
		!publicRoutes.includes(event.url.pathname) &&
		!event.url.pathname.startsWith('/api/auth/callback/')
	) {
		throw redirect(303, '/auth/sign_in');
	}

	return response;
}
