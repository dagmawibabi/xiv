<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '../components/sidebar/main-sidebar.svelte';
	import AppSidebar2 from '../components/sidebar/main-sidebar2.svelte';
	import MainInput from '../components/main_input/main_input.svelte';
	import '../app.css';
	import { page } from '$app/state';
	import ChatBox from '../components/ai/chat_box.svelte';
	import { aiConversationState } from '../state/ai_conversation_state.svelte';
	let { children } = $props();
	const path = page.url.pathname.split('/').pop();
</script>

{#if page.url.pathname !== '/'}
	<Sidebar.Provider>
		<AppSidebar />
		<main class="relative flex min-h-screen w-full flex-col">
			<!-- <Sidebar.Trigger /> -->
			<div class="mx-auto w-4/6 flex-1 pt-10">
				{@render children?.()}
			</div>
			<div class="sticky bottom-0 left-0 right-0 mx-auto w-4/6">
				{#if page.url.pathname == '/ai'}
					<ChatBox />
				{:else}
					<MainInput />
				{/if}
			</div>
		</main>
		<AppSidebar2 />
	</Sidebar.Provider>
{:else}
	<!-- Sign In/Up Page -->
	<div class="no-scrollbar m-auto h-screen w-full overflow-scroll pt-6">
		{@render children()}
	</div>
{/if}
