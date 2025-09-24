import { auth } from '$lib/auth';

export async function trackAIChat(request: Request, currentModel: string) {
	const authInstance = await auth;
	const session = await authInstance.api.getSession({
		headers: request.headers
	});
	if (session?.session) {
		await authInstance.api.ingestion({
			body: {
				event: 'ai_chat',
				metadata: {
					model: currentModel
				}
			},
			headers: request.headers
		});
	}
}
