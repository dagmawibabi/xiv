<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	// import Header from './header.svelte';
	import ProfileAvatar from '../profile_avatar/profile_avatar.svelte';
	import {
		HouseIcon,
		Heart,
		Bookmark,
		LogOut,
		SearchIcon,
		Bolt,
		CircleDot,
		Trash2,
		CircleX,
		LibraryBig,
		Library,
		ListX,
		CircleMinus,
		ListMinus,
		ChevronDown,
		CircleCheck
	} from 'lucide-svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	const sidebar = useSidebar();
	import { researchState } from '../../state/research_state.svelte';
	import MarkdownRender from '../markdown_render.svelte';
	import * as Popover from '$lib/components/ui/popover/index';
	import EachPaper from '../each_paper/each_paper.svelte';
	import { Collapsible } from 'bits-ui';
	import { goto } from '$app/navigation';
	import SelectPapersTutorial from '../tutorials/select_papers_tutorial.svelte';
	import ReferencedPapersTutorial from '../tutorials/referenced_papers_tutorial.svelte';
	import { onMount } from 'svelte';

	function unselectPaper(paper: any) {
		aiConversationState.selectedPapersList = aiConversationState.selectedPapersList.filter(
			(eachPaper) => eachPaper.extractedID != paper.extractedID
		);
		aiConversationState.selectedPapersIDList = aiConversationState.selectedPapersIDList.filter(
			(eachPaperID) => eachPaperID != paper.extractedID
		);
	}
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

{#if !isMobile}
	<Sidebar.Root
		variant={aiConversationState.selectedPapersList.length > 0 ||
		researchState.references.length > 0
			? 'floating'
			: 'inset'}
		collapsible="icon"
		side="right"
		class="hidden"
	>
		<Sidebar.Content class="no-scrollbar rounded-lg bg-neutral-100">
			<!-- References -->
			<Collapsible.Root open class="group/collapsible">
				<Sidebar.Group>
					<Sidebar.GroupLabel>
						{#snippet child({ props })}
							<Collapsible.Trigger {...props}>
								<div class="font-lg flex items-center gap-x-2 font-semibold">
									<span> Referenced Papers </span>
									{#if researchState.references.length > 0}
										<div class="rounded-full bg-neutral-200 p-1 px-2 text-neutral-600">
											{researchState.references.length > 0
												? `${researchState.references.length}`
												: ''}
										</div>
									{/if}
								</div>
								<!-- <ChevronDown
										class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
									/> -->
							</Collapsible.Trigger>
						{/snippet}
					</Sidebar.GroupLabel>
					<Sidebar.GroupAction
						title="Clear References"
						onclick={() => (researchState.references = [])}
					>
						<ListX size={14} />
					</Sidebar.GroupAction>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu class="py-0">
								{#each researchState.references as eachReference}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton class="h-fit w-full px-0 py-0">
											{#if sidebar.state == 'collapsed'}
												<Popover.Root>
													<Popover.Trigger>
														<Library
															size={15}
															class={aiConversationState.selectedPapersIDList.includes(
																eachReference.extractedID
															)
																? 'text-emerald-500'
																: 'text-zinc-400'}
														/>
													</Popover.Trigger>
													<Popover.Content
														class="min-w-fit border-none bg-transparent p-0 outline-none"
													>
														<EachPaper paper={eachReference} />
													</Popover.Content>
												</Popover.Root>
											{/if}
											<Popover.Root>
												<Popover.Trigger class="w-full">
													<div
														class={aiConversationState.selectedPapersIDList.includes(
															eachReference.extractedID
														)
															? 'flex w-full cursor-pointer items-center overflow-clip rounded-lg border border-emerald-400 bg-emerald-50 px-2 py-1 text-left text-xs text-black '
															: 'flex w-full cursor-pointer items-center overflow-clip rounded-lg border border-zinc-300 bg-white px-2 py-1 text-left text-xs hover:border-zinc-500'}
													>
														<div class="line-clamp-2 w-full">
															<MarkdownRender content={eachReference['title']} />
														</div>
													</div>
												</Popover.Trigger>
												<Popover.Content
													class="mr-10 min-w-fit border-none bg-transparent p-0 outline-none"
												>
													<EachPaper paper={eachReference} />
												</Popover.Content>
											</Popover.Root>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
								{#if researchState.references.length == 0}
									<ReferencedPapersTutorial />
								{/if}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>

			<!-- Selected Papers -->
			<Collapsible.Root open class="group/collapsible">
				<Sidebar.Group>
					<Sidebar.GroupLabel>
						{#snippet child({ props })}
							<Collapsible.Trigger {...props}>
								<div class="font-lg flex items-center gap-x-2 font-semibold">
									<span> Selected Papers </span>
									{#if aiConversationState.selectedPapersList.length > 0}
										<div class="rounded-full bg-neutral-200 p-1 px-2 text-neutral-600">
											{aiConversationState.selectedPapersList.length > 0
												? `${aiConversationState.selectedPapersList.length}`
												: ''}
										</div>
									{/if}
								</div>
							</Collapsible.Trigger>
						{/snippet}
					</Sidebar.GroupLabel>
					<Sidebar.GroupAction
						title="Clear Selected"
						onclick={() => {
							aiConversationState.selectedPapersList = [];
							aiConversationState.selectedPapersIDList = [];
						}}
					>
						<ListMinus size={14} />
					</Sidebar.GroupAction>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each aiConversationState.selectedPapersList as eachSelectedPaper}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton class="h-fit px-0 py-0">
											{#if sidebar.state == 'collapsed'}
												<CircleCheck
													size={15}
													class={aiConversationState.selectedPapersIDList.includes(
														eachSelectedPaper.extractedID
													)
														? 'text-emerald-500'
														: 'text-zinc-400'}
												/>
											{/if}

											<Popover.Root>
												<Popover.Trigger class="w-full">
													<div
														class="flex w-full cursor-default items-center overflow-clip rounded-lg border border-t border-emerald-400 bg-emerald-50 text-start hover:border-black"
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
												</Popover.Trigger>
												<Popover.Content
													class="mr-10 min-w-fit border-none bg-transparent p-0 outline-none"
												>
													<EachPaper paper={eachSelectedPaper} />
												</Popover.Content>
											</Popover.Root>
											<!-- <item.icon size={18} />
								<span class="text-base">{item}</span> -->
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
								<SelectPapersTutorial />
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>
		</Sidebar.Content>
		<Sidebar.Rail />
	</Sidebar.Root>
{/if}
