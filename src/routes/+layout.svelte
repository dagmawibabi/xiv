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

	import { authClient } from '$lib/auth_client';
	import { onMount } from 'svelte';
	const session = authClient.useSession();
	const noSideBarPages = ['/', '/auth/sign_in', '/pricing', '/landing', '/checkout'];

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.ts');
		}
	});
</script>

{#if !noSideBarPages.includes(page.url.pathname) && $session.data}
	<Sidebar.Provider>
		<AppSidebar />
		<main class="relative flex min-h-screen w-full flex-col">
			<div class="pt-4">
				<Sidebar.Trigger />
			</div>
			<div class="mx-auto w-11/12 flex-1 pt-0 md:w-3/4">
				{@render children?.()}
			</div>
			<div class="sticky bottom-0 left-0 right-0 mx-auto w-full md:w-4/5">
				{#if page.url.pathname == '/research'}
					<ChatBox />
				{:else if page.url.pathname == '/bookmarks_page' || page.url.pathname == '/liked_papers_page' || page.url.pathname == '/homepage'}
					<MainInput />
				{:else}
					<MainInput isCommentMode={true} />
				{/if}
			</div>
		</main>
		<AppSidebar2 />
	</Sidebar.Provider>
{:else}
	<!-- Sign In/Up Page -->
	<div class="no-scrollbar m-auto h-screen w-full overflow-scroll">
		{@render children()}
	</div>
{/if}
