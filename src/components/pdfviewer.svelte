<script lang="ts">
	import { onMount, tick } from 'svelte';
	// import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
	// import { browser } from '$app/environment';
	import { pdfPreviewState } from '../state/pdf_preview_state.svelte';
	import { CircleX } from 'lucide-svelte';
	import { BarLoader } from 'svelte-loading-spinners';
	import logo from '$lib/assets/logo/logo.png';
	import { Slider } from '$lib/components/ui/slider/index';
	import * as Popover from '$lib/components/ui/popover/index';
	import EachPaper from './each_paper/each_paper.svelte';
	import MarkdownRender from './markdown_render.svelte';
	import { aiConversationState } from '../state/ai_conversation_state.svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';

	const sidebar = useSidebar();

	let canvases: HTMLCanvasElement[] = [];
	let container: HTMLDivElement;
	let scaleButtons = [0.5, 0.9, 1.0, 1.5];

	onMount(async () => {
		const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');

		pdfjsLib.GlobalWorkerOptions.workerSrc =
			'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';

		const pdf = await pdfjsLib.getDocument(pdfPreviewState.pdfLink).promise;

		canvases = Array(pdf.numPages);
		await tick();

		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);
			const viewport = page.getViewport({ scale: pdfPreviewState.currentScale }); // base scale 1

			const canvas = canvases[i - 1];
			if (!canvas || !container) continue;

			const context = canvas.getContext('2d');

			// Calculate scale to fit container width
			const scale = container.clientWidth / viewport.width;
			const scaledViewport = page.getViewport({ scale });

			canvas.width = scaledViewport.width;
			canvas.height = scaledViewport.height;

			if (context) {
				await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
			}
		}
	});
</script>

<div class="no-scrollbar relative h-screen overflow-scroll">
	<!-- PDF Controls  -->
	<div class="sticky left-0 right-0 top-0 z-50 px-2 pt-2 backdrop-blur-lg">
		<div
			class="flex items-center justify-between gap-x-2 rounded-lg border-b bg-neutral-100 text-black"
		>
			<div class="flex items-center justify-start">
				<img src={logo} alt="placeholder" class="m-auto h-12 w-12" />
				<!-- Paper -->
				<div class="flex items-start justify-start">
					{#if pdfPreviewState.paper}
						<Popover.Root>
							<Popover.Trigger>
								<div
									class={aiConversationState.selectedPapersIDList.includes(
										pdfPreviewState.paper['extractedID']
									) == true
										? 'font-semibold text-emerald-600'
										: 'font-semibold text-black'}
								>
									<div class="line-clamp-1 text-left">
										<!-- {pdfPreviewState.paper?.title ?? ''} -->
										<MarkdownRender content={pdfPreviewState.paper['title']} />
									</div>
								</div>
							</Popover.Trigger>
							<Popover.Content class="min-w-fit border-none bg-transparent p-0 outline-none">
								<EachPaper paper={pdfPreviewState.paper} />
							</Popover.Content>
						</Popover.Root>
					{:else}
						<div class="line-clamp-1 text-left text-zinc-400">No paper selected</div>
					{/if}
				</div>
			</div>

			<div class="flex items-center gap-x-2 px-3">
				<!-- Scale Buttons -->
				<div class="flex gap-x-1">
					{#each scaleButtons as scale}
						<button
							class="rounded-lg border bg-neutral-50 px-2 text-sm hover:bg-neutral-100"
							onclick={async () => pdfPreviewState.changeScale(scale, pdfPreviewState.pdfLink)}
						>
							{scale}
						</button>
					{/each}
				</div>
				<!-- Close Button -->
				<button
					onclick={(e) => {
						e.stopPropagation();
						sidebar.setOpen(true);
						pdfPreviewState.closePDF();
					}}
				>
					<CircleX size={20} />
				</button>
			</div>
		</div>
	</div>

	<!-- PDF Viewer -->
	<div bind:this={container} class="">
		<!-- Watermark -->
		<div class="sticky top-0 flex flex-col items-center bg-white">
			<!-- <img src={logo} alt="placeholder" class="m-auto h-14 w-14" /> -->
			<!-- <div class="text-xl font-semibold">ScholarXIV</div> -->
			<!-- <BarLoader size="52" color="#000" duration="1s" /> -->
		</div>

		<!-- PDF Pages -->
		{#each canvases as _, i}
			<canvas bind:this={canvases[i]}></canvas>
		{/each}
	</div>
</div>
