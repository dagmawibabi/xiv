import { Chat } from '@ai-sdk/svelte';
import { aiConversationState } from './ai_conversation_state.svelte';
import { modelsState } from './models_state.svelte';

interface Reference {
	extractedID: string;
	title: string;
	authors: string[];
	published: string;
	summary: string;
	pdfLink: string;
}

class ResearchState {
	// Chat
	chat = new Chat({});
	userInput = $state('');
	// State
	references = $state<Reference[]>([]);

	async sendToAI() {
		this.chat.sendMessage({
			text: this.userInput,
			metadata: {
				context: JSON.stringify(aiConversationState.selectedPapersList),
				currentModel: modelsState.currentModelID
			}
		});
		this.userInput = '';
	}

	async retry() {
		this.chat.regenerate();
	}

	async stop() {
		this.chat.stop();
	}

	async clearChat() {
		this.chat.messages = [];
		this.references = [];
	}
}

export const researchState = new ResearchState();
