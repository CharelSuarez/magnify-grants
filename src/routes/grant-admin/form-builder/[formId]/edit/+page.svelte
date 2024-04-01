<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Loader2 } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { updateFlash } from 'sveltekit-flash-message';
	import { goto } from '$app/navigation';
	import EditableForm from '$lib/custom_components/ui/grant-admin/grant-builder/EditableForm.svelte';
	import type { PageData } from './$types';
	import { t } from '$lib/i18n/i18n';

	let errors: { [key: string | number]: { field: string; message: string } } = {};

	const editForm = async () => {
		isLoading = true;
		const res = await fetch('/grant-admin/form-builder/submit/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: form.id,
				name: formName,
				description: formDescription,
				fields: fields
			})
		});

		isLoading = false;

		if (res.status === 400) {
			errors = (await res.json()).errors;
		}

		if (res.status === 200 && res.redirected) {
			await updateFlash(page, () => goto(res.url, { invalidateAll: true }));
		}
	};

	let isLoading = false;

	export let data: PageData;

	const form = data.form;

	let formName = form.name;
	let formDescription = form.description;
	let fields = form && form.fields ? form.fields.sort((i, j) => i.index - j.index) : [];
</script>

<svelte:window on:beforeunload|preventDefault />
<svelte:head>
	<title>
		{$t('form.editButton')} - {formName}
	</title>
</svelte:head>

<EditableForm bind:fields bind:formDescription bind:formName {errors}>
	<Button disabled={isLoading} on:click={editForm} variant="outline">
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		{$t('form.saveButton')}
	</Button>
</EditableForm>
