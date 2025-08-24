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
	import { paperListState } from '../../state/papers_list.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import AiChat from '../ai_chat/ai_chat.svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import InputSettings from './input_settings.svelte';
	import SelectedPapers from '../ai_options/selected_papers.svelte';
	import { authClient } from '$lib/auth_client';
	import { page } from '$app/state';
	import { commentState } from '../../state/comment_state.svelte';
	import { Trash2, Minimize, Maximize } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import SelectModel from '../ai_options/select_model.svelte';
	import { ModelsState } from '../../state/models_state.svelte';
	import { EachResearch } from '../../state/research_state.svelte';
	import AiOptions from '../ai_options/ai_options.svelte';

	let models = new ModelsState();

	let minimizeConversation = $state(false);

	async function searchPaper() {
		if (inputState.searchContent.trim().length > 0) {
			inputState.isSearching = true;
			inputState.statusText = `Searching for `;
			inputState.lastSearch = inputState.searchContent;
			inputState.advancedSearch = false;
			paperListState.paperList = [];
			const response = await axios.post('/api/search_papers', {
				startIndex: inputState.startIndex,
				maxResults: inputState.maxResults,
				searchFilterString: {
					all: inputState.searchContent.replace(':', '')
				},
				sortBy: inputState.sortBy == 'Sort By' ? 'relevance' : inputState.sortBy,
				sortOrder: inputState.sortOrder == 'Sort Order' ? 'ascending' : inputState.sortOrder
			});
			paperListState.paperList = [];
			paperListState.paperList = response.data;
			inputState.isSearching = false;
			inputState.statusText = `Results for `;
		}
	}

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

	async function commentOnPaper() {
		if (commentState.comment.trim().length > 0) {
			commentState.isCommenting = true;
			const extractedID = page.url.pathname.split('/').pop();
			const response = await fetch('/api/comment_on_paper', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					parentID: null,
					extractedID: extractedID,
					comment: commentState.comment
				})
			});
			const data = await response.json();
			console.log(data);
			commentState.comment = '';
			commentState.comments = data;
			commentState.isCommenting = false;
		}
	}

	function handleEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			chatWithAI();
		}
	}

	onMount(async () => {
		await models.getAllModels();
	});

	// const isCommentMode = $state(page.url.pathname.split('/')[1] == 'comments');
	let session = authClient.useSession();

	let eachResearch = new EachResearch();
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
					bind:value={eachResearch.userInput}
					onkeydown={handleEnter}
				/>
			</div>

			<!-- Search Button -->
			{#if commentState.isCommenting == true}
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
