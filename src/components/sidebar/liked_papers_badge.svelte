<script lang="ts">
	import { paperListState } from '../../state/papers_list.svelte';
</script>

{#if paperListState.likedPapersList.length > 0}
	<div
		class="rounded-full bg-neutral-200 px-2 py-1 text-xs text-zinc-500 dark:bg-neutral-700 dark:text-neutral-400"
	>
		{paperListState.likedPapersList.length}
	</div>
{/if}
