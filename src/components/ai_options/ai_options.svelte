<script>
	import { Maximize, Minimize, Trash2 } from 'lucide-svelte';
	import SelectModel from './select_model.svelte';
	import SelectedPapers from './selected_papers.svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { settingsState } from '../../state/settings_state.svelte';
	import { researchState } from '../../state/research_state.svelte';

	let { showMaxMinButton = true } = $props();
</script>

<div class="flex w-full items-center justify-between p-3 pb-2">
	<div class="flex items-center gap-x-2">
		<!-- Selected Papers -->
		<SelectedPapers />

		<!-- Model Selection -->
		<SelectModel />
	</div>

	<!-- Clear / Minimize Conversation -->
	<div class="flex cursor-pointer items-center gap-2 pr-2 text-zinc-500">
		<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
			<Trash2
				size={14}
				class="hover:text-black"
				onclick={() =>
					// (aiConversationState.conversation = [])
					researchState.clearChat()}
			/>
		</div>
		<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
			<Trash2
				size={16}
				class="hover:text-black"
				onclick={() =>
					// (aiConversationState.conversation = [])
					researchState.clearChat()}
			/>
		</div>
		{#if showMaxMinButton}
			{#if settingsState.minimizeAIConversation == true}
				<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
					<Maximize
						size={14}
						class="hover:text-black"
						onclick={() => settingsState.toggleMinimizeAIConversation()}
					/>
				</div>
				<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
					<Maximize
						size={16}
						class="hover:text-black"
						onclick={() => settingsState.toggleMinimizeAIConversation()}
					/>
				</div>
			{:else}
				<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
					<Minimize
						size={14}
						class="hover:text-black"
						onclick={() => settingsState.toggleMinimizeAIConversation()}
					/>
				</div>
				<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
					<Minimize
						size={16}
						class="hover:text-black"
						onclick={() => settingsState.toggleMinimizeAIConversation()}
					/>
				</div>
			{/if}
		{/if}
	</div>
</div>
