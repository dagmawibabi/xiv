export async function load({ fetch }) {
	const res = await fetch('/api/stats');
	const data = await res.json();

	return { data };
}
