<script lang="ts">
	import { hasOptions } from '$lib/utils/form-utils';
	import FormElement from '$lib/custom_components/ui/grant-admin/grant-builder/FormElement.svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n/i18n';
	import { toShort } from '$lib/utils/url';

	export let data: PageData;

	const form = data.form;
	const fields =
		form && form.fields
			? form.fields.sort((i: { index: number }, j: { index: number }) => i.index - j.index)
			: null;
</script>

<svelte:head>
	<title>{"View form"}</title>
</svelte:head>

{#if form}
	<container class="container flex w-screen flex-col space-y-5 items-center my-20">
		<FormElement type="header" allowHover={false}>
			<h1 class="font-bold">{form.name}</h1>
			<p class="text-muted-foreground">{form.description}</p>
		</FormElement>
		{#if fields}
			{#each fields as field}
				<div class="py-2" />
				<FormElement type="field" allowHover={false}>
					<h1 class="font-bold">{field.prompt}</h1>
					{#if hasOptions(field.type)}
						<h1 class="font-bold pt-5">{$t('form.options')}</h1>
						{#each field.options as option}
							<p class="text-muted-foreground">{option}</p>
						{/each}
					{/if}
				</FormElement>
			{/each}
		{/if}
		<div class="flex flex-row w-full h-full justify-items-start">
			<Button variant="outline" href={`/grant-admin/form-builder/${toShort(form.id)}/edit`}
				>{$t('form.editButton')}</Button
			>
		</div>
	</container>
{/if}
