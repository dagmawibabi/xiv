<script lang="ts">
	import NavBar from '../../components/landing_page/nav_bar.svelte';
	import Banner from '../../components/landing_page/banner.svelte';
	import Features from '../../components/landing_page/features.svelte';
	import ResearchFeatures from '../../components/landing_page/research_features.svelte';
	import Pricing from '../../components/landing_page/pricing.svelte';
	import Faq from '../../components/landing_page/faq.svelte';
</script>

<svelte:head>
	<title>ScholarXIV</title>
</svelte:head>

<div class="mx-auto w-[90%] md:w-[80%]">
	<!-- Nav Bar -->
	<NavBar />

	<!-- Banner -->
	<Banner />

	<!-- Features -->
	<Features />

	<!-- Research Features -->
	<ResearchFeatures />

	<!-- Pricing -->
	<Pricing />

	<!-- FAQ -->
	<Faq />

	<!-- Space -->
	<!-- <div class="h-96"></div> -->

	<!-- Nav Bar | Footer -->
	<div class="pb-5 pt-36">
		<NavBar showDropdownOptions={false} />
	</div>
</div>
