class SettingsState {
	minimizeAIConversation: boolean = $state(false);

	async toggleMinimizeAIConversation() {
		this.minimizeAIConversation = !this.minimizeAIConversation;
	}
}

export const settingsState = new SettingsState();
