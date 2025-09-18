<script lang="ts">
	import { authClient } from '$lib/auth_client';
	import { Circle } from 'svelte-loading-spinners';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import {
		CircleFadingArrowUp,
		LogOut,
		User,
		WalletCards,
		MessageCirclePlus,
		Map,
		ScrollText
	} from 'lucide-svelte';
	import CurrentPlan from '../sidebar/current_plan.svelte';
	import { handleSignOut } from '$lib/auth_functions';

	// Development Items.
	const developmentItems = [
		{
			title: 'Feedback',
			url: 'https://scholarxiv.featurebase.app/',
			icon: MessageCirclePlus
		},
		{
			title: 'Roadmap',
			url: 'https://scholarxiv.featurebase.app/roadmap',
			icon: Map
		},
		{
			title: 'Changelog',
			url: 'https://scholarxiv.featurebase.app/changelog',
			icon: ScrollText
		}
	];

	let isLoggingOut = $state(false);
	const session = authClient.useSession();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="w-full">
		<div class="flex w-full items-center justify-between rounded-full bg-white p-2">
			<div class="flex items-center justify-start gap-x-1 text-xs">
				<!-- Profile Pic -->
				<Avatar.Root class="h-8 w-8 border border-zinc-300 drop-shadow-md hover:shadow-lg">
					<Avatar.Image src={$session.data?.user.image} />
					<Avatar.Fallback>
						{$session.data?.user.name[0].toString().toUpperCase()}
					</Avatar.Fallback>
				</Avatar.Root>

				<!-- Username and Plan-->
				<div class="flex flex-col items-center justify-start text-start">
					<div class="line-clamp-1 w-full">
						{$session.data?.user.name}
					</div>
					<div class="line-clamp-1 w-full">
						<CurrentPlan />
					</div>
				</div>
			</div>

			<!-- Upgrade Button -->
			{#if isLoggingOut}
				<Circle size="18" color="#f00" duration="1s" />
			{:else}
				<a href="/landing#pricing">
					<div class="rounded-full border bg-stone-100 px-3 py-1 hover:border-zinc-400">
						<span class="text-sm">Upgrade</span>
					</div>
				</a>
			{/if}
		</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[200px]">
		<DropdownMenu.Group>
			<!-- Account -->
			<DropdownMenu.Item class="overflow-clip">
				<div class="flex items-center gap-x-2">
					<User size={14} class="text-zinc-400" />
					<span class="line-clamp-1 text-zinc-400">{$session.data?.user.email}</span>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />

			<!-- Subscription -->
			<DropdownMenu.Item class="cursor-pointer">
				<a href="/landing#pricing">
					<div class="flex items-center gap-x-2">
						<CircleFadingArrowUp size={14} />
						<span>Upgrade Plan</span>
					</div>
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="cursor-pointer">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="flex items-center gap-x-2"
					onclick={async () => await authClient.customer.portal()}
				>
					<WalletCards size={14} />
					<span>Customer Portal</span>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />

			<!-- Development -->
			{#each developmentItems as eachDevelopmentItem (eachDevelopmentItem.title)}
				<a href={eachDevelopmentItem.url} target="_blank">
					<DropdownMenu.Item class="cursor-pointer">
						<div class="flex items-center gap-x-2">
							<eachDevelopmentItem.icon size={16} />
							<span>{eachDevelopmentItem.title}</span>
						</div>
					</DropdownMenu.Item>
				</a>
			{/each}
			<DropdownMenu.Separator />

			<!-- Logout -->
			<DropdownMenu.Item
				class="group/logout cursor-pointer"
				onclick={async () => {
					if (isLoggingOut == false) {
						isLoggingOut = !isLoggingOut;
						await handleSignOut();
					}
				}}
			>
				<div class="flex items-center gap-x-2">
					{#if isLoggingOut}
						<Circle size="18" color="#f00" duration="1s" />
					{:else}
						<LogOut size={14} class="group-hover/logout:text-red-500" />
					{/if}
					<span class="group-hover/logout:text-red-500">Logout</span>
				</div>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
