<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '../components/sidebar/main-sidebar.svelte';
	import MainInput from '../components/main_input/main_input.svelte';
	import '../app.css';
	import { page } from '$app/state';
	import ChatBox from '../components/ai/chat_box.svelte';
	let { children } = $props();
	const path = page.url.pathname.split('/').pop();
</script>

{#if page.url.pathname !== '/'}
	<Sidebar.Provider>
		<AppSidebar />
		<main class="relative flex min-h-screen w-full flex-col">
			<Sidebar.Trigger />
			<div class="ml-[15%] w-3/5 flex-1">
				{@render children?.()}
			</div>
			<div class="sticky bottom-0 left-0 right-0 ml-[15%] w-3/5">
				{#if page.url.pathname == '/ai'}
					<ChatBox />
				{:else}
					<MainInput />
				{/if}
			</div>
		</main>
	</Sidebar.Provider>
{:else}
	<!-- Sign In/Up Page -->
	<div class="no-scrollbar m-auto h-screen w-full overflow-scroll pt-6">
		{@render children()}
	</div>
{/if}
