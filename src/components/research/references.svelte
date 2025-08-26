<script>
	import * as Popover from '$lib/components/ui/popover/index';
	import { onMount } from 'svelte';

	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import EachPaper from '../each_paper/each_paper.svelte';
	import { researchState } from '../../state/research_state.svelte';
	import MarkdownRender from '../markdown_render.svelte';
	let { eachReference } = $props();

	onMount(() => {
		// Check if a reference with the same title already exists
		const referenceExists = researchState.references.some(
			(ref) => ref.title === eachReference.title
		);

		// Only add the reference if it doesn't already exist
		if (!referenceExists) {
			researchState.references = [...researchState.references, eachReference];
		}
	});
</script>

<Popover.Root>
	<Popover.Trigger>
		<div
			class={aiConversationState.selectedPapersIDList.includes(eachReference.extractedID) == true
				? 'cursor-pointer truncate rounded-full border border-emerald-400 bg-emerald-50 px-2 py-1 text-left text-xs text-black'
				: 'cursor-pointer truncate rounded-full border border-zinc-100 bg-neutral-100 px-2 py-1 text-left text-xs text-zinc-500 hover:border-zinc-400 hover:text-black'}
		>
			<div class="overflow-clip pr-10">
				<MarkdownRender content={eachReference.title} />
			</div>
		</div>
	</Popover.Trigger>
	<Popover.Content class="min-w-fit border-none bg-transparent p-0 outline-none">
		<EachPaper paper={eachReference} />
	</Popover.Content>
</Popover.Root>
