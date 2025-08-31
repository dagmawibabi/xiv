<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import Header from '../../components/sidebar/header.svelte';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';

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
		// {
		// 	label: 'Feedback',
		// 	link: '#feedback'
		// },
		// {
		// 	label: 'Roadmap',
		// 	link: '#roadmap'
		// },
		{
			label: 'Contact',
			link: '#contact'
		}
	];
</script>

<div class="flex items-center justify-between">
	<!-- Logo -->
	<Header />

	<!-- Items -->
	<div class="flex items-center justify-center gap-x-4">
		{#each navItems as item}
			<!-- <NavigationMenu.Item>
				<NavigationMenu.Link>
					{#snippet child()}
						<a href={item.link} class={navigationMenuTriggerStyle()}>{item.label}</a>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item> -->
			<a href={item.link} class="cursor-pointer underline-offset-8 hover:underline">{item.label}</a>
		{/each}
		<!-- <NavigationMenu.Root>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Development</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<NavigationMenu.Link>Link</NavigationMenu.Link>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root> -->
	</div>

	<!-- Auth -->
	<Button>Start Researching</Button>
</div>
