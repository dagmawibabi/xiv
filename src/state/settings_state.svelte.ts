export class SettingsState {
	minimizeAIConversation: boolean = $state(false);

	toggleMinimizeAIConversation() {
		this.minimizeAIConversation = !this.minimizeAIConversation;
	}
}
