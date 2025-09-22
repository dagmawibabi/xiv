// import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';
import { auth } from '$lib/auth';
// import { auth } from '$lib/auth';
// import { ObjectId } from 'mongodb';

type PackageId =
	| 'f44fbcbe-b2cc-48f4-acc8-ef6d888533a9'
	| 'fff68be3-0d9e-4013-b446-24f68bb3f6b3'
	| '134b3384-7ecf-4d15-b774-f2e16e2aecc2';

const packages: Record<PackageId, string> = {
	'f44fbcbe-b2cc-48f4-acc8-ef6d888533a9': 'Free',
	'fff68be3-0d9e-4013-b446-24f68bb3f6b3': 'Plus',
	'134b3384-7ecf-4d15-b774-f2e16e2aecc2': 'Pro'
};

export async function GET({ request }) {
	// Get user session
	const session = await getSession(request);
	const userID = session?.user.id;

	// No authenticated user
	if (!userID) {
		return json({ error: 'User not authenticated' }, { status: 401 });
	}

	// Init Auth
	const authInstance = await auth;

	try {
		// Get customer state
		const customerInfo = await authInstance.api.state({
			headers: request.headers
		});
		const customerPlan = customerInfo.activeSubscriptions[0].productId;
		const planName = packages[customerPlan as keyof typeof packages];

		// Return the Product ID
		return json({
			planName: planName || null
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		// Return the Product ID
		return json({
			planName: null
		});
	}
}

// export async function GET({ request }) {
// 	try {
// 		// Get user session (optional for public route)
// 		const session = await getSession(request);
// 		const userID = session?.user?.id;
// 		console.log('here2', userID);

// 		// If no authenticated user, return empty subscription data
// 		if (!userID) {
// 			return json({
// 				customerState: null,
// 				message: 'No authenticated user'
// 			});
// 		}

// 		console.log('here3');

// 		// Get subscription information for authenticated user using server-side auth
// 		try {
// 			const authInstance = await auth;

// 			// Try to get customer state using the server-side auth API
// 			// Note: This might need to be adjusted based on the actual Polar integration
// 			const customerState = await authInstance.api.getSession({
// 				headers: request.headers
// 			});

// 			console.log('Customer state:', customerState);

// 			// For now, return the session data as customer state
// 			// TODO: Implement proper Polar subscription retrieval
// 			return json({
// 				customerState: customerState?.user || null,
// 				message: customerState?.user ? 'User session found' : 'No customer state available'
// 			});
// 		} catch (error) {
// 			console.error('Error getting customer state:', error);
// 			return json({
// 				customerState: null,
// 				message: 'Error retrieving customer data'
// 			});
// 		}

// 	} catch (error) {
// 		console.error('Error in get_subscription:', error);
// 		return json({ error: 'Failed to check subscription' }, { status: 500 });
// 	}
// }
