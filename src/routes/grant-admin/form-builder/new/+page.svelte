<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { FieldType } from '@prisma/client';
	import { Loader2 } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { updateFlash } from 'sveltekit-flash-message';
	import { goto } from '$app/navigation';
	import EditableForm from '$lib/custom_components/ui/grant-admin/grant-builder/EditableForm.svelte';
	import { t } from '$lib/i18n/i18n';

	let errors: { [key: string | number]: { field: string; message: string } } = {};

	let formName = '';
	let formDescription = '';

	const submitForm = async () => {
		isLoading = true;
		const res = await fetch('/grant-admin/form-builder/submit/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
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

	let fields: { type: FieldType; index: number; prompt?: string; options: string[] }[] = [];
</script>

<svelte:head>
	<title>New Form Builder</title>
</svelte:head>

<svelte:window on:beforeunload|preventDefault />

<EditableForm bind:fields bind:formDescription bind:formName {errors}>
	<Button disabled={isLoading} on:click={submitForm} variant="outline">
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		{$t('form.createButton')}
	</Button>
</EditableForm>
