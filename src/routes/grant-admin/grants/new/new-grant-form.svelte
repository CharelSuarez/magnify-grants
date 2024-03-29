<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from '$lib/validation/new_grant_schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Sector, type Form as DBForm } from '@prisma/client';
	import { Loader2, PlusCircle, XCircle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { tick } from 'svelte';
	import Dropzone from 'svelte-file-dropzone';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let forms: DBForm[];

	let formOptions = forms;
	let selectedForms: DBForm[] = [];

	$: $formData.grantForms = selectedForms.map((f) => f.id);

	const addReqDocument = () => {
		$formData.requiredDocuments = [...$formData.requiredDocuments, ''];
	};

	const removeReqDocument = (i: number) => {
		if (i < 0) {
			return;
		}
		$formData.requiredDocuments.splice(i, 1);
		$formData = $formData;
	};

	const handleBannerUpload = (e: { detail: { acceptedFiles: [file: File] } }) => {
		const { acceptedFiles } = e.detail;
		$formData.banner = acceptedFiles[0];
	};

	const removeBanner = () => {
		$formData.banner = undefined;
		$formData.bannerAlt = undefined;
	};

	const handleDocumentUpload = (e: { detail: { acceptedFiles: [file: File] } }) => {
		const { acceptedFiles } = e.detail;
		$formData.documents = [...$formData.documents, acceptedFiles[0]];
	};

	const removeDocument = (i: number) => {
		$formData.documents.splice(i, 1);
		$formData = $formData;
	};

	const addForm = (id: string) => {
		const index = formOptions.findIndex((f) => f.id === id);

		if (index === -1) {
			return;
		}

		const selected = formOptions.splice(index, 1)[0];

		selectedForms = [...selectedForms, selected];
	};

	const removeForm = (id: string) => {
		const index = selectedForms.findIndex((f) => f.id === id);

		if (index === -1) {
			return;
		}

		const selected = selectedForms.splice(index, 1)[0];
		selectedForms = selectedForms;

		formOptions = [...formOptions, selected];
	};

	let open = false;

	const closeAndFocusTrigger = (triggerId: string) => {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	};

	let isLoading = false;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		onSubmit: () => (isLoading = true),
		onResult: () => setTimeout(() => (isLoading = false), 1000)
	});

	const sectorsArray = Object.entries(Sector);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex flex-col space-y-5">
	<Form.Field {form} name="grantName">
		<Form.Control let:attrs>
			<Form.Label>Grant Name/Title</Form.Label>
			<Input {...attrs} bind:value={$formData.grantName} />
		</Form.Control>
		<Form.Description>The grant's name or title</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="grantDescription">
		<Form.Control let:attrs>
			<Form.Label>Grant Description</Form.Label>
			<Textarea
				{...attrs}
				bind:value={$formData.grantDescription}
				class="resize-none"
				placeholder="What is this grant about?"
			/>
		</Form.Control>
		<Form.Description>The grant's description</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Fieldset {form} name="grantForms">
		<Form.Legend>Select the forms required for applying to this grant</Form.Legend>
		<Popover.Root bind:open let:ids>
			<Popover.Trigger>
				<Button variant="outline">
					<PlusCircle class="mr-3" />
					Add form
				</Button>
			</Popover.Trigger>
			<Popover.Content>
				<Command.Root>
					<Command.Input />
					<Command.Empty>No form found</Command.Empty>
					<Command.Group>
						{#each formOptions as form}
							<Command.Item
								onSelect={(id) => {
									addForm(id);
									closeAndFocusTrigger(ids.trigger);
								}}
								value={form.id}>{form.name}</Command.Item
							>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		{#each selectedForms as selectedForm, i}
			<Form.ElementField {form} name="grantForms[{i}]">
				<div
					class="w-full grid grid-cols-2 grid-rows-2 grid-flow-row-dense p-5 bg-white border rounded-md"
				>
					<h1 style="grid-area: 1 / 1 / 2 / 2;">{selectedForm.name}</h1>
					<h1 style="grid-area: 2 / 1 / 3 / 2;">{selectedForm.description}</h1>
					<Button
						variant="outline"
						on:click={() => removeForm(selectedForm.id)}
						class="max-w-[150px] place-self-end"
						style="grid-area: 1 / 2 / 2 / 3;">Remove</Button
					>
				</div>
				<Form.FieldErrors />
			</Form.ElementField>
		{/each}
	</Form.Fieldset>

	<Form.Field
		class="flex flex-row items-start bg-white space-x-3 space-y-0 rounded-md border p-4"
		{form}
		name="acceptingApplications"
	>
		<Form.Control let:attrs>
			<Checkbox {...attrs} bind:checked={$formData.acceptingApplications} />
			<div class="space-y-1 leading-none">
				<Form.Label>Accepting Applications</Form.Label>
				<Form.Description>Whether or not the form will accept new applications</Form.Description>
			</div>
			<input hidden name={attrs.name} value={$formData.acceptingApplications} />
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="rangeLow">
		<Form.Control let:attrs>
			<Form.Label>Minimum funding amount</Form.Label>
			<Input {...attrs} bind:value={$formData.rangeLow} step="0.01" type="number" />
		</Form.Control>
		<Form.Description
			>The smallest amount of money awarded to recipients of this grant</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="rangeHigh">
		<Form.Control let:attrs>
			<Form.Label>Maximum funding amount</Form.Label>
			<Input {...attrs} bind:value={$formData.rangeHigh} step="0.01" type="number" />
		</Form.Control>
		<Form.Description
			>The largest amount of money awarded to recipients of this grant</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="expirationDate">
		<Form.Control let:attrs>
			<Form.Label>The grant's expiration date</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.expirationDate}
				placeholder="1900-12-01"
				type="date"
			/>
		</Form.Control>
		<Form.Description
			>When this grant will automatically stop accepting new applicants</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Fieldset class="space-y-3" {form} name="sector">
		<Form.Legend>Grant Sector</Form.Legend>
		<RadioGroup.Root bind:value={$formData.sector} class="flex flex-col space-y-1">
			{#each sectorsArray as [key, _]}
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item {...attrs} value={key} />
						<Form.Label class="font-normal"
							>{key
								.toString()
								.replace('_', ' & ')
								.replace(/\w\S*/g, function (txt) {
									return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
								})}</Form.Label
						>
					</Form.Control>
				</div>
			{/each}
			<RadioGroup.Input name="sector" />
		</RadioGroup.Root>
		<Form.FieldErrors />
	</Form.Fieldset>

	<Form.Field {form} name="banner">
		<Form.Legend>Upload a banner (optional)</Form.Legend>
		<Form.Control>
			<Dropzone
				containerClasses="justify-center min-h-[200px]"
				multiple={false}
				on:drop={handleBannerUpload}
			>
				{#if $formData.banner}
					{$formData.banner.name}
				{:else}
					Drag an image to upload
				{/if}
			</Dropzone>
			{#if $formData.banner}
				<Button on:click={removeBanner} variant="outline">
					<XCircle class="mr-2" />
					Remove banner
				</Button>
			{/if}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if $formData.banner}
		<Form.Field {form} name="bannerAlt">
			<Form.Control let:attrs>
				<Form.Label>Banner alt text</Form.Label>
				<Input {...attrs} bind:value={$formData.bannerAlt} />
			</Form.Control>
			<Form.Description>Please provide alt text for the banner image</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	{/if}

	<Form.Field {form} name="documents">
		<Form.Legend>Upload documents you want the user to view (optional)</Form.Legend>
		<Form.Control>
			<Dropzone
				containerClasses="justify-center min-h-[200px]"
				multiple={false}
				on:drop={handleDocumentUpload}>Upload documents</Dropzone
			>
		</Form.Control>
		<Form.FieldErrors />

		{#each $formData.documents as doc, i}
			<div class="flex items-center space-x-2 flex-row bg-white p-5 rounded-md border">
				<h1>{doc.name}</h1>
				<div class="flex-grow w-full" />
				<Button on:click={() => removeDocument(i)} variant="outline">
					<XCircle class="mr-2" />
					Remove document
				</Button>
			</div>
		{/each}
	</Form.Field>

	<Form.Fieldset {form} name="requiredDocuments">
		<Button on:click={addReqDocument} class="mt-3" variant="outline">
			<PlusCircle class="mr-3" />
			Add document
		</Button>

		<Form.Legend>Add the types of documents the user must submit</Form.Legend>
		{#each $formData.requiredDocuments as _, i}
			<Form.ElementField {form} name="grantForms[{i}]">
				<div class="w-full flex items-center space-x-2 flex-row p-5 bg-white border rounded-md">
					<Input bind:value={$formData.requiredDocuments[i]} />
					<Button on:click={() => removeReqDocument(i)} variant="outline">
						<XCircle class="mr-2" />
						Remove document
					</Button>
				</div>
				<Form.FieldErrors />
			</Form.ElementField>
		{/each}
	</Form.Fieldset>

	<div class="flex flex-row justify-start">
		<Button type="submit" disabled={isLoading}>
			{#if isLoading}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			Submit
		</Button>
	</div>
</form>
