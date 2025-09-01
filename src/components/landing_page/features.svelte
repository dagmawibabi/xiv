<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index';

	import discover from '$lib/assets/landing/discover.png';
	import research from '$lib/assets/landing/research.png';
	import search from '$lib/assets/landing/search.png';
	import like from '$lib/assets/landing/like.png';
	import comment from '$lib/assets/landing/comment.png';
	import bookmark from '$lib/assets/landing/bookmark.png';
	import select from '$lib/assets/landing/select.png';

	const features = [
		{
			value: 'discover',
			label: 'Discover',
			description:
				'Explore and discover collections of research papers tailored to trending topics and themes. Find fresh insights every time you visit.',
			image: discover
		},
		{
			value: 'research',
			label: 'Research',
			description:
				'Dive deeper into academic content with tools designed for analysis and comparison. Gain a clearer understanding of complex studies.',
			image: research
		},
		{
			value: 'search',
			label: 'Advanced Search',
			description:
				'Quickly locate the exact papers you need with powerful filters, parameters and keywords. Save time and focus on what matters most.',
			image: search
		},
		{
			value: 'like',
			label: 'Like Papers',
			description:
				'Show appreciation for valuable research by liking papers you find useful. Help highlight impactful work for the community.',
			image: like
		},
		{
			value: 'comment',
			label: 'Comment',
			description:
				'Join the conversation by leaving comments on papers. Share feedback, ask questions, and exchange ideas with peers.',
			image: comment
		},
		{
			value: 'bookmark',
			label: 'Bookmark',
			description:
				'Save papers to your personal library for easy access later. Keep your most important reads organized in one place.',
			image: bookmark
		},
		{
			value: 'select',
			label: 'Select Papers',
			description:
				'Select multiple research papers to build a custom context for the AI. Use them to ask, compare findings, and explore insights.',
			image: select
		}
	];

	const featureForMobile = features.slice(0, 3);
	const featureForMobile2 = features.slice(4, features.length);
</script>

<div id="features" class="pb-40 pt-8">
	<div class="text-center text-2xl font-semibold">
		Expore all the powerful features of ScholarXIV
	</div>

	<!-- PC -->
	<div class="hidden items-center justify-center text-center md:flex">
		<Tabs.Root value="discover" class="">
			<!-- Descriptions -->
			{#each features as eachFeature}
				<Tabs.Content value={eachFeature.value} class="mx-auto w-[45%] text-center"
					>{eachFeature.description}</Tabs.Content
				>
			{/each}

			<!-- Tabs -->
			<Tabs.List class="my-5 drop-shadow-lg hover:drop-shadow-md">
				{#each features as eachFeature}
					<Tabs.Trigger value={eachFeature.value}>{eachFeature.label}</Tabs.Trigger>
				{/each}
			</Tabs.List>

			<!-- Images -->
			{#each features as eachFeature}
				<Tabs.Content value={eachFeature.value}>
					<img src={eachFeature.image} alt=" " class="h-full w-full rounded-lg drop-shadow-2xl" />
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</div>

	<!-- Mobile -->
	<div class=" items-center justify-center text-center md:hidden">
		<Tabs.Root value={featureForMobile[0].value} class="">
			<!-- Tabs -->
			<Tabs.List class="mt-5 drop-shadow-lg hover:drop-shadow-md">
				{#each featureForMobile as eachFeature}
					<Tabs.Trigger value={eachFeature.value}>{eachFeature.label}</Tabs.Trigger>
				{/each}
			</Tabs.List>

			<!-- Images -->
			{#each featureForMobile as eachFeature}
				<Tabs.Content value={eachFeature.value}>
					<img
						src={eachFeature.image}
						alt=" "
						class="h-full w-full rounded-lg pt-2 drop-shadow-lg"
					/>
				</Tabs.Content>
			{/each}

			<!-- Descriptions -->
			{#each featureForMobile as eachFeature}
				<Tabs.Content value={eachFeature.value} class="mx-auto text-center text-sm"
					>{eachFeature.description}</Tabs.Content
				>
			{/each}
		</Tabs.Root>

		<Tabs.Root value={featureForMobile2[0].value} class="pt-10">
			<!-- Tabs -->
			<Tabs.List class="mt-5 drop-shadow-lg hover:drop-shadow-md">
				{#each featureForMobile2 as eachFeature}
					<Tabs.Trigger value={eachFeature.value}>{eachFeature.label}</Tabs.Trigger>
				{/each}
			</Tabs.List>

			<!-- Images -->
			{#each featureForMobile2 as eachFeature}
				<Tabs.Content value={eachFeature.value}>
					<img
						src={eachFeature.image}
						alt=" "
						class="h-full w-full rounded-lg pt-2 drop-shadow-lg"
					/>
				</Tabs.Content>
			{/each}

			<!-- Descriptions -->
			{#each featureForMobile2 as eachFeature}
				<Tabs.Content value={eachFeature.value} class="mx-auto text-center text-sm"
					>{eachFeature.description}</Tabs.Content
				>
			{/each}
		</Tabs.Root>
	</div>
</div>
