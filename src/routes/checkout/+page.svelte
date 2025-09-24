<script lang="ts">
	import { onMount } from 'svelte';
	import { subscriptionBasedRouting } from '$lib/utils/subscription_based_routing';
	import { BarLoader } from 'svelte-loading-spinners';
	import logo from '$lib/assets/logo/logo.png';
	import { goto } from '$app/navigation';
	import { subscriptionState } from '../../state/subscription_state.svelte';

	// function delay(ms: number | undefined) {
	// 	return new Promise((resolve) => setTimeout(resolve, ms));
	// }

	// async function fetchSubscription() {
	// 	var result = await fetch('/api/get_subscription');
	// 	console.log('boii', result);
	// }

	onMount(async () => {
		const result = await fetch('/api/get_subscription');
		const data = await result.json();

		if (data.error === 'User not authenticated') {
			goto('/landing');
		} else if (data.planName === null) {
			goto('/pricing');
		} else if (data.planName) {
			subscriptionState.currentPlan = data.planName;
			goto('/homepage');
		}
		// await delay(2000);
		// await subscriptionBasedRouting();
		// await fetchSubscription();
	});
</script>

<div class="flex h-[90%] flex-col items-center justify-center">
	<div class="flex flex-col items-center">
		<img src={logo} alt="placeholder" class="m-auto h-40 w-40" />
		<!-- <div class="text-2xl font-semibold">ScholarXIV</div> -->
		<BarLoader size="52" color="#000" duration="1s" />
	</div>
</div>
