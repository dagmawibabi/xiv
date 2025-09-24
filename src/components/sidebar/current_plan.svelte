<script lang="ts">
	import { onMount } from 'svelte';
	import { getUserSubscription } from '$lib/utils/get_user_subscription';
	import { subscriptionState } from '../../state/subscription_state.svelte';

	// let customerPlan = $state('');

	// onMount(async () => {
	// 	customerPlan = await getUserSubscription();
	// });
</script>

<div class="">
	<!-- {customerPlan} -->
	{subscriptionState.currentPlan}
</div>
