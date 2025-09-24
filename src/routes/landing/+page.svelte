<script lang="ts">
	import NavBar from '../../components/landing_page/nav_bar.svelte';
	import Banner from '../../components/landing_page/banner.svelte';
	import Features from '../../components/landing_page/features.svelte';
	import ResearchFeatures from '../../components/landing_page/research_features.svelte';
	import Pricing from '../../components/landing_page/pricing.svelte';
	import Faq from '../../components/landing_page/faq.svelte';
	import Footer from '../../components/landing_page/footer.svelte';
	import NavBarMobile from '../../components/landing_page/nav_bar_mobile.svelte';

	export let data;
</script>

<svelte:head>
	<title>ScholarXIV</title>
</svelte:head>

<div class="mx-auto w-[90%] pt-10 md:w-[80%] md:pt-0">
	<!-- Nav Bar -->
	<NavBar />
	<NavBarMobile />

	<!-- Banner -->
	<Banner userCount={data.data.userCount} paperCount={data.data.paperCount} />

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

	<!-- Footer -->
	<Footer />
</div>
