<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toShort } from '$lib/utils/url';
	import { t } from '$lib/i18n/i18n';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { getFormDraftSchema, getFormSubmissionSchema } from '$lib/validation/form_schema';
	import FormField from './FormField.svelte';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
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
	let filterForm = superForm(data.superform, {
		resetForm: false,
		dataType: 'json',
		validators: zodClient(formSchema),
		onSubmit: () => {
			lastModified = Date.now();
			lastSaved = new Date();
			isLoading = true;
		},
		onResult: () => {
			options.validators = zodClient(formSchema);
			setTimeout(() => (isLoading = false), 250);
			toast.success('The form has been saved!');
		},
		onError: (error) => {
			options.validators = zodClient(formSchema);
			toast.error(`Failed to save form: ${error.result.error.message}!`);
			setTimeout(() => (isLoading = false), 250);
		}
	});

	const { form: formData, enhance, allErrors, options } = filterForm;

	let errors = false;
	allErrors.subscribe((value) => {
		errors = value.length > 0;
	});

	let mounted = false;
	let lastModified = Date.now();
	let lastSaved: Date | null = null;

	// After the component is mounted, start auto saving.
	onMount(() => {
		mounted = true;

		// Subscribe to form data changes, ignoring during submission.
		formData.subscribe((value) => {
			if (!isLoading) {
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

<div
	class="min-h-full flex-1 flex-row p-20 mt-10 flex items-start justify-center gap-10 box-border"
>
	<div class="hidden md:flex basis-1/4 w-full"></div>
	<div
		class="min-h-screen hidden basis-1/4 flex-grow-0 md:flex flex-col justify-end
		h-full items-start space-y-4 fixed w-1/4 bottom-0 left-0 p-16"
	>
		{#if errors}
			<Alert.Root variant="destructive">
				<AlertCircle class="h-4 w-4"></AlertCircle>
				<Alert.Title>Note</Alert.Title>
				<Alert.Description
					>The form is incomplete, but can still be saved as a draft.</Alert.Description
				>
			</Alert.Root>
		{/if}
		<div class="flex gap-2">
			<Badge variant="outline" class="text-md mt-1">GRANT</Badge>
			<h2 class="text-2xl font-bold tracking-tight">{grant?.title || 'Unknown'}</h2>
		</div>
		{#if banner}
			<Card.Root>
				<Card.Content class={'aspect-video w-full p-0 rounded-inherit'}>
					<img
						class={'h-full w-full object-cover transition-all hover:scale-105 rounded-inherit'}
						src={banner}
						alt={grant.bannerAlt || ''}
					/>
					<!-- TODO Grant image alt text! -->
				</Card.Content>
			</Card.Root>
		{/if}
		<Button
			size="lg"
			class="break-all w-full text-md gap-2"
			disabled={!grant}
			on:click={() => submitForm()}
		>
			{#if isLoading}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			<Save class="h-4 w-4"></Save>
			<span>{'Save Form'}</span>
			{#if lastSaved}
				<Badge class="text-md pt-1 pb-1"
					>Saved at {lastSaved.getHours()}:{lastSaved.getMinutes()}</Badge
				>
			{/if}
		</Button>
		<a
			class="w-full"
			href={`/grant-user/grant/${!grant ? '' : toShort(grant.id)}`}
			target="_blank"
			on:click={(e) => e.preventDefault()}
		>
			<Button
				on:click={() => {
					goto(`/grant-user/grant/${!grant ? '' : toShort(grant.id)}`);
				}}
				size="lg"
				variant="secondary"
				class="w-full text-md gap-2"
				disabled={!grant}
			>
				<ExternalLink class="h-4 w-4"></ExternalLink>
				<span>{$t('grant.form.return')}</span>
			</Button>
		</a>
	</div>
	<div class="basis-1/2 w-full h-full flex flex-1 flex-col justify-start items-center space-y-10">
		<div class="flex gap-2">
			<Badge variant="outline" class="text-md mt-1">FORM</Badge>
			<h2 class="text-4xl font-bold tracking-tight">{grant?.title || 'Unknown'}: {form.name}</h2>
		</div>
		<form method="POST" use:enhance class="w-full flex flex-col gap-10">
			{#each form.fields as field}
				<FormField {field} {filterForm}></FormField>
			{/each}
		</form>
	</div>
	<div class="hidden xl:flex basis-1/4 w-full"></div>
</div>
