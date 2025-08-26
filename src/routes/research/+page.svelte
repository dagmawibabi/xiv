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

	import { Copy, Download, RefreshCw, Search } from 'lucide-svelte';
	import MarkdownRender from '../../components/markdown_render.svelte';
	import References from '../../components/research/references.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { toast } from 'svelte-sonner';

	// Function to copy to clipboard
	function copyToClipboard(content: any) {
		// Copy to Clipboard
		navigator.clipboard.writeText(content);

		// Show Toast
		toast.success(`Copied Successfully!`);
	}

	// Sample Prompts shuffled and 10
	let samplePrompts: any[] = [];
	onMount(() => {
		samplePrompts = [...promptSuggestions].sort(() => Math.random() - 0.5).slice(0, 10);
		// .sort((a, b) => a.title.length - b.title.length);
	});

	import { authClient } from '$lib/auth_client';
	import { onMount } from 'svelte';
	import { promptSuggestions } from '$lib/sample_prompts';
	const session = authClient.useSession();
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
	<div class="w-full">
		<ul class="space-y-2">
			{#each researchState.chat.messages as message, messageIndex (messageIndex)}
				{#if message.role === 'user'}
					<div class="flex justify-end">
						{#each message.parts as part, partIndex (partIndex)}
							{#if part.type === 'text'}
								<div class="w-fit max-w-2xl rounded-xl bg-zinc-100 px-4 py-1 text-sm">
									{#key part.text}
										<MarkdownRender content={part.text} />
									{/key}
								</div>
							{/if}
						{/each}
					</div>
				{:else}
					<div class="flex flex-col justify-start">
						{#each message.parts as part, partIndex (partIndex)}
							{#if part.type === 'text'}
								<div
									class="group/aiResponse prose w-fit max-w-2xl overflow-scroll rounded-lg px-3 text-sm"
								>
									{#key part.text}
										<MarkdownRender content={part.text} />
									{/key}
									<div class="flex h-8 gap-x-1">
										<!-- svelte-ignore a11y_click_events_have_key_events -->
										<!-- svelte-ignore a11y_no_static_element_interactions -->
										<div
											class="hidden w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
											onclick={(event) => {
												event.stopPropagation();
												copyToClipboard(part.text);
											}}
										>
											<Copy size={16} />
										</div>
										<div
											class="hidden w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
										>
											<Download size={16} />
										</div>
										{#if researchState.chat.lastMessage?.id == message.id}
											<!-- svelte-ignore a11y_click_events_have_key_events -->
											<!-- svelte-ignore a11y_no_static_element_interactions -->
											<div
												class="hidden w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
												onclick={() => researchState.retry()}
											>
												<RefreshCw size={16} />
											</div>
										{/if}
									</div>
								</div>
							{:else if part.type === 'tool-weather' || part.type === 'tool-convertFahrenheitToCelsius' || part.type === 'tool-searchResearchPapers' || part.type === 'tool-getSelectedPapers'}
								<div>
									<!-- Tool Call -->
									<div
										class="mt-2 flex w-fit items-center gap-x-1 rounded-full bg-neutral-50 px-3 py-1"
									>
										<Search size={12} class="text-zinc-500" />
										<div class="text-xs text-zinc-500">
											{part.input && typeof part.input === 'object' && 'action' in part.input
												? part.input.action
												: ''}
										</div>
									</div>
									<!-- References -->
									<!-- {JSON.stringify(part.output)} -->
									{#if part.output && typeof part.output === 'object' && 'papers' in part.output}
										<div class="grid w-full grid-cols-5 gap-1 pt-2 md:w-4/5">
											{#each (part.output as { papers: any }).papers as eachPaper}
												<References eachReference={eachPaper} />
												<!-- <Dialog.Root>
													<Dialog.Trigger>
														<div
															class="cursor-pointer truncate rounded-full border bg-zinc-100 px-2 py-1 text-xs hover:border-zinc-400"
														>
															{eachPaper.title}
														</div>
													</Dialog.Trigger>
													<Dialog.Content
														class="min-w-[40%] overflow-clip border-none bg-transparent p-2 outline-none"
													>
														<EachPaper paper={eachPaper} />
													</Dialog.Content>
												</Dialog.Root> -->
											{/each}
										</div>
									{/if}
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
