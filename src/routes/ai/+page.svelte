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
	import { EachResearch } from '../../state/research_state.svelte';

	// svelte-ignore non_reactive_update
	let input = '';
	const chat = new Chat({});

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		chat.sendMessage({ text: input });
		input = '';
	}

	let eachResearch = new EachResearch();
</script>

<svelte:head>
	<title>ScholarXIV | Chat</title>
</svelte:head>

<!-- <div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0"> -->
<div>
	<!-- list models -->
	<!-- {availableModels.length} -->
	<!-- <ul>
		<li>models: {availableModels.length}</li>
		{#each availableModels as model, i}
			<li>{i + 1}: {model.id} — {model.name}</li>
		{/each}
	</ul> -->

	<!-- CHAT -->
	{eachResearch.userInput}
	<ul>
		{#each chat.messages as message, messageIndex (messageIndex)}
			<li>
				<div>{message.role}</div>
				<div>
					{#each message.parts as part, partIndex (partIndex)}
						{#if part.type === 'text'}
							<div>{part.text}</div>
						{:else if part.type === 'tool-weather' || part.type === 'tool-convertFahrenheitToCelsius' || part.type === 'tool-searchResearchPapers'}
							<pre>{JSON.stringify(part, null, 2)}</pre>
						{/if}
					{/each}
				</div>
			</li>
		{/each}
	</ul>
	<form onsubmit={handleSubmit}>
		<!-- <input bind:value={eachResearch.userInput} /> -->
		<button type="submit">Send</button>
	</form>

	<!-- Toaster -->
	<div class="block md:hidden lg:hidden xl:hidden 2xl:hidden">
		<Toaster position="top-right" expand={true} />
	</div>
	<div class="hidden md:block lg:block xl:block 2xl:block">
		<Toaster expand={true} />
	</div>
</div>
