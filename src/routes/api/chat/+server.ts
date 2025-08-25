import { z } from 'zod';
import { streamText, type UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { arxivAPICall } from '../utils/search_and_clean_papers';
// import type { searchStringOBJI } from '../types/types';

export async function GET() {
	const availableModels = await gateway.getAvailableModels();
	return new Response(JSON.stringify(availableModels));
}

export async function POST({ request }) {
	// CHAT
	const { messages }: { messages: UIMessage[] } = await request.json();

	const result = streamText({
		model: 'google/gemini-2.5-flash',
		system:
			'You are a research assistant so as much as you can use the search research papers tool to respond to queries. When you respond understand all the research papers and give only a comprehensive summary of all the papers. Format your responses beautifully using markdown.',
		messages: convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools: {
			weather: tool({
				description: 'Get the weather in a location (fahrenheit)',
				inputSchema: z.object({
					action: z.string().describe('a phrase to describe what you are doing'),
					location: z.string().describe('The location to get the weather for')
				}),
				execute: async ({ location }) => {
					const temperature = Math.round(Math.random() * (90 - 32) + 32);
					return {
						location,
						temperature
					};
				}
			}),
			convertFahrenheitToCelsius: tool({
				description: 'Convert a temperature in fahrenheit to celsius',
				inputSchema: z.object({
					action: z.string().describe('a phrase to describe what you are doing'),
					temperature: z.number().describe('The temperature in fahrenheit to convert')
				}),
				execute: async ({ temperature }) => {
					const celsius = Math.round((temperature - 32) * (5 / 9));
					return {
						celsius
					};
				}
			}),
			searchResearchPapers: tool({
				description: 'Search for research papers to be accurate. ALWAYS USE THIS TOOL.',
				inputSchema: z.object({
					action: z
						.string()
						.describe('describe what you are searching for in a one short sentence'),
					topic: z.string().describe('The topic to get research papers for')
				}),
				execute: async ({ topic }) => {
					const papers = await arxivAPICall('0', '10', { all: topic }, 'relevance', 'ascending');
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
