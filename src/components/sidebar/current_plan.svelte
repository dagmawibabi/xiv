<script lang="ts">
	import { onMount } from 'svelte';
	import { getUserSubscription } from '$lib/utils/get_user_subscription';

	let customerPlan = $state('');

	onMount(async () => {
		customerPlan = await getUserSubscription();
	});
</script>

<div class="">
	{customerPlan}
</div>
