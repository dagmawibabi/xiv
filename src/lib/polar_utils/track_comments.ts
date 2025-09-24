import { auth } from '$lib/auth';

export async function trackComments(request: Request, paperID: string, comment: string) {
	const authInstance = await auth;
	const session = await authInstance.api.getSession({
		headers: request.headers
	});
	if (session?.session) {
		await authInstance.api.ingestion({
			body: {
				event: 'comment_on_papers',
				metadata: {
					paperID: paperID,
					comment: comment
				}
			},
			headers: request.headers
		});
	}
}
