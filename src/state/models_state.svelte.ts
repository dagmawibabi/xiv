export interface Model {
	id: string;
	name: string;
}

class ModelsState {
	// Models
	allModels = $state<Model[]>([]);
	availableModels = $state<Model[]>([]);
	currentModelID: string = $state('google/gemini-2.0-flash');
	currentModelName: string = $state('Gemini 2.0 Flash');
	defaultModelID: string = $state('google/gemini-2.0-flash');
	defaultModelName: string = $state('Gemini 2.0 Flash');

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

	async resetModel() {
		this.currentModelID = this.defaultModelID;
		this.currentModelName = this.defaultModelName;
	}

	async setModel(modelID: string, modelName: string) {
		this.currentModelID = modelID;
		this.currentModelName = modelName;
	}
}

export const modelsState = new ModelsState();
