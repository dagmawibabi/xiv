<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	// import Header from './header.svelte';
	import ProfileAvatar from '../profile_avatar.svelte';
	import {
		HouseIcon,
		Heart,
		Bookmark,
		LogOut,
		SearchIcon,
		Bolt,
		CircleDot,
		Trash2,
		CircleX
	} from 'lucide-svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';

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

	function unselectPaper(paper: any) {
		aiConversationState.selectedPapersList = aiConversationState.selectedPapersList.filter(
			(eachPaper) => eachPaper.extractedID != paper.extractedID
		);
		aiConversationState.selectedPapersIDList = aiConversationState.selectedPapersIDList.filter(
			(eachPaperID) => eachPaperID != paper.extractedID
		);
	}
</script>

<!-- <Sidebar.Root> -->
<Sidebar.Root
	variant={aiConversationState.selectedPapersList.length > 0 ? 'floating' : 'inset'}
	collapsible="icon"
	side="right"
>
	<!-- <Sidebar.Header>
		<Header />
	</Sidebar.Header> -->
	{#if aiConversationState.selectedPapersList.length > 0}
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel class="flex w-full items-center justify-between">
					<span class="font-lg font-semibold">Selected Papers</span>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="cursor-pointertext-zinc-500 hover:bg-zinc-100 hover:text-red-500"
						onclick={() => {
							aiConversationState.selectedPapersList = [];
							aiConversationState.selectedPapersIDList = [];
						}}
					>
						<Trash2 size={14} />
					</div>
				</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each aiConversationState.selectedPapersList as eachSelectedPaper}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton class="px-0 py-6 backdrop-blur-xl">
									<div
										class="flex w-full cursor-default items-center overflow-clip rounded-sm border border-t hover:border-black hover:bg-white"
									>
										<div class="line-clamp-2 w-full px-2 py-1 text-xs">
											<span> {eachSelectedPaper['title']} </span>
										</div>
										<!-- svelte-ignore a11y_click_events_have_key_events -->
										<!-- svelte-ignore a11y_no_static_element_interactions -->
										<div
											class="flex w-10 cursor-pointer items-center border-l px-3 py-3 text-zinc-500 hover:bg-zinc-100 hover:text-red-500"
											onclick={() => unselectPaper(eachSelectedPaper)}
										>
											<CircleX size={15} />
										</div>
									</div>
									<!-- <item.icon size={18} />
								<span class="text-base">{item}</span> -->
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Rail />
	{/if}
</Sidebar.Root>
