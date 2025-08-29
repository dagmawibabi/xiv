<script lang="ts">
	import { researchState } from '../../state/research_state.svelte';
	import { AlignLeft, MousePointer, Search } from 'lucide-svelte';
	import MarkdownRender from '../markdown_render.svelte';
	import References from '../tool_ui/tool_search_research_papers.svelte';
	import { toast } from 'svelte-sonner';

	import { authClient } from '$lib/auth_client';
	import { onMount } from 'svelte';
	import { promptSuggestions } from '$lib/sample_prompts';
	import { Circle } from 'svelte-loading-spinners';
	import Thinking from './thinking.svelte';
	import ChatActions from './chat_actions.svelte';
	import ToolSearchResearchPapers from '../tool_ui/tool_search_research_papers.svelte';

	// Sample Prompts shuffled and 10
	let samplePrompts: any[] = [];
	onMount(() => {
		samplePrompts = [...promptSuggestions].sort(() => Math.random() - 0.5).slice(0, 10);
		// .sort((a, b) => a.title.length - b.title.length);
	});
</script>

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
						<!-- {JSON.stringify(part)} -->

						{#if part.type === 'text'}
							<div
								class="group/aiResponse prose max-w-[45rem] overflow-scroll rounded-lg text-sm prose-h1:font-semibold prose-h2:mb-2 prose-h2:mt-4 prose-h2:font-medium prose-strong:font-semibold prose-hr:m-5"
							>
								{#key part.text}
									<!-- Thinking Block -->
									{@const hasThinking = /<think>/.test(part.text)}
									{@const isThinkingComplete = /<think>[\s\S]*?<\/think>/.test(part.text)}
									{@const thinkMatch = part.text.match(/<think>([\s\S]*?)<\/think>/)}
									{@const thinkingContent = hasThinking
										? isThinkingComplete
											? thinkMatch && thinkMatch[1]
												? thinkMatch[1].trim()
												: ''
											: part.text.split('<think>')[1]?.trim() || ''
										: ''}

									{#if hasThinking && thinkingContent}
										<Thinking {thinkingContent} />
									{/if}

									<!-- Normal Response -->
									{@const cleanedText = part.text.includes('</think>')
										? part.text.split('</think>')[1].trim()
										: hasThinking
											? ''
											: part.text}

									{#if cleanedText}
										<div class="h-4"></div>
										<MarkdownRender content={cleanedText} />
										<ChatActions content={cleanedText} messageID={message.id} />
									{/if}
								{/key}
							</div>
						{:else if part.type === 'tool-searchResearchPapers'}
							<ToolSearchResearchPapers {part} />
						{:else if part.type === 'tool-getSelectedPapers'}
							<div>
								<!-- Tool Call -->
								<div
									class="mt-2 flex w-fit cursor-pointer items-center gap-x-2 rounded-full border bg-neutral-100 px-2 py-1 text-xs text-zinc-500 group-hover/thinking:border-zinc-400 group-hover/thinking:bg-neutral-200 group-hover/thinking:text-black"
								>
									<AlignLeft size={12} class="text-zinc-500" />
									<div class="text-xs text-zinc-500">
										{part.input && typeof part.input === 'object' && 'action' in part.input
											? part.input.action
											: ''}
									</div>
								</div>
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
	{#if researchState.chat.status == 'submitted' || researchState.chat.status == 'streaming'}
		<div>
			<div class="flex h-full w-fit items-center justify-center p-5">
				<Circle size="16" color="#000000" duration="1s" />
			</div>
		</div>
	{/if}
</div>
