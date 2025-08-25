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
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import EachPaper from '../../components/each_paper/each_paper.svelte';
	import Markdown from 'svelte-exmarkdown';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';

	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	const plugins = [gfmPlugin()];
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
								<div
									class="w-fit max-w-2xl overflow-scroll rounded-lg border bg-zinc-100 px-3 py-2 text-sm"
								>
									<Markdown md={part.text} {plugins} />
								</div>
							{:else if part.type === 'tool-weather' || part.type === 'tool-convertFahrenheitToCelsius' || part.type === 'tool-searchResearchPapers'}
								<div>
									<!-- Tool Call -->
									<div class="mb-2 w-fit rounded-full bg-zinc-100 px-4 py-2 text-xs text-zinc-500">
										{part.input && typeof part.input === 'object' && 'action' in part.input
											? part.input.action
											: ''}
									</div>
									<!-- References -->
									<!-- {JSON.stringify(part.output)} -->
									{#if part.output && typeof part.output === 'object' && 'papers' in part.output}
										<div class="grid w-4/5 grid-cols-5 gap-1 pb-2">
											{#each (part.output as { papers: any }).papers as eachPaper}
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
												<Popover.Root>
													<Popover.Trigger>
														<div
															class={aiConversationState.selectedPapersIDList.includes(
																eachPaper.extractedID
															) == true
																? 'cursor-pointer truncate rounded-full border border-zinc-400 bg-emerald-400 px-2 py-1 text-xs font-semibold text-black'
																: 'cursor-pointer truncate rounded-full border border-zinc-100 bg-zinc-100 px-2 py-1 text-xs text-zinc-500 hover:border-zinc-400 hover:text-black'}
														>
															{eachPaper.title}
														</div>
													</Popover.Trigger>
													<Popover.Content
														class="min-w-fit border-none bg-transparent p-0 outline-none"
													>
														<EachPaper paper={eachPaper} />
													</Popover.Content>
												</Popover.Root>
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
