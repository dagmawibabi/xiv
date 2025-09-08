import { authClient } from '$lib/auth_client';

type PackageId =
	| 'f44fbcbe-b2cc-48f4-acc8-ef6d888533a9'
	| 'fff68be3-0d9e-4013-b446-24f68bb3f6b3'
	| '134b3384-7ecf-4d15-b774-f2e16e2aecc2';

const packages: Record<PackageId, string> = {
	'f44fbcbe-b2cc-48f4-acc8-ef6d888533a9': 'Free',
	'fff68be3-0d9e-4013-b446-24f68bb3f6b3': 'Plus',
	'134b3384-7ecf-4d15-b774-f2e16e2aecc2': 'Pro'
};

export async function getUserSubscription() {
	try {
		const fullCustomerState = await authClient.customer.state();
		if (fullCustomerState.error) {
			return '';
		}
		if (fullCustomerState.data?.activeSubscriptions == undefined) {
			return '';
		}
		const customerPlan = fullCustomerState.data?.activeSubscriptions[0].productId;
		const planName = packages[customerPlan as keyof typeof packages];
		return planName;
	} catch (error) {
		console.error('Error getting user subscription:', error);
		return '';
	}
}
