<script>
	import { LogOut } from 'lucide-svelte';
	import { handleSignOut } from '$lib/auth_functions';
	import { Circle } from 'svelte-loading-spinners';

	let isLoggingOut = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={async () => {
		if (isLoggingOut == false) {
			isLoggingOut = !isLoggingOut;
			await handleSignOut();
		}
	}}
>
	{#if isLoggingOut}
		<Circle size="18" color="#f00" duration="1s" />
	{:else}
		<LogOut class="hover:text-red-500" size={16} />
	{/if}
</div>
