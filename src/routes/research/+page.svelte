<!-- svelte-ignore non_reactive_update -->
<!-- <script lang="ts">
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

<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
	<div>AI</div>
</div> -->

<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import { researchState } from '../../state/research_state.svelte';
	import { toast } from 'svelte-sonner';

	// Sample Prompts shuffled and 10
	let samplePrompts: any[] = [];
	onMount(() => {
		samplePrompts = [...promptSuggestions].sort(() => Math.random() - 0.5).slice(0, 10);
		// .sort((a, b) => a.title.length - b.title.length);
	});

	import { authClient } from '$lib/auth_client';
	import { onMount } from 'svelte';
	import { promptSuggestions } from '$lib/sample_prompts';
	import ChatListUi from '../../components/chat_list/chat_list_ui.svelte';
</script>

<svelte:head>
	<title>ScholarXIV | Chat</title>
</svelte:head>

<div>
	{#if researchState.chat.messages.length == 0}
		<div class="pt-10">
			{#each samplePrompts as prompt}
				<div class="pb-2">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="w-fit cursor-pointer rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-zinc-600 hover:border-zinc-500 hover:text-black"
						onclick={() => {
							researchState.userInput = prompt.prompt;
							researchState.sendToAI();
						}}
					>
						{prompt.title}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- CHAT -->
	<ChatListUi />

	<div class="h-96"></div>

	<!-- Toaster -->
	<div class="block md:hidden lg:hidden xl:hidden 2xl:hidden">
		<Toaster position="top-right" expand={true} />
	</div>
	<div class="hidden md:block lg:block xl:block 2xl:block">
		<Toaster expand={true} />
	</div>
</div>
