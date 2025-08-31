<script lang="ts">
	import NavBar from '../../components/landing_page/nav_bar.svelte';
	import Banner from '../../components/landing_page/banner.svelte';
	import Features from '../../components/landing_page/features.svelte';
	import ResearchFeatures from '../../components/landing_page/research_features.svelte';
</script>

<svelte:head>
	<title>ScholarXIV</title>
</svelte:head>

<div class="mx-auto w-[80%]">
	<!-- Nav Bar -->
	<NavBar />

	<!-- Banner -->
	<Banner />

	<!-- Features -->
	<Features />

	<!-- Research Features -->
	<ResearchFeatures />

	<!-- Space -->
	<div class="h-96"></div>
</div>
