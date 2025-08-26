<script lang="ts">
	import { CircleStop, RotateCcw } from 'lucide-svelte';
	import { researchState } from '../../state/research_state.svelte';
	import { Circle } from 'svelte-loading-spinners';
</script>

{#if researchState.chat.status == 'submitted'}
	<div>
		<div
			class="flex h-full w-24 cursor-pointer items-center justify-center border-l group-hover/send:bg-black group-hover/send:text-white"
		>
			<Circle size="22" color="#000000" duration="1s" />
		</div>
	</div>
{:else if researchState.chat.status == 'streaming'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="group/streaming group-hover:bg-zinc-200" onclick={() => researchState.stop()}>
		<div
			class="flex h-full w-24 cursor-pointer items-center justify-center border-l group-hover/streaming:bg-red-100 group-hover/streaming:text-white"
		>
			<CircleStop
				size="22"
				class="cursor-pointer text-neutral-500 group-hover/streaming:text-red-400"
			/>
		</div>
	</div>
{:else if researchState.chat.status == 'error'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="group/error group-hover:bg-zinc-200" onclick={() => researchState.retry()}>
		<div
			class="flex h-full w-24 cursor-pointer items-center justify-center border-l group-hover/error:bg-blue-100 group-hover/error:text-white"
		>
			<RotateCcw
				size="22"
				class="cursor-pointer text-neutral-500 group-hover/error:text-blue-400"
			/>
		</div>
	</div>
{:else}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="group/send group-hover:bg-zinc-200" onclick={() => researchState.sendToAI()}>
		<div
			class="flex h-full w-24 cursor-pointer items-center justify-center border-l group-hover/send:bg-black group-hover/send:text-white"
		>
			<span> Send </span>
		</div>
	</div>
{/if}
