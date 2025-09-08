<script lang="ts">
	import { onMount } from 'svelte';
	import { subscriptionBasedRouting } from '$lib/utils/subscription_based_routing';
	import { BarLoader } from 'svelte-loading-spinners';
	import logo from '$lib/assets/logo/logo.png';

	onMount(async () => {
		await subscriptionBasedRouting();
	});
</script>

<svelte:head>
	<title>ScholarXIV</title>
	<meta property="description" content="Open-source & AI powered research paper explorer" />
	<meta property="og:title" content="ScholarXIV" />
	<meta property="og:description" content="Open-source & AI powered research paper explorer" />
	<meta
		property="og:image"
		content="https://www.dagmawi.dev/_app/immutable/assets/ScholarXIVWhite.B4NW1iV5.jpg"
	/>
	<meta property="og:url" content="https://scholarxiv.com" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="ScholarXIV" />

	<meta
		property="twitter:image"
		content="https://www.dagmawi.dev/_app/immutable/assets/ScholarXIVWhite.B4NW1iV5.jpg"
	/>
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="ScholarXIV" />
	<meta property="twitter:description" content="Open-source & AI powered research paper explorer" />
</svelte:head>

<div class="flex h-[90%] flex-col items-center justify-center">
	<div class="flex flex-col items-center">
		<img src={logo} alt="placeholder" class="m-auto h-40 w-40" />
		<!-- <div class="text-2xl font-semibold">ScholarXIV</div> -->
		<BarLoader size="52" color="#000" duration="1s" />
	</div>
</div>
