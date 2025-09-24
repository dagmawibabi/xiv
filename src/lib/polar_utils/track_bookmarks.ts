import { auth } from '$lib/auth';

export async function trackBookmarks(request: Request, paperID: string) {
	const authInstance = await auth;
	const session = await authInstance.api.getSession({
		headers: request.headers
	});
	if (session?.session) {
		await authInstance.api.ingestion({
			body: {
				event: 'bookmark_papers',
				metadata: {
					paperID: paperID
				}
			},
			headers: request.headers
		});
	}
}
