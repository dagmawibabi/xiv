import { auth } from '$lib/auth';

export async function trackSearchPapers(
	request: Request,
	startIndex: string,
	maxResults: string,
	searchFilterString: string,
	sortBy: string,
	sortOrder: string
) {
	const authInstance = await auth;
	const session = await authInstance.api.getSession({
		headers: request.headers
	});
	if (session?.session) {
		await authInstance.api.ingestion({
			body: {
				event: 'search_papers',
				metadata: {
					startIndex: startIndex,
					maxResults: maxResults,
					searchFilterString: JSON.stringify(searchFilterString),
					sortBy: sortBy,
					sortOrder: sortOrder
				}
			},
			headers: request.headers
		});
	}
}
