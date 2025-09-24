import posthog from 'posthog-js';
import { browser } from '$app/environment';
// import { onMount } from 'svelte';

export const load = async () => {
	if (browser) {
		posthog.init('phc_FI5eIS7g00YOtm0cd6pTRQr4YLJO8PEjxD8lUChqdui', {
			api_host: 'https://us.i.posthog.com',
			defaults: '2025-05-24',
			person_profiles: 'identified_only'
		});
	}

	return;
};
