import { json } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import { Polar } from '@polar-sh/sdk';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	try {
		// Initialize auth
		const authInstance = await auth;

		// Get session from headers
		const session = await authInstance.api.getSession({
			headers: request.headers
		});

		// If no session, return empty state (for unauthenticated users)
		if (!session?.session?.userId) {
			return json({
				data: null,
				error: null
			});
		}

		// Initialize Polar client
		const polarClient = new Polar({
			accessToken: process.env.POLAR_ACCESS_TOKEN
		});

		// Get customer state using Polar client
		const customer = await polarClient.customers.get({
			id: session.session.userId
		});

		return json({
			data: {
				customer,
				activeSubscriptions: []
			},
			error: null
		});
	} catch (error) {
		console.error('Error getting customer state:', error);
		return json({
			data: null,
			error: 'Internal server error'
		}, { status: 500 });
	}
};
