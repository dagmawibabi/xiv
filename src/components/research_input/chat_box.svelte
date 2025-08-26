<script lang="ts">
	import { CircleStop, RotateCcw, Sparkles } from 'lucide-svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { authClient } from '$lib/auth_client';
	import { researchState } from '../../state/research_state.svelte';
	import AiOptions from '../ai_options/ai_options.svelte';

	function handleEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			researchState.sendToAI();
		}
	}

	// const isCommentMode = $state(page.url.pathname.split('/')[1] == 'comments');
	let session = authClient.useSession();
</script>

<div
	class="no-scrollbar h-fit w-full rounded-tl-xl rounded-tr-xl border-t border-zinc-200 pb-4
	backdrop-blur-lg"
>
	<!-- AI Options -->
	<AiOptions showMaxMinButton={false} />

	<!-- Main Input Box -->
	<div class="no-scrollbar flex flex-col bg-transparent px-2 pt-2">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="group flex overflow-clip rounded-3xl border border-zinc-400 bg-white">
			<!-- Input Box -->
			<div class="flex w-full items-center gap-x-2 px-3 py-2">
				<Sparkles size={18} class="text-zinc-400" />
				<input
					type="text"
					class="w-full items-center bg-white pb-0 outline-none md:pb-1 lg:pb-1 xl:pb-1 2xl:pb-1"
					placeholder={`ask any question ...`}
					bind:value={researchState.userInput}
					onkeydown={handleEnter}
				/>
			</div>

			<!-- Send Button -->
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
				<div class="group/send group-hover:bg-zinc-200" onclick={() => researchState.sendToAI()}>
					<div
						class="flex h-full w-24 cursor-pointer items-center justify-center border-l group-hover/send:bg-black group-hover/send:text-white"
					>
						<span> Send </span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
