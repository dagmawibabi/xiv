<!-- <script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import ChatBox from '../../components/ai/chat_box.svelte';
	let { children } = $props();

	const path = page.url.pathname.split('/').pop();
</script>

<div class="no-scrollbar m-auto h-screen w-full overflow-scroll pt-6">
	{@render children()}
	<ChatBox />
</div> -->

<!-- <script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '../../components/sidebar/main-sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider> -->
