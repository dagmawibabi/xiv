<script lang="ts">
	import { Carta, Markdown } from 'carta-md';
	import { math } from '@cartamd/plugin-math';
	import { code } from '@cartamd/plugin-code';
	import DOMPurify from 'isomorphic-dompurify';
	import 'katex/dist/katex.css';
	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		extensions: [
			math(),
			code({
				theme: 'ayu-light'
			})
		]
	});

	let { content } = $props();
</script>

<Markdown {carta} value={content} />
