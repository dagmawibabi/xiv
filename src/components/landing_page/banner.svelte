<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Atom, CircleDot, Dot, LibraryBig, User } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { DoubleBounce, Jumper, Pulse, ScaleOut } from 'svelte-loading-spinners';

	let { userCount, paperCount } = $props();
	const formatter = new Intl.NumberFormat('en-US');
</script>

<div class="flex flex-col items-center justify-center pb-10 pt-20 md:pb-12 md:pt-36">
	<!-- Header Text -->
	<div class="flex flex-col justify-center gap-y-5 md:items-center">
		<!-- Tagline -->
		<div
			class="flex w-fit items-center gap-x-1 rounded-full bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800 md:justify-center"
		>
			<Atom size={14} />
			Research for everyday & everyone
		</div>
		<div class="text-2xl font-semibold md:text-5xl">Next-gen Research Platform</div>
		<div class="w-full text-start text-lg md:w-3/5 md:text-center md:text-xl">
			<div>
				Get research backed responses to your queries, like and bookmark papers for later, discuss
				about papers, start your own research — and so much more
			</div>
			<div></div>
		</div>
	</div>

	<!-- Stats -->
	<div class="flex w-full flex-col items-start gap-x-2 pt-3 md:items-center">
		<div class="flex items-center gap-x-2 rounded-full py-1 text-sm md:px-3">
			<DoubleBounce size={10} color="lime" />
			<div>
				<span class="font-semibold"> {formatter.format(userCount)} </span>
				<span class="text-zinc-500"> Researchers </span>
				<span class="font-semibold"> • {formatter.format(paperCount)} </span>
				<span class="text-zinc-500"> Papers Indexed </span>
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="flex w-full items-center justify-start gap-x-2 pt-14 md:justify-center">
		<Button class="px-10 font-semibold" onclick={() => goto('/auth/sign_in')}
			>Start Exploring</Button
		>
		<Button variant="secondary" class="border">View Demo</Button>
	</div>
</div>
