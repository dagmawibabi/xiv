<script lang="ts">
	import { goto } from '$app/navigation';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { researchState } from '../../state/research_state.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index';

	function sampleComparison() {
		researchState.userInput = 'compare and contrast these selected papers in table format';
		researchState.sendToAI();
		goto('/research');
	}

	import { useSidebar } from '$lib/components/ui/sidebar/index';
	import { MessageCircleWarning } from 'lucide-svelte';
	import { subscriptionState } from '../../state/subscription_state.svelte';
	const sidebar = useSidebar();

	// Get the current plan limit with fallback
	const planLimit =
		subscriptionState.limits[
			subscriptionState.currentPlan as keyof typeof subscriptionState.limits
		];
	const currentLimit = planLimit?.selectPaperLimits ?? 0;
</script>

{#if sidebar.state == 'collapsed'}
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<Sidebar.MenuButton class="h-fit w-full px-0 py-0">
				<MessageCircleWarning size={15} />
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{:else}
	{#if aiConversationState.selectedPapersList.length == 0}
		<div class="h-fit w-full px-0 py-0">
			<div
				class="flex w-full items-center overflow-clip rounded-lg border border-t border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700"
			>
				<div class="line-clamp-3 w-full px-2 py-1 text-xs">
					<span>
						There's no selected paper, click on the the open area of any paper to select it
					</span>
				</div>
			</div>
		</div>
	{/if}
	{#if aiConversationState.selectedPapersList.length == 1}
		<div class="h-fit w-full px-0 py-0">
			<div
				class="flex w-full items-center overflow-clip rounded-lg border border-t border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700"
			>
				<div class="line-clamp-3 w-full px-2 py-1 text-xs">
					<span> You can select as many papers as you like to use in context for research </span>
				</div>
			</div>
		</div>
	{/if}
	{#if aiConversationState.selectedPapersList.length == 2}
		<div class="h-fit w-full px-0 py-0">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="flex w-full cursor-pointer items-center overflow-clip rounded-lg border border-t border-neutral-300 bg-neutral-200 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-700 dark:hover:border-neutral-500"
				onclick={() => sampleComparison()}
			>
				<div class="line-clamp-3 w-full px-2 py-1 text-xs">
					<span>
						Now you can goto the research tab and ask for comparisons and contracts about these
						papers. <span class="text-blue-700 dark:text-emerald-500">Try now</span>
					</span>
				</div>
			</div>
		</div>
	{/if}
	{#if aiConversationState.selectedPapersList.length == currentLimit}
		<div class="h-fit w-full px-0 py-0">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<a href="/pricing">
				<div
					class="flex w-full cursor-pointer items-center overflow-clip rounded-lg border border-t border-neutral-300 bg-neutral-200 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-700 dark:hover:border-neutral-500"
					onclick={() => sampleComparison()}
				>
					<div class="line-clamp-3 w-full px-2 py-1 text-xs">
						<span>
							You have reached your limit for your {subscriptionState.currentPlan} plan.
							<span class="text-blue-700 dark:text-emerald-500"> Upgrade now</span>
						</span>
					</div>
				</div>
			</a>
		</div>
	{/if}
{/if}
