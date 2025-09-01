<script>
	import Header from '../sidebar/header.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import { Menu } from 'lucide-svelte';
	import { Mail, Twitter } from 'lucide-svelte';

	const navItems = [
		{
			label: 'Features',
			link: '#features'
		},
		{
			label: 'Research',
			link: '#research'
		},
		{
			label: 'Pricing',
			link: '#pricing'
		},
		{
			label: 'FAQ',
			link: '#faq'
		}
	];

	const devNavItems = [
		{
			label: 'Feedback',
			description: 'Feature requests and bug reports',
			link: 'https://scholarxiv.featurebase.app/'
		},
		{
			label: 'Roadmap',
			description: "Checkout what's coming up",
			link: 'https://scholarxiv.featurebase.app/roadmap'
		},
		{
			label: 'Changelogs',
			description: "Read all the changes we've made",
			link: 'https://scholarxiv.featurebase.app/changelog'
		}
	];

	let showMenu = $state(false);
</script>

<div class="absolute left-0 right-0 top-0">
	<div
		class="sticky left-0 right-0 top-0 z-50 block bg-white bg-opacity-50 py-2 pl-2 pr-4 backdrop-blur-3xl md:hidden"
	>
		<div class="flex items-center justify-between">
			<Header />
			<Menu size={20} onclick={() => (showMenu = !showMenu)} />
		</div>

		<div>
			{#if showMenu}
				<div class="flex flex-col items-start">
					<!-- Basic Navs -->
					<NavigationMenu.Root>
						<NavigationMenu.List>
							{#each navItems as item}
								<NavigationMenu.Item>
									<NavigationMenu.Link>
										{#snippet child()}
											<a href={item.link} class={navigationMenuTriggerStyle()}>{item.label}</a>
										{/snippet}
									</NavigationMenu.Link>
								</NavigationMenu.Item>
								<!-- <a href={item.link} class="cursor-pointer underline-offset-8 hover:underline">{item.label}</a> -->
							{/each}
						</NavigationMenu.List>
					</NavigationMenu.Root>

					<div class="flex justify-center gap-x-1 pt-1">
						<!-- Developement Nav -->
						<NavigationMenu.Root>
							<NavigationMenu.List>
								<NavigationMenu.Item>
									<NavigationMenu.Trigger>Development</NavigationMenu.Trigger>
									<NavigationMenu.Content>
										<ul class="grid w-[250px] gap-4 p-2">
											<li>
												{#each devNavItems as item}
													<NavigationMenu.Link href={item.link} target="_blank">
														<div class="font-medium">{item.label}</div>
														<div class="text-sm text-muted-foreground">{item.description}</div>
													</NavigationMenu.Link>
												{/each}
											</li>
										</ul>
									</NavigationMenu.Content>
								</NavigationMenu.Item>
							</NavigationMenu.List>
						</NavigationMenu.Root>

						<!-- Contact Nav -->
						<NavigationMenu.Root>
							<NavigationMenu.List>
								<NavigationMenu.Item>
									<NavigationMenu.Trigger>Contact</NavigationMenu.Trigger>
									<NavigationMenu.Content>
										<ul class="grid w-[120px] gap-4 p-2">
											<li>
												<NavigationMenu.Link
													href="https://x.com/dagmawibabi"
													target="_blank"
													class="flex-row items-center gap-2"
												>
													<Twitter />
													Twitter
												</NavigationMenu.Link>

												<NavigationMenu.Link
													href="mailto:1babidagi@gmail.com"
													target="_blank"
													class="flex-row items-center gap-2"
												>
													<Mail />
													Email
												</NavigationMenu.Link>
											</li>
										</ul>
									</NavigationMenu.Content>
								</NavigationMenu.Item>
							</NavigationMenu.List>
						</NavigationMenu.Root>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
