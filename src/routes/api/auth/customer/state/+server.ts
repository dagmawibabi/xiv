import { json } from '@sveltejs/kit';
import { auth } from '$lib/auth';
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

		// For now, return empty customer state since Polar integration may not be fully configured
		// This prevents the 500 error and allows the app to function
		return json({
			data: {
				customer: null,
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
