import { Chat } from '@ai-sdk/svelte';
import { aiConversationState } from './ai_conversation_state.svelte';
class ResearchState {
	// Chat
	chat = new Chat({});
	userInput = $state('');
	// State
	isRsearching = $state(false);

	async sendToAI() {
		this.chat.sendMessage({
			text: this.userInput,
			metadata:
				'Here are currently selected research papers if the user asks something related to them: ' +
				JSON.stringify(aiConversationState.selectedPapersList)
		});
		this.userInput = '';
	}

	async clearChat() {
		this.chat.messages = [];
	}
}

export const researchState = new ResearchState();
