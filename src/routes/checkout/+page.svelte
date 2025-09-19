<script lang="ts">
	import { onMount } from 'svelte';
	import { subscriptionBasedRouting } from '$lib/utils/subscription_based_routing';
	import { BarLoader } from 'svelte-loading-spinners';
	import logo from '$lib/assets/logo/logo.png';

	function delay(ms: number | undefined) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	onMount(async () => {
		await delay(2000);
		await subscriptionBasedRouting();
	});
</script>

<div class="flex h-[90%] flex-col items-center justify-center">
	<div class="flex flex-col items-center">
		<img src={logo} alt="placeholder" class="m-auto h-40 w-40" />
		<!-- <div class="text-2xl font-semibold">ScholarXIV</div> -->
		<BarLoader size="52" color="#000" duration="1s" />
	</div>
</div>
