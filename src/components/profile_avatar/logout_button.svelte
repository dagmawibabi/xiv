<script>
	import { LogOut } from 'lucide-svelte';
	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';
	const session = authClient.useSession();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={() => handleSignOut()}>
	<LogOut class="hover:text-red-500" size={16} />
</div>
