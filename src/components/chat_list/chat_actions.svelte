<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Copy, Download, RefreshCw } from 'lucide-svelte';
	import { researchState } from '../../state/research_state.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';

	let { content, messageID } = $props();

	// Function to copy to clipboard
	function copyToClipboard() {
		navigator.clipboard.writeText(content);
		toast.success(`Copied Successfully!`);
	}

	function downloadAsMarkdown() {
		const blob = new Blob([content], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `response_${Date.now()}.md`;
		a.click();

		URL.revokeObjectURL(url);
		toast.success(`Downloaded Successfully!`);
	}
</script>

<div class="flex h-8">
	<!-- Copy -->
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<div
					class="hidden w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
					onclick={(event) => {
						event.stopPropagation();
						copyToClipboard();
					}}
				>
					<Copy size={16} />
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content>Copy</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>

	<!-- Download -->
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<div
					class="hidden w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
					onclick={(event) => {
						event.stopPropagation();
						downloadAsMarkdown();
					}}
				>
					<Download size={16} />
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content>Download</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>

	<!-- Retry -->
	{#if researchState.chat.lastMessage?.id == messageID && researchState.chat.status == 'ready'}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<div
						class="hidden w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
						onclick={() => researchState.retry()}
					>
						<RefreshCw size={16} />
					</div>
				</Tooltip.Trigger>
				<Tooltip.Content>Retry</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{/if}
</div>
