<script lang="ts">
	import GrantTable from './application-table/AppTable.svelte';
	import GrantTableFilter from './ApplicationFilter.svelte';
	import type { PageData, ActionData } from './$types';
	import { writable, type Writable } from 'svelte/store';
	import type { Application } from '$lib/validation/app_schema';
	import { t } from '$lib/i18n/i18n';

	export let data: PageData;
	export let form: ActionData;

	const applications: Writable<Application[]> = writable(data.applications);
	const updateApplications = (form: ActionData) => {
		if (form == null || form.applications == null) return;
		$applications = form.applications;
	};

	$: updateApplications(form);
</script>

<svelte:head>
	<title>{$t('admin.applications.grant_applications')}</title>
</svelte:head>

<div class="h-full flex-1 flex-col space-y-8 p-8 flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">
				{$t('admin.applications.grant_applications')}
			</h2>
			<p class="text-muted-foreground">
				{$t('admin.applications.view_filter_action_applications')}
			</p>
		</div>
	</div>
	<div
		class="flex items-center md:items-start flex-col md:flex-row md:flex-1 justify-between h-full w-full gap-10"
	>
		<GrantTable {applications} class="w-4/5" />
		<div class="flex md:hidden w-full flex-grow" />
		<GrantTableFilter class="h-min items-center" data={data.filter} grants={data.grants} />
	</div>
</div>
