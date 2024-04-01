<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toShort } from '$lib/utils/url';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import CircleAlert from 'lucide-svelte/icons/alert-circle';
	import GrantForm from './GrantForm.svelte';
	import { t } from '$lib/i18n/i18n';
	import DownloadableForm from './DownloadableForm.svelte';
	import RequiredDocumentation from './RequiredDocumentation.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formDocSchema } from '$lib/validation/app_schema';
	import { Loader2 } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';

	export let data: PageData;

	const isComplete = () => {
		if ($formData.documents) {
			const formDocIds = $formData.documents.map((v) => v.id);

			for (const doc of data.grant.requiredDocuments) {
				if (!formDocIds.includes(doc.id)) {
					return false;
				}
			}
		}
		for (const form of data.forms) {
			if (!form.application || !form.application.complete) {
				return false;
			}
		}

		return true;
	};

	let isLoading = false;

	const form = superForm(data.form, {
		validators: zodClient(formDocSchema),
		dataType: 'json',
		onSubmit: () => (isLoading = true),
		onResult: ({ result }) => {
			setTimeout(() => (isLoading = false), 1000);
			if (result.status === 200) {
				getFlash(page);
				submitted = true;
			}
		}
	});

	const addFile = (e: { detail: { file: File } }, id: string) => {
		$formData.documents = [
			...$formData.documents,
			{
				file: e.detail.file,
				id
			}
		];
	};

	const { form: formData, enhance } = form;

	let disabled = true;

	$: $formData, (disabled = !isComplete());

	let submitted = data.submitted;
</script>

<svelte:head>
	<title>{data.grant.title}</title>
</svelte:head>

<div class="min-h-full flex-1 flex-col p-20 pt-0 pb-5 md:flex items-center">
	<div class="container flex justify-start h-full items-start space-y-2 gap-10 mt-8 mb-8">
		{#if data.banner}
			<Card.Root class="basis-1/4">
				<Card.Content class={'h-60 w-96 p-0 rounded-inherit'}>
					<img
						class={'h-full w-full object-cover transition-all hover:scale-105 rounded-inherit'}
						src={data.banner}
						alt={data.grant.bannerAlt || ''}
					/>
				</Card.Content>
			</Card.Root>
		{/if}
		<div class="basis-3/4 flex flex-col w-full h-full justify-start">
			<h2 class="text-4xl font-bold tracking-tight w-full flex-grow-0">{data.grant.title}</h2>
			<Badge class="mb-4 w-fit flex-grow-0">GRANT</Badge>
			<p class="text-muted-foreground flex-grow h-full">
				{data.grant.description}
			</p>
		</div>
		<Card.Root class="basis-1/4 h-full bg-secondary">
			<Card.Header class="h-full w-full">
				<div class="flex gap-4">
					<Card.Title class="text-3xl">{data.grant.organization.name}</Card.Title>
				</div>
			</Card.Header>
			<Card.Content class="h-full w-full">
				<Card.Description class="mb-4">
					{data.grant.organization.description}
				</Card.Description>
				<a href={`/grant-user/organization/${toShort(data.grant.organization.id)}`} target="_blank">
					<Button class="w-full">{$t('grant.viewAllGrants')}</Button>
				</a>
			</Card.Content>
		</Card.Root>
	</div>
	<Separator class="mb-8" />
	<div class="container flex items-center flex-col space-y-5">
		{#if data.documents.length !== 0}
			<Card.Root class="bg-secondary w-full  p-6 rounded-lg">
				<h2 class="text-3xl font-bold tracking-tight text-center mb-2">
					{$t('grant.application.supplied_documents')}
				</h2>
				<p class="tracking-tight text-center mb-8 text-muted-foreground">
					{$t('grant.application.instructions')}
				</p>
				<div class="flex justify-center w-full gap-10 items-center">
					{#each data.documents as doc}
						<DownloadableForm {doc} />
					{/each}
				</div>
			</Card.Root>
		{/if}

		<div class="flex gap-10">
			{#if data.forms.length !== 0}
				<Card.Root class="bg-secondary w-full p-6 rounded-lg">
					<h2 class="text-3xl font-bold tracking-tight text-center mb-2">
						{$t('grant.application.forms')}
					</h2>
					<p class="tracking-tight text-center mb-8 text-muted-foreground">
						{$t('apply.instructions')}
					</p>
					<div class="flex justify-center w-full gap-10 items-center">
						{#each data.forms as form}
							<GrantForm {form} grantId={data.grant.id} />
						{/each}
					</div>
				</Card.Root>
			{/if}
			{#if data.grant.requiredDocuments.length !== 0}
				<Card.Root class="bg-secondary w-full p-6 rounded-lg">
					<h2 class="text-3xl font-bold tracking-tight text-center mb-2">
						{$t('grant.application.required_documentation')}
					</h2>
					<p class="tracking-tight text-center mb-8 text-muted-foreground">
						{$t('grant.application.upload_documentation')}
					</p>
					<Form.Fieldset {form} name="documents">
						<Form.FieldErrors />
						<div class="flex justify-center w-full gap-10 items-center">
							{#each data.grant.requiredDocuments as doc}
								<RequiredDocumentation
									{submitted}
									on:uploaded={(e) => addFile(e, doc.id)}
									fieldName={doc.prompt}
								/>
							{/each}
						</div>
					</Form.Fieldset>
				</Card.Root>
			{/if}
		</div>
		{#if submitted}
			<Card.Root class="bg-secondary w-full p-6 rounded-lg">
				<h2 class="text-3xl font-bold tracking-tight text-center mb-2">
					{$t('grant.application.submitted_successfully')}
				</h2>
			</Card.Root>
		{:else}
			<form method="POST" enctype="multipart/form-data" use:enhance>
				<Button disabled={disabled || isLoading} type="submit" class="gap-4">
					<span>{$t('apply.submitApplication')}</span>
					{#if isLoading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					{#if disabled}
						<Badge variant="destructive" class="pl-1 pr-2 gap-1">
							<CircleAlert></CircleAlert>
							{$t('grant.application.incomplete_fields')}
						</Badge>
					{/if}
				</Button>
			</form>
		{/if}
	</div>
</div>
