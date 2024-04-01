<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toShort } from '$lib/utils/url';
	import { t } from '$lib/i18n/i18n';
	import { superForm, type Infer } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { getFormDraftSchema, getFormSubmissionSchema, type FormMessage } from '$lib/validation/form_schema';
	import FormField from './FormField.svelte';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import {AlertCircle, CheckCircle2} from 'lucide-svelte';
	import Save from 'lucide-svelte/icons/save';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const banner = data.banner;
	const form = data.formOnGrants.form;
	const grant = data.formOnGrants.grant;

	const formSchema = getFormSubmissionSchema(form.fields);
	const formDraftSchema = getFormDraftSchema(form.fields);

	let isLoading = false;
	let filterForm = superForm<Infer<typeof formSchema>, FormMessage>(data.superform, {
		resetForm: false,
		dataType: 'json',
		validators: zodClient(formSchema),
		onSubmit: () => {
			if (!data.editable) return false;

			lastModified = Date.now();
			lastSaved = new Date();
			isLoading = true;
		},
		onResult: () => {
			if (data.editable) {
				options.validators = zod(formSchema);
				setTimeout(() => (isLoading = false), 250);
			}
		},
		onError: (error) => {
			if (data.editable) {
				options.validators = zod(formSchema);
				toast.error($t('grant.application.form.save_failed'));
				setTimeout(() => (isLoading = false), 250);
			}
		}
	});

	const { form: formData, enhance, options, message } = filterForm;

	let draft = false;
	let submitted = false;

	message.subscribe((value) => {
		if (!value) return;

		if (value.status === 'draft') {
			toast.success($t('grant.application.form.draft_submitted'));
			draft = true;
		} else if (value.status === 'submitted') {
			toast.success($t('grant.application.form.saved_successfully'));
			draft = false;
			submitted = true;
		} else {
			toast.error(value.text);
		}
	});

	let mounted = false;
	let lastModified = Date.now();
	let lastSaved: Date | null = null;

	// After the component is mounted, start auto saving.
	onMount(() => {
		mounted = true;

		// Subscribe to form data changes, ignoring during submission.
		formData.subscribe((value) => {
			if (!isLoading && data.editable) {
				lastModified = Date.now();
				setTimeout(() => {
					if (Date.now() - lastModified <= 4000) {
						return;
					}
					submitForm();
				}, 5000);
			}
		});
	});

	const submitForm = () => {
		options.validators = zod(formDraftSchema);
		filterForm.submit();
	};
</script>

<svelte:head>
	<title>{form.name}</title>
</svelte:head>

<div
	class="min-h-full flex-1 flex-row p-20 pt-10 flex items-start justify-center gap-10 box-border"
>
	<div class="hidden md:flex basis-1/4 w-full"></div>
	<div
		class="min-h-screen hidden basis-1/4 flex-grow-0 md:flex flex-col justify-end
		h-full items-start space-y-4 fixed w-1/4 bottom-0 left-0 p-16"
	>
		<div class="grow h-1/2" />
		{#if draft}
			<Alert.Root variant='destructive'>
				<AlertCircle class="h-4 w-4"></AlertCircle>
				<Alert.Title>Note</Alert.Title>
				<Alert.Description>{$t('grant.application.form.incomplete')}</Alert.Description>
			</Alert.Root>
		{:else if submitted}
			<Alert.Root>
				<CheckCircle2 class="h-4 w-4"></CheckCircle2>
				<Alert.Title>Complete</Alert.Title>
				<Alert.Description>{$t('grant.application.form.submitted')}</Alert.Description>
			</Alert.Root>
		{/if}
		<div class="flex gap-2">
			<div class="flex gap-2 items-center">
				<Badge class="text-md mt-1 max-h-10 gap-1" variant="outline">
					<span>FORM</span>
				</Badge>
				<h2 class="text-4xl font-bold tracking-tight">{grant?.title || 'Unknown'}: {form.name}</h2>
			</div>
		</div>
		{#if banner}
			<Card.Root>
				<Card.Content class={'aspect-video w-full p-0 rounded-inherit'}>
					<img
						class={'h-full w-full object-cover transition-all hover:scale-105 rounded-inherit'}
						src={banner}
						alt={grant.bannerAlt || ''}
					/>
				</Card.Content>
			</Card.Root>
		{/if}
		{#if data.editable}
			<Button
				class="max-h-[100px] w-full flex grow flex-wrap text-md gap-2"
				disabled={!grant}
				on:click={() => submitForm()}
			>
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				<Save class="h-4 w-4"></Save>
				{$t('grant.application.form.save_form')}
				{#if lastSaved}
					<Badge class="text-md pt-1 pb-1"
						>{$t('grant.application.form.saved_at', {
							time: lastSaved.toLocaleTimeString(undefined, {timeStyle: 'short'})
						})}</Badge
					>
				{/if}
			</Button>
		{/if}
		<a
			class="w-full"
			href={`/grant-user/grant/${!grant ? '' : toShort(grant.id)}`}
			on:click={(e) => e.preventDefault()}
			target="_blank"
		>
			<Button
				class="w-full text-md gap-2"
				disabled={!grant}
				on:click={() => {
					goto(`/grant-user/grant/${!grant ? '' : toShort(grant.id)}`);
				}}
				size="lg"
				variant="secondary"
			>
				<ExternalLink class="h-4 w-4"></ExternalLink>
				<span>{$t('grant.form.return')}</span>
			</Button>
		</a>
	</div>
	<div class="basis-1/2 w-full h-full flex flex-1 flex-col justify-start items-center space-y-10">
		<div class="flex gap-2">
			<Badge class="text-md mt-1" variant="outline">FORM</Badge>
			<h2 class="text-4xl font-bold tracking-tight">{grant?.title || 'Unknown'}: {form.name}</h2>
		</div>
		<form class="w-full flex flex-col gap-10" method="POST" use:enhance>
			{#each form.fields as field}
				<FormField editable={data.editable} {field} {filterForm}></FormField>
			{/each}
		</form>
	</div>
	<div class="hidden xl:flex basis-1/4 w-full"></div>
</div>
