<script lang="ts">
	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import { LogOut } from 'lucide-svelte';
	let {
		fullInfo = false,
		showLogoutBtn = false
	}: {
		fullInfo?: boolean;
		showLogoutBtn?: boolean;
	} = $props();

	const session = authClient.useSession();
</script>

<div class="flex w-full items-center justify-between gap-x-8">
	<div class="flex items-center gap-x-1">
		<Avatar.Root class="h-8 w-8 border border-zinc-300 drop-shadow-md hover:shadow-lg">
			<Avatar.Image src={$session.data?.user.image} />
			<Avatar.Fallback>
				{$session.data?.user.name[0].toString().toUpperCase()}
			</Avatar.Fallback>
		</Avatar.Root>
		{#if fullInfo == true}
			<div class="flex flex-col">
				<span class="text-xs font-semibold">
					{$session.data?.user.name}
				</span>
				<span class="text-xs">
					{$session.data?.user.email}
				</span>
			</div>
		{/if}
	</div>
	{#if showLogoutBtn == true}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onclick={() => handleSignOut()}>
			<LogOut class="hover:text-red-500" size={16} />
		</div>
	{/if}
</div>
