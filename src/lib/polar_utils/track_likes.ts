import { auth } from '$lib/auth';

export async function trackLikes(request: Request, paperID: string) {
	const authInstance = await auth;
	const session = await authInstance.api.getSession({
		headers: request.headers
	});
	if (session?.session) {
		await authInstance.api.ingestion({
			body: {
				event: 'like_papers',
				metadata: {
					paperID: paperID
				}
			},
			headers: request.headers
		});
	}
}
