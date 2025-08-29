<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index';
	import { Brain, ChevronDown, ChevronUp } from 'lucide-svelte';
	import MarkdownRender from '../markdown_render.svelte';
	let { thinkingContent } = $props();

	let isOpen = $state(true);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="group/thinking h-fits mt-2 cursor-pointer" onclick={() => (isOpen = !isOpen)}>
	<div
		class="flex w-fit cursor-pointer items-center gap-x-2 rounded-full border bg-neutral-100 px-2 py-1 text-xs text-zinc-500 group-hover/thinking:border-zinc-400 group-hover/thinking:bg-neutral-200 group-hover/thinking:text-black"
		class:border-zinc-100={!isOpen}
	>
		<Brain size={12} class="text-zinc-500" />
		<span>Thinking </span>
		{#if isOpen}
			<ChevronUp size={12} />
		{:else}
			<ChevronDown size={12} />
		{/if}
	</div>

	{#if isOpen}
		<div
			class="ml-3 h-fit border-l pl-3 text-xs text-zinc-500 group-hover/thinking:border-dashed group-hover/thinking:border-black group-hover/thinking:text-neutral-600"
		>
			<MarkdownRender content={thinkingContent} />
		</div>
	{/if}
</div>
