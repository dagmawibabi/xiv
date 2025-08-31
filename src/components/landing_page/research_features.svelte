<script lang="ts">
	import globalAI from '$lib/assets/landing/research_features/global_ai.png';
	import references from '$lib/assets/landing/research_features/references.png';
	import models from '$lib/assets/landing/research_features/models2.png';
	import download from '$lib/assets/landing/research_features/download.png';
	import { CircleFadingPlus, Copy, FolderDown, LibraryBig, Sparkles } from 'lucide-svelte';

	const researchFeatures = [
		{
			image: models,
			icon: Sparkles,
			title: 'Choose from 100+ AI Models',
			description:
				"Supported by Vercel's AI Gateway, ranging from advanced reasoning models to cutting-edge open-source options. Even models that don't natively support tool calls are enhanced on this platform, giving you a seamless and powerful research experience no matter which model you choose."
		},
		{
			image: globalAI,
			icon: CircleFadingPlus,
			title: 'Global AI Chat',
			description:
				'Stay connected with your AI research assistant no matter where you are on the platform. The Global AI Chat keeps your entire conversation active as you move between tabs, allowing you to minimize, maximize, or expand the chatbox whenever you need it. This way your research is uninterrupted.'
		},
		{
			image: references,
			icon: LibraryBig,
			title: 'References & Selected Papers',
			description:
				'Keep your research grounded with accurate references and expanded with context from your selected papers. You can guide the AI to focus on the most relevant sources, ensuring that your insights are both reliable and contextually aligned with your study. More over you can access the referenced papers right there in the canvas.'
		},
		{
			image: download,
			icon: FolderDown,
			title: 'Copy & Download Research',
			description:
				'Easily save and share your work with built-in copy and download options. Export summaries, insights, or full research outputs in just a click. Exports are saved as Markdown / PDF keeping the styling of your research.'
		}
	];
</script>

<div>
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
				<div class="mx-auto flex items-center justify-between gap-x-14 py-10">
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
				<div class="mx-auto flex items-center justify-between gap-x-14 py-10">
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
</div>
