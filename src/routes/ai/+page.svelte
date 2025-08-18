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
	import { onMount } from 'svelte';

	// svelte-ignore non_reactive_update
	let input = '';
	const chat = new Chat({});

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		chat.sendMessage({ text: input });
		input = '';
	}

	let availableModels: any[] = [];
	async function getModels() {
		const response = await fetch('/api/chat');
		const data = await response.json();
		console.log('Raw data from API:', data);

		// Extract the array from the object
		if (Array.isArray(data.models)) {
			availableModels = [...data.models]; // spread to ensure reactivity
		} else {
			availableModels = [];
			console.warn('No models array found in API response');
		}
	}
	onMount(async () => {
		getModels();
	});
</script>

<main>
	<!-- list models -->
	<!-- {availableModels} -->
	<!-- <ul>
		<li>models: {availableModels.length}</li>
		{#each availableModels as model, i}
			<li>{i + 1}: {model.id} — {model.name}</li>
		{/each}
	</ul> -->

	<!-- CHAT -->
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
		<input bind:value={input} />
		<button type="submit">Send</button>
	</form>
</main>
