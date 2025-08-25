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
</script>

<div
	class={settingsState.minimizeAIConversation == true
		? 'no-scrollbar max-h-10 min-h-10 overflow-clip'
		: 'no-scrollbar max-h-[600px] min-h-10 overflow-clip'}
>
	<!-- AI Options -->
	<AiOptions />

	<!-- Chats -->
	<div
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
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="no-scrollbar w-fit max-w-[80%] cursor-pointer rounded-xl border bg-white px-3 py-1 text-sm hover:border-zinc-400"
						onclick={() => chatWithAI(eachPrompt)}
					>
						<Markdown md={eachPrompt} {plugins} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
