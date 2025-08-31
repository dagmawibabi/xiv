<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Header from './header.svelte';
	import ProfileAvatar from '../profile_avatar/profile_avatar.svelte';
	import {
		HouseIcon,
		Heart,
		Bookmark,
		LogOut,
		SearchIcon,
		Bolt,
		CircleDot,
		Plus,
		MessageCirclePlus,
		Map,
		Logs,
		ScrollText
	} from 'lucide-svelte';

	// Navigation Items.
	const navigationItems = [
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
		}
		// {
		// 	title: 'Search',
		// 	url: '#',
		// 	icon: SearchIcon
		// },
		// {
		// 	title: 'Settings',
		// 	url: '#',
		// 	icon: Bolt,
		// 	badge: 0
		// }
	];

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

	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';
	import logo from '$lib/assets/logo/logo.png';

	import LogoutButton from '../profile_avatar/logout_button.svelte';
	import { paperListState } from '../../state/papers_list.svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { onMount } from 'svelte';
	const sidebar = useSidebar();

	// check if we're on mobile
	let isMobile = $state(false);
	let currentWindowWidth = $state(window.innerWidth);
	onMount(() => {
		isMobile = window.innerWidth < 768;
		currentWindowWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			currentWindowWidth = window.innerWidth;
			isMobile = window.innerWidth < 768;
		});
		setTimeout(() => {
			navigationItems[2].badge = paperListState.likedPapersList.length;
			navigationItems[3].badge = paperListState.bookmarkList.length;
		}, 0);
	});
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
				<img src={logo} alt=" " class="-ml-6 h-10 w-11" />
				<div class="text-lg font-semibold">ScholarXIV</div>
			</div>
		{:else}
			<div class="mx-auto">
				<img src={logo} alt=" " class="h-10 w-11" />
			</div>
		{/if}
	</Sidebar.Header>

	<Sidebar.Content class="bg-neutral-100 pt-4">
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>

			<Sidebar.GroupContent>
				{#each navigationItems as eachNavigationItem (eachNavigationItem.title)}
					<Sidebar.MenuItem
						class="flex w-full items-center justify-start rounded-full hover:bg-white"
					>
						<Sidebar.MenuButton onclick={() => (isMobile ? sidebar.toggle() : null)}>
							{#snippet child({ props })}
								<a href={eachNavigationItem.url} {...props}>
									<eachNavigationItem.icon size={16} />
									<span>{eachNavigationItem.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if eachNavigationItem.badge > 0}
							<Sidebar.MenuBadge class="rounded-full bg-neutral-200 text-zinc-500"
								>{eachNavigationItem.badge}</Sidebar.MenuBadge
							>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupLabel>Development</Sidebar.GroupLabel>

			<!-- developmentItems -->

			<Sidebar.GroupContent>
				{#each developmentItems as eachDevelopmentItem (eachDevelopmentItem.title)}
					<Sidebar.MenuItem
						class="flex w-full items-center justify-start rounded-full hover:bg-white"
					>
						<Sidebar.MenuButton onclick={() => (isMobile ? sidebar.toggle() : null)}>
							{#snippet child({ props })}
								<a href={eachDevelopmentItem.url} {...props} target="_blank">
									<eachDevelopmentItem.icon size={16} />
									<span>{eachDevelopmentItem.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer class="rounded-bl-lg rounded-br-lg border-t bg-neutral-100">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
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
