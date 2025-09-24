<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Copy, Download, FileText, RefreshCw, SquareMenu } from 'lucide-svelte';
	import { researchState } from '../../state/research_state.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	import { marked } from 'marked';
	import logo from '$lib/assets/logo/logo.png';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import katex from 'katex';
	import 'katex/dist/katex.min.css';
	import { authClient } from '$lib/auth_client';
	import { subscriptionState } from '../../state/subscription_state.svelte';

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
		a.download = `ScholarXIV_${Date.now()}.md`;
		a.click();

		URL.revokeObjectURL(url);
		toast.success(`Downloaded Successfully!`);
	}

	async function downloadAsPDF() {
		const html2pdf = (await import('html2pdf.js')).default;

		let htmlContent = await marked(content);

		// Replace LaTeX expressions with KaTeX-rendered HTML
		// Inline math: $...$
		htmlContent = htmlContent.replace(/\$(.+?)\$/g, (_, expr) => {
			try {
				return katex.renderToString(expr, { throwOnError: false });
			} catch {
				return `$${expr}$`;
			}
		});

		// Block math: $$...$$
		htmlContent = htmlContent.replace(/\$\$(.+?)\$\$/gs, (_, expr) => {
			try {
				return `<div style="text-align:center; margin: 1em 0;">${katex.renderToString(expr, { displayMode: true, throwOnError: false })}</div>`;
			} catch {
				return `$$${expr}$$`;
			}
		});

		const element = document.createElement('div');
		element.innerHTML =
			subscriptionState.currentPlan === 'Free'
				? `
			<style>
				p, h1, h2, h3, h4, h5, h6, ul, ol, li, pre, blockquote {
					page-break-inside: avoid;
				}
				img {
					page-break-inside: avoid;
					page-break-before: auto;
					page-break-after: auto;
				}
			</style>
			<div class="p-6">
				<div class="flex items-center justify-start mb-6">
					<img src="${logo}" alt="Logo" class="max-h-20 w-20"/>
					<div class="mb-4">
						<h1 class="text-lg m-0" style="font-family: Arial, sans-serif;">
							ScholarXIV
						</h1>
						<p style="font-size: 12px; color: #555; margin: 0;">
							Generated on ${new Date().toLocaleDateString()}
						</p>
					</div>
				</div>
				<div class="prose text-sm" style="max-width: 700px; margin: 0 auto;">
					${htmlContent}
				</div>
			</div>
		`
				: `
			<style>
				p, h1, h2, h3, h4, h5, h6, ul, ol, li, pre, blockquote {
					page-break-inside: avoid;
				}
				img {
					page-break-inside: avoid;
					page-break-before: auto;
					page-break-after: auto;
				}
			</style>
			<div class="p-6">
				<div class="prose text-sm" style="max-width: 700px; margin: 0 auto;">
					${htmlContent}
				</div>
			</div>
		`;

		const opt = {
			margin: 0.5,
			filename: `ScholarXIV_${Date.now()}.pdf`,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
		};

		html2pdf()
			.set(opt)
			.from(element)
			.save()
			.then(() => {
				toast.success('Downloaded Successfully as PDF!');
			});
	}
</script>

<div class="flex h-8">
	<!-- Copy -->
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<div
					class="flex w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
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

	<!-- Download as MD or PDF -->
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div
							class="flex w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
						>
							<Download size={16} />
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<!-- <DropdownMenu.Label>Download</DropdownMenu.Label>
							<DropdownMenu.Separator /> -->
							<DropdownMenu.Item
								class="cursor-pointer"
								onclick={async (event) => {
									event.stopPropagation();
									// Track Usage
									await authClient.usage.ingest({
										event: 'download_research_pdf',
										metadata: {
											datetime: new Date().toISOString()
										}
									});
									downloadAsPDF();
								}}
							>
								<FileText size={14} />
								Download as PDF</DropdownMenu.Item
							>
							<DropdownMenu.Item
								class="cursor-pointer"
								onclick={(event) => {
									event.stopPropagation();
									downloadAsMarkdown();
								}}
							>
								<SquareMenu size={14} />
								Download as Markdown</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
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
						class="flex w-fit cursor-pointer rounded-md p-2 hover:bg-neutral-100 group-hover/aiResponse:flex"
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
