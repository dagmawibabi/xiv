<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import Header from '../../components/sidebar/header.svelte';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import { Mail, Twitter } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let { showHeader = true, showDropdownOptions = true } = $props();

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
</script>

<div
	class="sticky top-0 z-50 hidden flex-col items-start justify-between rounded-bl-lg rounded-br-lg bg-white px-3 py-3 md:flex md:flex-row"
>
	<!-- Logo -->
	{#if showHeader}
		<Header />
	{/if}

	<!-- Items -->
	<div class="flex flex-col items-start md:flex-row">
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

		<div class="flex justify-center">
			{#if showDropdownOptions}
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
			{/if}
		</div>
	</div>

	<!-- Auth -->
	<Button class="hidden font-semibold md:flex" onclick={() => goto('/auth/sign_in')}
		>Start Researching</Button
	>
</div>
