<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import { locale } from '../../../../i18n/i18n';
	import type { Selected } from 'bits-ui';
	import ColourSelection from '../../colour-selection/Colour-Selection.svelte';

	export let colourClass: string;

	const navButtons = {
		Overview: '/grant-admin',
		Grants: '/grant-admin/grants',
		Applications: '/grant-admin/applications',
		'Form Builder': '/grant-admin/form-builder',
		Users: '/grant-admin/users'
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

<div class="w-full" />

<LocaleSelection />
<ColourSelection bind:colourClass />

