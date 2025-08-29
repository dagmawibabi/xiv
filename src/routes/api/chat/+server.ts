import { z } from 'zod';
import { streamText, type UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { arxivAPICall } from '../utils/search_and_clean_papers';
import { old_system_prompt } from '$lib/system_prompt';
// import type { searchStringOBJI } from '../types/types';

export async function GET() {
	const availableModels = await gateway.getAvailableModels();
	return new Response(JSON.stringify(availableModels));
}

type Metadata = {
	context: string;
	currentModel: string;
};

export async function POST({ request }) {
	// CHAT
	const { messages }: { messages: UIMessage[] } = await request.json();

	// Get User's Selected Papers
	const selectedPapers = (messages[messages.length - 1].metadata as Metadata)?.context;
	const currentModel =
		(messages[messages.length - 1].metadata as Metadata)?.currentModel || 'google/gemini-2.5-flash';

	// Sent to AI
	const result = streamText({
		model: currentModel,
		system: old_system_prompt + `You are using ${currentModel}`,
		messages: convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools: {
			getSelectedPapers: tool({
				description: 'Get the papers user has currently selected',
				inputSchema: z.object({
					action: z.string().describe('describe what you are searching for in a one short sentence')
				}),
				execute: async () => {
					return {
						selectedPapers
					};
				}
			}),
			searchResearchPapers: tool({
				description: 'Search for research papers to be accurate. ALWAYS USE THIS TOOL.',
				inputSchema: z.object({
					action: z
						.string()
						.describe('describe what you are searching for in a one short sentence'),
					topic: z.string().describe('The topic to get research papers for'),
					startIndex: z.string().describe('The start index for the search')
				}),
				execute: async ({ topic, startIndex }) => {
					const papers = await arxivAPICall(
						startIndex,
						'10',
						{ all: topic },
						'relevance',
						'ascending'
					);
					return {
						topic,
						papers
					};
				}
			})
		}
	});

	return result.toUIMessageStreamResponse();
}
