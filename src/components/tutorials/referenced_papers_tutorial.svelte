<script>
	import { goto } from '$app/navigation';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { researchState } from '../../state/research_state.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index';

	function sampleResearch() {
		researchState.userInput = 'Tell me about black holes based on the latest research';
		researchState.sendToAI();
		goto('/research');
	}

	import { useSidebar } from '$lib/components/ui/sidebar/index';
	import { MessageSquareWarning } from 'lucide-svelte';
	const sidebar = useSidebar();
</script>

{#if sidebar.state == 'collapsed'}
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="h-fit w-full px-0 py-0">
				<MessageSquareWarning size={15} />
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{:else if researchState.references.length == 0}
	<div class="h-fit w-full px-0 py-0">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="flex w-full cursor-pointer items-center overflow-clip rounded-lg border border-t border-neutral-300 bg-neutral-200 hover:border-black"
			onclick={() => sampleResearch()}
		>
			<div class="line-clamp-3 w-full px-2 py-1 text-xs">
				<span>
					Papers used by the AI for research will show up here. <span class="text-blue-700"
						>Try now</span
					>
				</span>
			</div>
		</div>
	</div>
{/if}

{#if sidebar.state == 'collapsed'}
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="h-fit w-full px-0 py-0">
				<MessageSquareWarning size={15} />
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{:else if researchState.references.length == 0}
	<div class="h-fit w-full px-0 py-0">
		<div
			class="flex w-full items-center overflow-clip rounded-lg border border-t border-neutral-300 bg-neutral-200"
		>
			<div class="line-clamp-3 w-full px-2 py-1 text-xs">
				<span>
					Once you try it, remember to click on the references that appear here for more options and
					info.
				</span>
			</div>
		</div>
	</div>
{/if}
