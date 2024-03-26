<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import { t, locale, locales } from "../../../../i18n/i18n";
	import * as Select from "$lib/components/ui/select/index.js";
	import type { Selected } from 'bits-ui';


	const navButtons = {
		Overview: '/grant-admin',
		Grants: '/grant-admin/grants',
		'Grant Builder': '/grant-admin/grant-builder',
		Analytics: '/grant-admin/analytics'
	};


	let selected: Selected<string>;
	$: if (selected && selected.value) $locale = selected.value;

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

<div class="w-full"/>

<LocaleSelection />

