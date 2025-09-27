<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { page } from '$app/state';
	import MarkdownRender from '../markdown_render.svelte';
	import { pdfPreviewState } from '../../state/pdf_preview_state.svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';

	const sidebar = useSidebar();

	// Props
	let { paperState } = $props();
</script>

<!-- Title -->

<!-- Mobile -->
<div class="flex md:hidden">
	<a
		href={paperState.paper['pdfLink']}
		target="_blank"
		rel="noopener noreferrer"
		download
		class={aiConversationState.selectedPapersIDList.includes(paperState.paper['extractedID']) ==
		true
			? 'group/title font-semibold text-emerald-600 transition-all duration-300 ease-in-out'
			: paperState.isFirstInList == true && page.url.pathname != '/bookmarks_page'
				? 'group/title font-semibold text-black dark:text-white'
				: paperState.isReadingSummary
					? 'group/title font-semibold text-black dark:text-white'
					: 'group/title font-semibold text-zinc-500 transition-all duration-300 ease-in-out group-hover:text-black dark:text-white'}
	>
		<div
			class="inline-flex items-center gap-x-2 text-sm decoration-zinc-400 decoration-1 underline-offset-4 hover:underline"
		>
			<MarkdownRender content={paperState.paper['title']} />

			<div class="hidden group-hover/title:inline-block">
				<ExternalLink size={12} />
			</div>
		</div>
	</a>
</div>

<!-- Others -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="hidden md:flex"
	onclick={async (e) => {
		e.stopPropagation();
		sidebar.setOpen(false);
		pdfPreviewState.openPaper(paperState.paper);
	}}
>
	<div
		class={aiConversationState.selectedPapersIDList.includes(paperState.paper['extractedID']) ==
		true
			? 'group/title font-semibold text-emerald-600 transition-all duration-300 ease-in-out'
			: paperState.isFirstInList == true && page.url.pathname != '/bookmarks_page'
				? 'group/title font-semibold text-black dark:text-white'
				: paperState.isReadingSummary
					? 'group/title font-semibold text-black dark:text-white'
					: 'group/title font-semibold text-zinc-500 transition-all duration-300 ease-in-out group-hover:text-black'}
	>
		<div
			class="inline-flex items-center gap-x-2 text-sm decoration-zinc-400 decoration-1 underline-offset-4 hover:underline"
		>
			<MarkdownRender content={paperState.paper['title']} />

			<div class="hidden group-hover/title:inline-block">
				<ExternalLink size={12} />
			</div>
		</div>
	</div>
</div>
