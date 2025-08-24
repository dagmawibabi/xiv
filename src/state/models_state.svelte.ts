export interface Model {
	id: string;
	name: string;
}

export class ModelsState {
	// Models
	allModels = $state<Model[]>([]);
	availableModels = $state<Model[]>([]);
	currentModelID: string = $state('google/gemini-2.0-flash');
	defaultModelID: string = $state('google/gemini-2.0-flash');

	async getAllModels() {
		try {
			const response = await fetch('/api/chat');
			const data = await response.json();
			// console.log('Raw data from API:', data);

			// Extract the array from the object
			if (Array.isArray(data.models)) {
				this.allModels = [...data.models]; // spread to ensure reactivity
			} else {
				this.allModels = [];
				// console.warn('No models array found in API response');
			}
		} catch (error) {
			console.error('Failed to fetch models:', error);
			this.allModels = [];
		}
	}
}
