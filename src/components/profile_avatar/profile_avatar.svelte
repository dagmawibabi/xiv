<script lang="ts">
	import { authClient } from '$lib/auth_client';
	import LogoutButton from './logout_button.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index';

	let {
		fullInfo = true,
		showAvatar = true,
		showLogoutBtn = false
	}: {
		fullInfo?: boolean;
		showAvatar?: boolean;
		showLogoutBtn?: boolean;
	} = $props();

	const session = authClient.useSession();
</script>

<div class="flex w-[85%] items-center justify-between">
	<div class="flex items-center gap-x-1">
		{#if showAvatar == true}
			<Avatar.Root class="h-8 w-8 border border-zinc-300 drop-shadow-md hover:shadow-lg">
				<Avatar.Image src={$session.data?.user.image} />
				<Avatar.Fallback>
					{$session.data?.user.name[0].toString().toUpperCase()}
				</Avatar.Fallback>
			</Avatar.Root>
		{/if}
		{#if fullInfo == true}
			<div class="flex w-[60%] flex-col overflow-clip">
				<span class="line-clamp-1 text-xs font-semibold">
					{$session.data?.user.name}
				</span>
				<span class="line-clamp-1 overflow-clip truncate text-ellipsis text-xs">
					{$session.data?.user.email}
				</span>
			</div>
		{/if}
	</div>
	{#if showLogoutBtn == true}
		<LogoutButton />
	{/if}
</div>
