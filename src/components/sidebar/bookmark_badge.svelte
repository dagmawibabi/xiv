<script lang="ts">
	import { paperListState } from '../../state/papers_list.svelte';
</script>

{#if paperListState.bookmarkList.length > 0}
	<div class="rounded-full bg-neutral-200 px-2 py-1 text-xs text-zinc-500">
		{paperListState.bookmarkList.length}
	</div>
{/if}
