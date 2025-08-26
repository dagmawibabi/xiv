<script lang="ts">
	import { Trash2, Minimize, Maximize } from 'lucide-svelte';

	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	const plugins = [gfmPlugin()];
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import SelectedPapers from '../ai_options/selected_papers.svelte';
	import axios from 'axios';
	import { settingsState } from '../../state/settings_state.svelte';
	import AiOptions from '../ai_options/ai_options.svelte';

	let examplePrompts = [
		'Summarize this paper for me?',
		'When was this paper published?',
		'Explain this paper in simple terms?',
		'What are the key points of this paper?',
		'Compare and contrast these papers in table format?',
		'Do you know anything about the authors?',
		'Make a joke based on this paper',
		'What is the pdf link?'
	];

	async function chatWithAI(promptContent: any) {
		aiConversationState.conversation.push({
			from: 'user',
			content: promptContent
		});
		aiConversationState.conversation.push({
			from: 'system',
			content: 'thinking ...'
		});
		const response = await axios.post('/api/ai_chat', {
			apiKey: '',
			selectedPapers: JSON.stringify(aiConversationState.selectedPapersList),
			conversation: JSON.stringify(aiConversationState.conversation),
			prompt: promptContent
		});

		aiConversationState.conversation.pop();
		aiConversationState.conversation.push({
			from: 'ai',
			content: response.data
		});
	}

	import { Toaster } from 'svelte-sonner';
	import { researchState } from '../../state/research_state.svelte';

	import { Copy, Download, RefreshCw, Search } from 'lucide-svelte';
	import MarkdownRender from '../../components/markdown_render.svelte';
	import References from '../../components/research/references.svelte';
	import { toast } from 'svelte-sonner';

	// Function to copy to clipboard
	function copyToClipboard(content: any) {
		// Copy to Clipboard
		navigator.clipboard.writeText(content);

		// Show Toast
		toast.success(`Copied Successfully!`);
	}
</script>

<div
	class={settingsState.minimizeAIConversation == true
		? 'no-scrollbar max-h-10 min-h-10 overflow-clip'
		: 'no-scrollbar max-h-[600px] min-h-10 overflow-clip'}
>
	<!-- AI Options -->
	<AiOptions gotoResearchButton={true} />

	<!-- CHAT -->
	<div
		class={researchState.chat.messages.length > 0
			? 'no-scrollbar max-h-[580px] overflow-scroll px-2 pb-24 pt-4'
			: 'no-scrollbar pb-0'}
	>
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
										class="group/aiResponse prose w-fit max-w-2xl overflow-scroll rounded-lg px-3 text-xs"
									>
										{#key part.text}
											<MarkdownRender content={part.text} />
										{/key}
										<div class="flex h-6 gap-x-1">
											<!-- svelte-ignore a11y_click_events_have_key_events -->
											<!-- svelte-ignore a11y_no_static_element_interactions -->
											<div
												class="hidden w-fit cursor-pointer rounded-md p-1 hover:bg-neutral-100 group-hover/aiResponse:flex"
												onclick={(event) => {
													event.stopPropagation();
													copyToClipboard(part.text);
												}}
											>
												<Copy size={14} />
											</div>
											<div
												class="hidden w-fit cursor-pointer rounded-md p-1 hover:bg-neutral-100 group-hover/aiResponse:flex"
											>
												<Download size={14} />
											</div>
											{#if researchState.chat.lastMessage?.id == message.id}
												<!-- svelte-ignore a11y_click_events_have_key_events -->
												<!-- svelte-ignore a11y_no_static_element_interactions -->
												<div
													class="hidden w-fit cursor-pointer rounded-md p-1 hover:bg-neutral-100 group-hover/aiResponse:flex"
													onclick={() => researchState.retry()}
												>
													<RefreshCw size={14} />
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
											<div class="grid w-4/5 grid-cols-5 gap-1 pt-2">
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
	</div>

	<!-- Chats -->
	<!-- <div
		class={aiConversationState.conversation.length > 0
			? 'no-scrollbar max-h-[580px] overflow-scroll px-2 pb-24 pt-4'
			: 'no-scrollbar pb-0'}
	>
		{#if aiConversationState.conversation.length > 0}
			{#each aiConversationState.conversation as eachMessage}
				<div
					class={eachMessage.from == 'user'
						? 'no-scrollbar flex w-full justify-end py-1'
						: 'no-scrollbar flex w-full justify-start py-1'}
				>
					<div
						class={eachMessage.from == 'system'
							? 'no-scrollbar max-w-[80%] animate-pulse rounded-xl border bg-white px-3 py-1 text-sm'
							: 'no-scrollbar max-w-[80%] rounded-xl border bg-white px-3 py-1 text-sm'}
					>
						<Markdown md={eachMessage['content']} {plugins} />
					</div>
				</div>
			{/each}
		{:else}
			<div
				class={'no-scrollbar flex max-h-[580px] w-full flex-col items-center justify-center gap-y-2 overflow-scroll py-1 pb-24 pt-14'}
			>
				{#each examplePrompts as eachPrompt}
					<div
						class="no-scrollbar w-fit max-w-[80%] cursor-pointer rounded-xl border bg-white px-3 py-1 text-sm hover:border-zinc-400"
						onclick={() => chatWithAI(eachPrompt)}
					>
						<Markdown md={eachPrompt} {plugins} />
					</div>
				{/each}
			</div>
		{/if}
	</div> -->
</div>
