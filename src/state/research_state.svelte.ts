import { Chat } from '@ai-sdk/svelte';

class ResearchState {
	// Chat
	chat = new Chat({});
	userInput = $state('');

	// State
	isRsearching = $state(false);

	async sendToAI() {
		this.chat.sendMessage({ text: this.userInput });
		this.userInput = '';
	}

	async clearChat() {
		this.chat.messages = [];
	}
}

export const researchState = new ResearchState();
