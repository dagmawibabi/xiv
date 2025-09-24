<script lang="ts">
	import { CircleCheckBig } from 'lucide-svelte';
	import { aiConversationState } from '../state/ai_conversation_state.svelte';
	import { subscriptionState } from '../state/subscription_state.svelte';

	const { paperList, loadingState } = $props();

	function selectAll() {
		if (loadingState) return;

		// Get the current plan limit
		const planLimit =
			subscriptionState.limits[
				subscriptionState.currentPlan as keyof typeof subscriptionState.limits
			];
		const currentLimit = planLimit?.selectPaperLimits ?? 0;

		// If already at limit or all papers selected, deselect all
		if (
			aiConversationState.selectedPapersList.length >= currentLimit ||
			aiConversationState.selectedPapersList.length === paperList.length
		) {
			aiConversationState.selectedPapersList = [];
			aiConversationState.selectedPapersIDList = [];
		} else {
			// Select papers up to the plan limit
			const papersToSelect = Math.min(currentLimit, paperList.length);
			aiConversationState.selectedPapersList = paperList.slice(0, papersToSelect);
			aiConversationState.selectedPapersIDList = paperList
				.slice(0, papersToSelect)
				.map((paper: any) => paper.extractedID);
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={aiConversationState.selectedPapersList.length > 0
		? 'flex h-7 w-14 items-center justify-center rounded-full px-1 hover:bg-zinc-100'
		: 'flex h-7 w-14 items-center justify-center rounded-full p-1 hover:bg-zinc-100'}
	onclick={() => selectAll()}
>
	<div
		class={aiConversationState.selectedPapersList.length > 0
			? 'px-1 pb-1 font-semibold text-emerald-500'
			: 'px-1 pb-1 font-semibold text-zinc-400'}
	>
		{aiConversationState.selectedPapersList.length}
	</div>
	<CircleCheckBig
		size={18}
		class={(() => {
			const maxSelectable = Math.min(
				subscriptionState.limits[
					subscriptionState.currentPlan as keyof typeof subscriptionState.limits
				]?.selectPaperLimits ?? 0,
				paperList.length
			);
			return aiConversationState.selectedPapersList.length === maxSelectable &&
				maxSelectable > 0 &&
				!loadingState &&
				paperList.length > 0
				? 'cursor-pointer text-emerald-500'
				: 'cursor-pointer';
		})()}
	/>
</div>
