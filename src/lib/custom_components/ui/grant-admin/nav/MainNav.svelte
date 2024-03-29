<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import { locale, t } from '$lib/i18n/i18n';
	import type { Selected } from 'bits-ui';
	import ColourSelection from '../../colour-selection/Colour-Selection.svelte';
	import UsersRound from 'lucide-svelte/icons/users-round';
	import { t } from '$lib/i18n/i18n';

	const navButtons = {
		'admin.nav.overview': '/grant-admin',
		'admin.nav.grants': '/grant-admin/grants',
		'admin.nav.applications': '/grant-admin/applications',
		'admin.nav.formbuilder': '/grant-admin/form-builder',
		'admin.nav.users': '/grant-admin/users'
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
		{$t(label)}
	</Button>
{/each}

<div class="w-full" />

<Button variant='outline' class="gap-2" href="/">
	<UsersRound class="h-5 w-5"></UsersRound>
	<span>{$t('nav.view.userDashboard')}</span>
</Button>
<LocaleSelection />
<ColourSelection />
