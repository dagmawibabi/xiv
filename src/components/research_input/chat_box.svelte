<script lang="ts">
	import { CircleStop, RotateCcw, Sparkles } from 'lucide-svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { authClient } from '$lib/auth_client';
	import { researchState } from '../../state/research_state.svelte';
	import AiOptions from '../ai_options/ai_options.svelte';
	import SendToAiBtn from './send_to_ai_btn.svelte';

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
			<SendToAiBtn />
		</div>
	</div>
</div>
