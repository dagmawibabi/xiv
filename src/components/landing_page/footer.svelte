<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index';
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

<div class="flex flex-col items-center justify-center pb-5 pt-36 md:flex-row">
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
</div>
