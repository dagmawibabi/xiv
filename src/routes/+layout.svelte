<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '../components/sidebar/main-sidebar.svelte';
	import AppSidebar2 from '../components/sidebar/right_sidebar.svelte';
	import MainInput from '../components/main_input/main_input.svelte';
	import '../app.css';
	import { page } from '$app/state';
	import ChatBox from '../components/research_input/chat_box.svelte';
	import { aiConversationState } from '../state/ai_conversation_state.svelte';
	let { children } = $props();
	const path = page.url.pathname.split('/').pop();
	import 'katex/dist/katex.min.css';
	import * as Resizable from '$lib/components/ui/resizable/index';

	import { authClient } from '$lib/auth_client';
	import { onMount } from 'svelte';
	import { pdfPreviewState } from '../state/pdf_preview_state.svelte';
	import Pdfviewer from '../components/pdfviewer.svelte';
	const session = authClient.useSession();
	const noSideBarPages = ['/', '/auth/sign_in', '/pricing', '/landing', '/checkout'];

	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';

	// import { browser } from '$app/environment';
	// let theme: 'light' | 'dark' = $state('light');

	// function applyTheme(t: 'light' | 'dark') {
	// 	if (!browser) return;
	// 	document.documentElement.classList.toggle('dark', t === 'dark');
	// 	theme = t;
	// }
	// function toggleTheme() {
	// 	const next = theme === 'dark' ? 'light' : 'dark';
	// 	applyTheme(next);
	// 	if (browser) {
	// 		localStorage.setItem('theme', next);
	// 		document.cookie = `theme=${next}; Path=/;`;
	// 	}
	// }

	// onMount(() => {
	// 	if (!browser) return;
	// 	const saved = localStorage.getItem('theme');
	// 	if (saved === 'light' || saved === 'dark') {
	// 		applyTheme(saved);
	// 	} else {
	// 		const mql = window.matchMedia('(prefers-color-scheme: dark)');
	// 		applyTheme(mql.matches ? 'dark' : 'light');
	// 	}
	// });
	// onMount(() => {
	// 	if ('serviceWorker' in navigator) {
	// 		navigator.serviceWorker.register('/service-worker.js');
	// 	}
	// });

	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
{#if !noSideBarPages.includes(page.url.pathname) && $session.data}
	<Sidebar.Provider>
		<!-- Left Sidebar -->
		<!-- {#if !pdfPreviewState.isOpen} -->
		<AppSidebar />
		<!-- {/if} -->

		<!-- Main Content -->
		<Resizable.PaneGroup direction="horizontal">
			<!-- Main Content -->
			<Resizable.Pane>
				<main
					class="no-scrollbar relative flex max-h-screen min-h-screen w-full flex-col overflow-scroll"
				>
					{#if !pdfPreviewState.isOpen}
						<div
							class="sticky left-0 top-0 z-50 flex w-fit flex-col rounded-br-lg border-b border-r bg-white dark:bg-neutral-900 md:top-4 md:border-none md:pt-2"
						>
							<Sidebar.Trigger />
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- <div
								class="flex w-fit cursor-pointer items-center justify-center rounded-lg p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
								onclick={async () => {
									toggleMode();
								}}
							>
								<SunIcon
									class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
								/>
								<MoonIcon
									class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-90"
								/>
							</div> -->
						</div>
					{/if}

					<div class="pt-4">
						<!-- {#if !pdfPreviewState.isOpen}
							<Sidebar.Trigger />
						{/if} -->
					</div>

					<div
						class="mx-auto w-11/12 flex-1 pt-0 md:w-3/4"
						class:md:w-[85%]={pdfPreviewState.isOpen}
					>
						{@render children?.()}
					</div>
					<div
						class="sticky bottom-0 left-0 right-0 mx-auto w-full md:w-4/5"
						class:md:w-[85%]={pdfPreviewState.isOpen}
					>
						{#if page.url.pathname == '/research'}
							<ChatBox />
						{:else if page.url.pathname == '/bookmarks_page' || page.url.pathname == '/liked_papers_page' || page.url.pathname == '/homepage'}
							<MainInput />
						{:else}
							<MainInput isCommentMode={true} />
						{/if}
					</div>
				</main>
			</Resizable.Pane>

			<!-- Pdf Preview -->
			{#if pdfPreviewState.isOpen}
				<Resizable.Handle withHandle />
				<Resizable.Pane class="no-scrollbar overflow-clip">
					<Pdfviewer />
				</Resizable.Pane>
			{/if}
		</Resizable.PaneGroup>

		<!-- Right Sidebar -->
		{#if !pdfPreviewState.isOpen}
			<AppSidebar2 />
		{/if}
	</Sidebar.Provider>
{:else}
	<!-- Sign In/Up Page -->
	<div class="no-scrollbar m-auto h-screen w-full overflow-scroll">
		<!-- <button onclick={toggleTheme} class="rounded bg-gray-200 p-2 dark:bg-gray-700">
			{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
		</button> -->
		<Button onclick={toggleMode} variant="outline" size="icon">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		{@render children()}
	</div>
{/if}
