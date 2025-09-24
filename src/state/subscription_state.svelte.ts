class SubscriptionState {
	currentPlan: string = $state('');

	limits = {
		Free: {
			selectPaperLimits: 5
		},
		Plus: {
			selectPaperLimits: 30
		},
		Pro: {
			selectPaperLimits: 50
		}
	};
}

export const subscriptionState = new SubscriptionState();
