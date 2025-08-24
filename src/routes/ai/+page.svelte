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
	import { Chat } from '@ai-sdk/svelte';
	import axios from 'axios';
	import Navigation from '../../components/navigation.svelte';
	import { Toaster } from 'svelte-sonner';
	import { researchState } from '../../state/research_state.svelte';

	// svelte-ignore non_reactive_update
	// let input = '';
	// const chat = new Chat({});

	// function handleSubmit(event: SubmitEvent) {
	// 	event.preventDefault();
	// 	chat.sendMessage({ text: input });
	// 	input = '';
	// }
</script>

<svelte:head>
	<title>ScholarXIV | Chat</title>
</svelte:head>

<div>
	<!-- CHAT -->
	<div class="w-full">
		<ul class="space-y-2">
			{#each researchState.chat.messages as message, messageIndex (messageIndex)}
				{#if message.role === 'user'}
					<div class="flex justify-end">
						{#each message.parts as part, partIndex (partIndex)}
							{#if part.type === 'text'}
								<div class="w-fit max-w-2xl rounded-lg border bg-blue-100 px-4 py-2 text-sm">
									{part.text}
								</div>
							{/if}
						{/each}
					</div>
				{:else}
					<div class="flex flex-col justify-start">
						{#each message.parts as part, partIndex (partIndex)}
							{#if part.type === 'text'}
								<div class="w-fit max-w-2xl rounded-lg border bg-zinc-100 px-4 py-2 text-sm">
									{part.text}
								</div>
							{:else if part.type === 'tool-weather' || part.type === 'tool-convertFahrenheitToCelsius' || part.type === 'tool-searchResearchPapers'}
								<div class="mb-2 w-fit rounded-full border px-4 py-2 text-xs text-red-400">
									<!-- {part.type} -->
									{part.input && typeof part.input === 'object' && 'action' in part.input
										? part.input.action
										: ''}
								</div>
								<!-- <pre class="whitespace-pre-wrap">
									{JSON.stringify(part, null, 2)}
								</pre> -->
							{/if}
						{/each}
					</div>
				{/if}
			{/each}
		</ul>
	</div>

	<div class="h-96"></div>

	<!-- Toaster -->
	<div class="block md:hidden lg:hidden xl:hidden 2xl:hidden">
		<Toaster position="top-right" expand={true} />
	</div>
	<div class="hidden md:block lg:block xl:block 2xl:block">
		<Toaster expand={true} />
	</div>
</div>
