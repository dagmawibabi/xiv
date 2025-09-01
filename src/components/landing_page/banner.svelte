<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Atom, Microscope } from 'lucide-svelte';
	import logo from '$lib/assets/logo/logo.png';
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col items-center justify-center gap-y-10 pb-28 pt-40">
	<!-- Header Text -->
	<div class="flex flex-col items-center justify-center gap-y-5">
		<div
			class="flex items-center justify-center gap-x-1 rounded-full bg-neutral-100 px-3 py-1 text-sm"
		>
			<Atom size={14} />
			<!-- <img src={logo} alt=" " class="h-6 w-6" /> -->
			Research for everyday & everyone
		</div>
		<div class="text-5xl font-semibold">Next-gen Research Platform</div>
		<div class="w-3/5 text-center text-xl">
			<div>
				Get research backed responses to your queries, like and bookmark papers for later, discuss
				about papers, start your own research — and so much more
			</div>
			<div></div>
		</div>
	</div>

	<!-- CTA -->
	<div class="flex gap-x-2">
		<Button class="px-10 font-semibold" onclick={() => goto('/auth/sign_in')}
			>Start Exploring</Button
		>
		<Button variant="secondary" class="border">View Demo</Button>
	</div>
</div>
