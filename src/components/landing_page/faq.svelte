<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index';

	const faq = [
		{
			question: 'Is it Open-Source?',
			answer:
				"No it's not. But we offer an open-source mobile app that has the very basic version.",
			link: 'https://github.com/dagmawibabi/ScholarXIV'
		},
		{
			question: 'Can I upload my own research files?',
			answer:
				'Yes. File uploads are available starting from the Plus plan (limited) and unlimited in the Pro plan.'
		},
		{
			question: "What about models that don't support tool calls?",
			answer:
				"You can use any model you like even those that don't support tool calls because we use gpt-oss-20b as a fallback for these models."
		},
		{
			question: 'Can I remove the watermark from research exports?',
			answer: 'Yes if you are on our Pro plan.'
		},
		{
			question: 'What tech, tools and framework are you using?',
			answer:
				'ScholarXIV is built using SvelteKit. All AI related feature use AI SDK v5 and auth is powered by Better Auth.'
		},
		{
			question: 'What AI provider are you using?',
			answer: "ScholarXIV uses Vercel's AI Gateway",
			link: 'https://vercel.com/docs/ai-gateway'
		}
	];
</script>

<div id="faq" class="pb-28 md:pt-20">
	<div class="pb-5 text-start text-2xl font-semibold md:text-center md:text-4xl">FAQ</div>
	<div class="mx-auto w-full pb-10 text-start md:w-3/4 md:text-center md:text-lg">
		Everything you need to know about the product and billing
	</div>

	<div class="mx-auto w-full gap-x-10 md:w-2/3 md:pt-12">
		<Accordion.Root type="multiple">
			{#each faq as eachFaq, index}
				<Accordion.Item value={index.toString()}>
					<Accordion.Trigger class="text-start font-semibold">
						{eachFaq.question}
					</Accordion.Trigger>
					<Accordion.Content>
						{eachFaq.answer}
						<a
							href={eachFaq.link}
							target="_blank"
							class="underline underline-offset-4 hover:text-blue-500">{eachFaq.link}</a
						>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</div>
