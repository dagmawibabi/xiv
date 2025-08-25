<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Header from './header.svelte';
	import ProfileAvatar from '../profile_avatar.svelte';
	import { HouseIcon, Heart, Bookmark, LogOut, SearchIcon, Bolt, CircleDot } from 'lucide-svelte';

	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '/homepage',
			icon: HouseIcon
		},
		{
			title: 'Research',
			url: '/ai',
			icon: CircleDot
		},
		{
			title: 'Liked Papers',
			url: '/liked_papers_page',
			icon: Heart
		},
		{
			title: 'Bookmarks',
			url: '/bookmarks_page',
			icon: Bookmark
		},
		// {
		// 	title: 'Search',
		// 	url: '#',
		// 	icon: SearchIcon
		// },

		{
			title: 'Settings',
			url: '#',
			icon: Bolt
		}
	];

	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';
	import logo from '$lib/assets/logo/logo.png';
</script>

<!-- <Sidebar.Root> -->
<Sidebar.Root variant="floating" collapsible="icon">
	<Sidebar.Header>
		<!-- <Header /> -->
		<div class="flex w-full items-center justify-center border-b pb-3">
			<img src={logo} alt=" " class="h-10 w-10" />
			<div class="text-center text-base font-semibold">ScholarXIV</div>
		</div>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Menu class="px-2">
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						class="flex w-full items-center justify-start gap-x-2 rounded-full px-3 hover:bg-zinc-100"
					>
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<item.icon size={18} />
								<span class="text-base">{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="flex h-full w-full rounded-full bg-zinc-100">
					<ProfileAvatar fullInfo={true} showLogoutBtn={true} />
					<Sidebar.MenuSkeleton />
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
