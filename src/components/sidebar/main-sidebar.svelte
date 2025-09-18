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
		ScrollText,
		CircleFadingArrowUp,
		WalletCards
	} from 'lucide-svelte';

	// Navigation Items.
	const navigationItems = [
		{
			title: 'Home',
			url: '/homepage',
			icon: HouseIcon,
			badge: false
		},
		{
			title: 'Research',
			url: '/research',
			icon: CircleDot,
			badge: false
		},
		{
			title: 'Bookmarks',
			url: '/bookmarks_page',
			icon: Bookmark,
			badge: true
		},
		{
			title: 'Liked Papers',
			url: '/liked_papers_page',
			icon: Heart,
			badge: true
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
	import Button from '$lib/components/ui/button/button.svelte';
	import CurrentPlan from './current_plan.svelte';
	import BookmarkBadge from './bookmark_badge.svelte';
	import LikedPapersBadge from './liked_papers_badge.svelte';
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
						{#if eachNavigationItem.badge}
							<Sidebar.MenuBadge>
								{#if eachNavigationItem.title == 'Bookmarks'}
									<BookmarkBadge />
								{:else if eachNavigationItem.title == 'Liked Papers'}
									<LikedPapersBadge />
								{/if}
							</Sidebar.MenuBadge>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<!-- developmentItems -->
		<Sidebar.Group>
			<Sidebar.GroupLabel>Development</Sidebar.GroupLabel>
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

		<!-- Upgrade Plan -->
		<Sidebar.Group>
			<Sidebar.GroupLabel>
				Subscription: &nbsp; <CurrentPlan />
			</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.MenuItem class="flex rounded-full hover:bg-white">
					<Sidebar.MenuButton onclick={() => (isMobile ? sidebar.toggle() : null)}>
						{#snippet child({ props })}
							<a href="/landing#pricing" {...props}>
								<CircleFadingArrowUp size={16} />
								<span>Upgrade Plan</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem
					class="flex w-full cursor-pointer items-center justify-start rounded-full hover:bg-white "
				>
					<Sidebar.MenuButton onclick={async () => await authClient.customer.portal()}>
						{#snippet child({ props })}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div {...props}>
								<WalletCards size={16} />
								<span>Customer Portal</span>
							</div>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer class="rounded-bl-lg rounded-br-lg  border-t bg-neutral-100 p-0">
		<!-- Profile -->
		<Sidebar.Menu>
			<Sidebar.MenuItem class="py-2">
				<Sidebar.MenuButton class="h-full">
					{#if sidebar.state == 'expanded'}
						<ProfileAvatar />
					{:else}
						<div class="px-2">
							<LogoutButton />
						</div>
					{/if}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
