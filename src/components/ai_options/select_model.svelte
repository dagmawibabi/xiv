<script lang="ts">
	import { ChevronDown, RefreshCcw, RefreshCcwIcon, RotateCcw } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { modelsState } from '../../state/models_state.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		await modelsState.getAllModels();
	});
</script>

<div class="flex items-center gap-x-1">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<div
				class="group/models flex items-center gap-x-1 rounded-full border border-zinc-100 bg-neutral-100 py-1 pl-3 pr-2 hover:border-zinc-200"
			>
				<span class="hidden text-xs text-zinc-500 group-hover/models:text-black md:flex"
					>{modelsState.currentModelID}</span
				>
				<span class="flex text-xs text-zinc-500 group-hover/models:text-black md:hidden"
					>{modelsState.currentModelName}</span
				>
				<ChevronDown size={16} class="text-zinc-500 group-hover/models:text-black" />
			</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="h-80 w-72 overflow-scroll">
			<DropdownMenu.Group>
				<DropdownMenu.Label>
					<div class="flex items-center justify-between gap-x-2">
						Choose a Model
						<RefreshCcw
							class="cursor-pointer"
							size={16}
							onclick={() => modelsState.getAllModels()}
						/>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				{#each modelsState.allModels as model, i}
					<DropdownMenu.Item
						class="text-xs"
						onclick={() => modelsState.setModel(model.id, model.name)}
					>
						<span class="text-sm">{model.name}</span>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	{#if modelsState.currentModelID != modelsState.defaultModelID}
		<RotateCcw
			size={15}
			class="hidden text-zinc-400 hover:text-black md:flex"
			onclick={() => (modelsState.currentModelID = modelsState.defaultModelID)}
		/>
	{/if}
</div>
