<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '../components/sidebar/main-sidebar.svelte';
	import MainInput from '../components/main_input/main_input.svelte';
	import '../app.css';
	import { page } from '$app/state';
	let { children } = $props();
	const path = page.url.pathname.split('/').pop();
</script>

{#if page.url.pathname !== '/'}
	<Sidebar.Provider>
		<AppSidebar />
		<main class="w-full">
			<Sidebar.Trigger />
			<div class="m-auto w-3/5">
				{@render children?.()}
			</div>
			<MainInput />
		</main>
	</Sidebar.Provider>
{:else}
	<div class="no-scrollbar m-auto h-screen w-full overflow-scroll pt-6">
		{@render children()}
	</div>
{/if}
