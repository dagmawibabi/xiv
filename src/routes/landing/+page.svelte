<script lang="ts">
	import Banner from '../../components/landing_page/banner.svelte';
	import Features from '../../components/landing_page/features.svelte';
	import NavBar from '../../components/landing_page/nav_bar.svelte';

	import research from '$lib/assets/landing/research.png';
	import { CircleFadingPlus, Copy, LibraryBig, Sparkles } from 'lucide-svelte';

	const researchFeatures = [
		{
			image: research,
			icon: Sparkles,
			title: 'Choose from 100+ AI Models',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima enim quae aliquam consequuntur qui pariatur quibusdam fugiat suscipit, eligendi eum sequi eius, dolores deserunt reprehenderit itaque voluptatum amet quisquam architecto!'
		},
		{
			image: research,
			icon: CircleFadingPlus,
			title: 'Global AI Chat',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima enim quae aliquam consequuntur qui pariatur quibusdam fugiat suscipit, eligendi eum sequi eius, dolores deserunt reprehenderit itaque voluptatum amet quisquam architecto!'
		},
		{
			image: research,
			icon: LibraryBig,
			title: 'References & Selected Papers',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima enim quae aliquam consequuntur qui pariatur quibusdam fugiat suscipit, eligendi eum sequi eius, dolores deserunt reprehenderit itaque voluptatum amet quisquam architecto!'
		},
		{
			image: research,
			icon: Copy,
			title: 'Copy & Download Research',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima enim quae aliquam consequuntur qui pariatur quibusdam fugiat suscipit, eligendi eum sequi eius, dolores deserunt reprehenderit itaque voluptatum amet quisquam architecto!'
		}
	];
</script>

<div class="mx-auto w-[80%]">
	<!-- Nav Bar -->
	<NavBar />

	<!-- Banner -->
	<Banner />

	<!-- Features -->
	<Features />

	<!-- Research -->
	<div id="research" class="pt-8">
		<div class="pb-5 text-center text-2xl font-semibold">AI Powered Research</div>
		<div class="mx-auto w-3/4 pb-10 text-center text-lg">
			The research tab is your blank canvas to explore and dive deeper into your research and
			queries. Responses are backed with research papers and powered by a 100+ AI models for you to
			choose from.
		</div>

		<!-- AI Features -->
		{#each researchFeatures as eachResearchFeature, index}
			{#if index % 2 == 0}
				<div class="mx-auto flex items-center justify-between gap-x-10 py-10">
					<div class="w-full overflow-clip rounded-lg border border-black drop-shadow-xl">
						<img src={eachResearchFeature.image} alt=" " class="h-full w-full" />
					</div>
					<div class="flex w-2/3 flex-col gap-y-2">
						<eachResearchFeature.icon size={26} />
						<div class="text-2xl font-semibold">{eachResearchFeature.title}</div>
						<div class="text-lg">
							{eachResearchFeature.description}
						</div>
					</div>
				</div>
			{:else}
				<div class="mx-auto flex items-center justify-between gap-x-10 py-10">
					<div class="flex w-2/3 flex-col gap-y-2">
						<eachResearchFeature.icon size={26} />
						<div class="text-2xl font-semibold">{eachResearchFeature.title}</div>
						<div class="text-lg">
							{eachResearchFeature.description}
						</div>
					</div>
					<div class="w-full overflow-clip rounded-lg border border-black drop-shadow-xl">
						<img src={eachResearchFeature.image} alt=" " class="h-full w-full" />
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Space -->
	<div class="h-96"></div>
</div>
