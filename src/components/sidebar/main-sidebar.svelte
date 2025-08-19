<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	// import Header from './header.svelte';
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
		// {
		// 	title: 'Search',
		// 	url: '#',
		// 	icon: SearchIcon
		// },
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
		{
			title: 'Settings',
			url: '#',
			icon: Bolt
		}
	];

	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';
	const session = authClient.useSession();
</script>

<!-- <Sidebar.Root> -->
<Sidebar.Root variant="floating" collapsible="icon">
	<!-- <Sidebar.Header>
		<Header />
	</Sidebar.Header> -->

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel></Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
					<!-- Logout -->
					<Sidebar.MenuItem>
						<div class="group/logout">
							<Sidebar.MenuButton>
								<LogOut class="group-hover/logout:text-red-500" />
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div
									class="cursor-pointer text-center group-hover/logout:text-red-500"
									onclick={() => handleSignOut()}
								>
									Logout
								</div>
							</Sidebar.MenuButton>
						</div>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				{#if $session.data}
					<ProfileAvatar session={$session} fullInfo={true} />
				{/if}
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
