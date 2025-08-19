<!-- <script>
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import { DropdownMenu } from 'bits-ui';
	import { ChevronUp } from 'lucide-svelte';
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						Username
						<ChevronUp class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content side="top" class="w-(--bits-dropdown-menu-anchor-width)">
				<DropdownMenu.Item>
					<span>Account</span>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<span>Billing</span>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<span>Sign out</span>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu> -->
