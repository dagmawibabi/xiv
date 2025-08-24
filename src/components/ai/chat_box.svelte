<script lang="ts">
	import {
		ChevronDown,
		ChevronUp,
		MessageCircle,
		Search,
		Settings2,
		Sparkles
	} from 'lucide-svelte';
	import { inputState } from '../../state/input_state.svelte';
	import axios from 'axios';
	import { Circle } from 'svelte-loading-spinners';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { authClient } from '$lib/auth_client';
	import { researchState } from '../../state/research_state.svelte';
	import AiOptions from '../ai_options/ai_options.svelte';

	async function chatWithAI() {
		if (inputState.aiInput.trim().length > 0) {
			aiConversationState.conversation.push({
				from: 'user',
				content: inputState.aiInput
			});
			inputState.aiInput = '';
			aiConversationState.conversation.push({
				from: 'system',
				content: 'thinking ...'
			});
			const response = await axios.post('/api/ai_chat', {
				selectedPapers: JSON.stringify(aiConversationState.selectedPapersList),
				conversation: JSON.stringify(aiConversationState.conversation),
				prompt:
					aiConversationState.conversation[aiConversationState.conversation.length - 2].content
			});
			aiConversationState.conversation.pop();
			aiConversationState.conversation.push({
				from: 'ai',
				content: response.data
			});
		}
	}

	function handleEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			researchState.sendToAI();
		}
	}

	// const isCommentMode = $state(page.url.pathname.split('/')[1] == 'comments');
	let session = authClient.useSession();
</script>

<div
	class="no-scrollbar h-fit w-full rounded-tl-xl rounded-tr-xl border-t border-zinc-200 pb-4
	backdrop-blur-lg"
>
	<!-- AI Options -->
	<AiOptions showMaxMinButton={false} />

	<!-- Main Input Box -->
	<div class="no-scrollbar flex flex-col bg-transparent px-2 pt-2">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="group flex overflow-clip rounded-3xl border border-zinc-400 bg-white">
			<!-- Input Box -->
			<div class="flex w-full items-center gap-x-2 px-3 py-2">
				<Sparkles size={18} class="text-zinc-400" />
				<input
					type="text"
					class="w-full items-center bg-white pb-0 outline-none md:pb-1 lg:pb-1 xl:pb-1 2xl:pb-1"
					placeholder={`ask any question ...`}
					bind:value={researchState.userInput}
					onkeydown={handleEnter}
				/>
			</div>

			<!-- Search Button -->
			{#if researchState.isRsearching == true}
				<div>
					<div class="flex h-full w-20 items-center justify-center border-l">
						<Circle size="22" color="#000000" duration="1s" />
					</div>
				</div>
			{:else}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="group/search group-hover:bg-zinc-200"
					onclick={async () => {
						await chatWithAI();
					}}
				>
					<div
						class="flex h-full w-24 cursor-pointer items-center justify-center border-l group-hover/search:bg-black group-hover/search:text-white"
					>
						<span> Send </span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
