import { authClient } from '$lib/auth_client';
import { getUserSubscription } from '$lib/utils/get_user_subscription';
import { goto } from '$app/navigation';

export async function subscriptionBasedRouting() {
	const customerPlan = await getUserSubscription();
	const session = await authClient.getSession();

	if (session.data && (customerPlan === undefined || customerPlan === '')) {
		goto('/pricing');
	} else if (session.data && customerPlan !== undefined) {
		goto('/homepage');
	} else if (session.data == null) {
		goto('/landing');
	}
}
