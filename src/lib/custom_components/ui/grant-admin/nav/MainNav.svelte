<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';

	const navButtons = {
		Overview: '/grant-admin',
		Grants: '/grant-admin/grants',
		'Grant Builder': '/grant-admin/grant-builder',
		Analytics: '/grant-admin/analytics'
	};
</script>

{#each Object.entries(navButtons) as [label, href]}
	<Button
		variant={$page.url.pathname === href ? 'secondary' : 'ghost'}
		{href}
		class="font-semibold"
	>
		{label}
	</Button>
{/each}
