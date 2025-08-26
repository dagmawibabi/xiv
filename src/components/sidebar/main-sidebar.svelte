<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Header from './header.svelte';
	import ProfileAvatar from '../profile_avatar/profile_avatar.svelte';
	import { HouseIcon, Heart, Bookmark, LogOut, SearchIcon, Bolt, CircleDot } from 'lucide-svelte';

	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '/homepage',
			icon: HouseIcon,
			badge: 0
		},
		{
			title: 'Research',
			url: '/research',
			icon: CircleDot,
			badge: 0
		},
		{
			title: 'Liked Papers',
			url: '/liked_papers_page',
			icon: Heart,
			badge: paperListState.likedPapersList.length
		},
		{
			title: 'Bookmarks',
			url: '/bookmarks_page',
			icon: Bookmark,
			badge: paperListState.bookmarkList.length
		},
		// {
		// 	title: 'Search',
		// 	url: '#',
		// 	icon: SearchIcon
		// },
		{
			title: 'Settings',
			url: '#',
			icon: Bolt,
			badge: 0
		}
	];

	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';
	import logo from '$lib/assets/logo/logo.png';

	import LogoutButton from '../profile_avatar/logout_button.svelte';
	import { paperListState } from '../../state/papers_list.svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	const sidebar = useSidebar();
</script>

<Sidebar.Root variant="floating" collapsible="icon">
	<Sidebar.Header
		class={sidebar.state == 'expanded'
			? 'rounded-tl-lg rounded-tr-lg border-b bg-neutral-100'
			: 'rounded-tl-lg rounded-tr-lg border-b bg-neutral-100 px-0'}
	>
		<!-- <Header /> -->
		{#if sidebar.state == 'expanded'}
			<div class="flex w-full items-center justify-center">
				<img src={logo} alt=" " class="-ml-2 h-10 w-11" />
				<div class="text-lg font-semibold">ScholarXIV</div>
			</div>
		{:else}
			<div class="mx-auto">
				<img src={logo} alt=" " class="h-10 w-11" />
			</div>
		{/if}
	</Sidebar.Header>

	<Sidebar.Content class="bg-neutral-100 pt-4">
		<Sidebar.Menu class="px-2">
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						class="flex w-full items-center justify-start gap-x-2 rounded-full px-3 hover:bg-white"
					>
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<item.icon size={18} />
								<span class="text-base">{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
					{#if item.badge > 0}
						<Sidebar.MenuBadge class="rounded-full bg-neutral-200 text-zinc-500"
							>{item.badge}</Sidebar.MenuBadge
						>
					{/if}
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.Content>

	<Sidebar.Footer class="rounded-bl-lg rounded-br-lg border-t bg-neutral-100">
		<Sidebar.Menu>
			<Sidebar.MenuItem class="">
				<Sidebar.MenuButton
					class={sidebar.state == 'expanded'
						? 'h-full rounded-full border bg-white hover:border-zinc-400'
						: 'rounded-full '}
				>
					{#if sidebar.state == 'expanded'}
						<ProfileAvatar showLogoutBtn={false} />
						<div class="pl-6">
							<LogoutButton />
						</div>
					{:else}
						<LogoutButton />
					{/if}
					<Sidebar.MenuSkeleton />
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
