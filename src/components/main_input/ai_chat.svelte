<script lang="ts">
	import { settingsState } from '../../state/settings_state.svelte';
	import AiOptions from '../ai_options/ai_options.svelte';
	import { researchState } from '../../state/research_state.svelte';
	import ChatListUi from '../chat_list/chat_list_ui.svelte';
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
		<ChatListUi />
	</div>
</div>
