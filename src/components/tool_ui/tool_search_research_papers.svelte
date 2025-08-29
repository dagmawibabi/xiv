<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index';
	import { onMount } from 'svelte';

	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import EachPaper from '../each_paper/each_paper.svelte';
	import { researchState } from '../../state/research_state.svelte';
	import MarkdownRender from '../markdown_render.svelte';
	import { ChevronUp, Search } from 'lucide-svelte';
	import EachReference from './each_reference.svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	let { part } = $props();

	let isOpen = $state(true);
</script>

<div class="group/resource mt-2 cursor-pointer" class:mb-2={isOpen}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="flex w-fit cursor-pointer items-center gap-x-2 rounded-full border bg-neutral-100 px-2 py-1 text-xs text-zinc-500 group-hover/resource:border-zinc-400 group-hover/resource:bg-neutral-200 group-hover/resource:text-black"
		class:border-zinc-100={!isOpen}
		onclick={() => (isOpen = !isOpen)}
	>
		<!-- Tool Call -->
		<!-- <div class="mt-2 flex w-fit items-center gap-x-1 rounded-full bg-neutral-50 px-3 py-1"> -->
		<Search size={12} />
		<div>
			{part.input && typeof part.input === 'object' && 'action' in part.input
				? part.input.action
				: ''}
		</div>
		{#if isOpen}
			<ChevronUp size={12} />
		{:else}
			<ChevronDown size={12} />
		{/if}
	</div>

	{#if isOpen}
		<div
			class="ml-3 h-fit border-l pl-3 text-xs text-zinc-500 group-hover/resource:border-dashed group-hover/resource:border-black group-hover/resource:text-neutral-600"
		>
			<!-- References -->
			{#if part.output && typeof part.output === 'object' && 'papers' in part.output}
				<div class="grid w-full grid-cols-5 gap-1 pt-2 md:w-4/5">
					{#each (part.output as { papers: any }).papers as eachPaper}
						<EachReference eachReference={eachPaper} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
