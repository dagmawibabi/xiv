// import { authClient } from '$lib/auth_client';
// import { getUserSubscription } from '$lib/utils/get_user_subscription';
import { goto } from '$app/navigation';

export async function subscriptionBasedRouting() {
	try {
		const result = await fetch('/api/get_subscription');
		const data = await result.json();

		if (data.error === 'User not authenticated') {
			goto('/landing');
		} else if (data.planName === null) {
			goto('/pricing');
		} else if (data.planName) {
			goto('/homepage');
		}
	} catch (error) {
		console.error('Error fetching subscription:', error);
	}
}

// export async function subscriptionBasedRouting() {
// 	const customerPlan = await getUserSubscription();
// 	const session = await authClient.getSession();
// 	console.log('session', session);

// 	if (session.data == null) {
// 		// No session
// 		goto('/landing');
// 	} else if (session.data && (customerPlan === undefined || customerPlan === '')) {
// 		// Has session but no plan
// 		goto('/pricing');
// 	} else if (session.data && customerPlan !== undefined) {
// 		// Has session and plan
// 		goto('/homepage');
// 	}
// }
