<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth_client';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index';
	import { Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	const features = [
		{
			criteria: 'Price',
			free: '$0',
			plus: '$15',
			pro: '$30'
		},
		{
			criteria: 'BYOK',
			free: 'Check',
			plus: 'Check',
			pro: 'Check'
		},
		{
			criteria: 'Bookmarks',
			free: 'Check',
			plus: 'Check',
			pro: 'Check'
		},
		{
			criteria: 'Basic Search',
			free: 'Check',
			plus: 'Check',
			pro: 'Check'
		},
		{
			criteria: 'Advanced Search',
			free: '—',
			plus: 'Check',
			pro: 'Check'
		},
		{
			criteria: 'Comments',
			free: '—',
			plus: 'Check',
			pro: 'Check'
		},
		{
			criteria: 'Global AI Chat',
			free: '—',
			plus: 'Check',
			pro: 'Check'
		},
		{
			criteria: 'Model Selection',
			free: 'Basic',
			plus: 'Wider',
			pro: 'Advanced'
		},
		{
			criteria: 'File Uploads per Research',
			free: '1',
			plus: 'Limited',
			pro: 'Unlimited'
		},
		{
			criteria: 'Selected Papers at Once',
			free: '5',
			plus: '30',
			pro: '50'
		},
		{
			criteria: 'References Per Each Query',
			free: '5',
			plus: '20',
			pro: '50'
		},
		{
			criteria: 'Watermark Free Export',
			free: '—',
			plus: '—',
			pro: 'Check'
		},
		{
			criteria: 'Research',
			free: 'Limited',
			plus: 'Unlimited',
			pro: 'Unlimited'
		},
		{
			criteria: 'Deep Research',
			free: '—',
			plus: '—',
			pro: 'Check'
		}
	];

	let { sessionExists = false } = $props();

	const packages = [
		{
			polarId: 'f44fbcbe-b2cc-48f4-acc8-ef6d888533a9',
			slug: 'free',
			name: 'Free',
			monthlyPrice: 0,
			yearlyPrice: 0,
			description: 'For trying out basic features',
			buttonText: 'Try ScholarXIV',
			featureDescription: 'Our free plan offers...',
			features: [
				'Limited Research',
				'Unlimited Bookmarks',
				'Basic Model Selection',
				'5 Selected Papers at Once',
				'5 References Per Each Query'
			],
			recommended: false
		},
		{
			polarId: 'fff68be3-0d9e-4013-b446-24f68bb3f6b3',
			slug: 'plus',
			name: 'Plus',
			monthlyPrice: 15,
			yearlyPrice: 180,
			description: 'For everyday research use',
			buttonText: 'Get Started',
			featureDescription: 'Everything in Free and...',
			features: [
				'Global AI Chat',
				'Advanced Search',
				'Unlimited Research',
				'Limited File Uploads',
				'Unlimited Comments',
				'Wider Model Selection',
				'30 Selected Papers at Once',
				'20 References Per Each Query'
			],
			recommended: true
		},
		{
			polarId: '134b3384-7ecf-4d15-b774-f2e16e2aecc2',
			slug: 'pro',
			name: 'Pro',
			monthlyPrice: 30,
			yearlyPrice: 360,
			description: 'For advanced researchers',
			buttonText: 'Get Started',
			featureDescription: 'Everything in Plus and...',
			features: [
				'Deep Research',
				'Unlimited File Uploads',
				'Advanced Models Selection',
				'50 References Per Each Query',
				'Unlimited Selected Papers at Once'
			],
			recommended: false
		}
	];

	let session = authClient.useSession();

	let currentPlan: any = $state(null);
	async function getCustomerPlan() {
		if ($session.data || sessionExists) {
			const result = await fetch('/api/get_subscription');
			const data = await result.json();
			currentPlan = data.planName;
		}
	}

	onMount(async () => {
		await getCustomerPlan();
	});

	const handleCheckout = async (slug: any) => {
		if ($session.data || sessionExists) {
			// const result = await fetch('/api/get_subscription');
			// const data = await result.json();

			if (currentPlan == null || currentPlan.toString().toLowerCase() !== slug) {
				// Checkout
				const abc = await authClient.checkout({
					slug: slug,
					fetchOptions: {
						onError: (error) => {
							console.log('abc', error);
						}
					}
				});
			}
		} else {
			// Sign In
			goto('/auth/sign_in');
		}
	};
</script>

<div id="pricing" class="pb-28 pt-10">
	<div class="pb-5 text-start text-2xl font-semibold md:text-center md:text-4xl">Pricing</div>
	<div class="mx-auto w-full pb-10 text-start md:w-3/4 md:text-center md:text-lg">
		We offer three packages: Free, Plus and Pro. Our free tier gives you unlimited access to the
		basic features but limited to no access to research features. The Plus package is great for
		everyday research with access to powerful research features. Our Pro plan is the best we offer
		giving you unlimited and powerful features across the board.
	</div>

	<div
		class="flex flex-col items-center justify-center gap-x-10 gap-y-10 pt-0 md:flex-row md:pt-12"
	>
		{#each packages as eachPackage}
			<div
				class="prose relative w-full rounded-2xl border-2 bg-white text-black drop-shadow-2xl hover:border-emerald-400 md:w-[30%]"
				class:border-black={eachPackage.recommended}
				class:border-purple-500={eachPackage.name == 'Pro'}
			>
				<!-- Recommended Tag -->
				{#if eachPackage.recommended}
					<div
						class="absolute -top-4 right-3 w-fit rounded-full border border-black bg-black px-4 py-2 text-xs font-semibold text-white md:text-sm"
					>
						Recommended
					</div>
				{/if}
				<!-- Package Header -->
				<div class="p-5">
					<div class="text-xl font-semibold text-black md:text-2xl">{eachPackage.name}</div>
					<div class="flex items-end">
						<div class="text-4xl font-bold text-black md:text-5xl">${eachPackage.monthlyPrice}</div>
						<div>/ month</div>
					</div>
					<div class="pt-2">{eachPackage.description}</div>
					<Button
						class="mt-6 w-full rounded-lg border "
						variant={eachPackage.name == 'Free' ? 'secondary' : 'default'}
						onclick={async () => await handleCheckout(eachPackage.slug)}
						>{currentPlan === eachPackage.name ? 'Current Plan' : eachPackage.buttonText}</Button
					>
					<!-- goto('/auth/sign_in') -->
				</div>
				<!-- Package Features -->
				<div class="border-t p-5">
					<div class="pb-2 text-sm">{eachPackage.featureDescription}</div>
					{#each eachPackage.features as eachFeature}
						<div class="flex items-center gap-x-2">
							<Check size={16} class="mt-1  text-black" />
							<div class="">{eachFeature}</div>
						</div>
					{/each}
				</div>
				<!-- Notice -->
				<div class="border-t p-5 text-xs text-muted-foreground md:text-sm">
					Additional usage limits apply depending on the model and provider.
				</div>
			</div>
		{/each}
	</div>

	<!-- Notice -->
	<div class="hidden md:block">
		<div class="hidden pb-5 pt-20 text-center md:block">Detailed Comparison of Plans</div>

		<Table.Root class="mx-auto">
			<Table.Header class="border-t bg-neutral-50">
				<Table.Row>
					<Table.Head class="w-1/5 text-left">Features</Table.Head>
					<Table.Head class="text-center font-semibold">Free</Table.Head>
					<Table.Head class="text-center font-semibold text-black">Plus</Table.Head>
					<Table.Head class="text-center font-semibold text-purple-700">Pro</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each features as eachFeature (eachFeature)}
					<Table.Row class="text-center hover:bg-emerald-50 hover:bg-opacity-50 ">
						<Table.Cell class="text-left font-semibold">{eachFeature.criteria}</Table.Cell>
						<Table.Cell>
							{#if eachFeature.free == 'Check'}
								<Check size={16} class="mx-auto" />
							{:else}
								{eachFeature.free}
							{/if}
						</Table.Cell>
						<Table.Cell>
							{#if eachFeature.plus == 'Check'}
								<Check size={16} class="mx-auto" />
							{:else}
								{eachFeature.plus}
							{/if}
						</Table.Cell>
						<Table.Cell>
							{#if eachFeature.pro == 'Check'}
								<Check size={16} class="mx-auto" />
							{:else}
								{eachFeature.pro}
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
				<Table.Row class="text-center hover:bg-emerald-50 hover:bg-opacity-50">
					<Table.Cell class="text-left font-semibold"></Table.Cell>
					<Table.Cell>
						<Button
							variant="secondary"
							class="border"
							onclick={async () => await handleCheckout('free')}
						>
							{currentPlan === 'Free' ? 'Current Plan' : 'Free for Everyone'}</Button
						>
					</Table.Cell>
					<Table.Cell>
						<Button onclick={async () => await handleCheckout('plus')}
							>{currentPlan === 'Plus' ? 'Current Plan' : 'Get Plus Now'}</Button
						>
					</Table.Cell>
					<Table.Cell>
						<Button
							class="border-2 border-purple-500"
							onclick={async () => await handleCheckout('pro')}
							>{currentPlan === 'Pro' ? 'Current Plan' : 'Get Pro Now'}</Button
						>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
			<Table.Footer>
				<Table.Row>
					<Table.Cell colspan={4} class="py-5 text-center text-muted-foreground"></Table.Cell>
				</Table.Row>
			</Table.Footer>
		</Table.Root>
	</div>
</div>
