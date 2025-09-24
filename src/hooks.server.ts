import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

// Initialize auth when the server starts
const authInstance = await auth;

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
		'/api/auth/callback/google',
		'/api/checkout',
		'/api/stats',
		'/api/auth/customer/state',
		'/api/auth/error',
		'/landing',
		'/api/customer',
		'/api/get_subscription',
		// '/api/chat',
		'/usage/ingest',
		'/'
	];

	// console.log(
	// 	event.url.pathname,
	// 	typeof event.url.pathname,
	// 	publicRoutes.includes(event.url.pathname)
	// );

	if (
		session == null &&
		!publicRoutes.includes(event.url.pathname) &&
		!event.url.pathname.startsWith('/api/auth/callback/')
	) {
		throw redirect(303, '/');
	}

	return response;
}
