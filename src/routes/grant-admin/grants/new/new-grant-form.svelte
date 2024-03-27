<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import {
		type SuperValidated,
		type Infer,
		superForm
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Separator } from '$lib/components/ui/separator';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Sector } from '@prisma/client';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const sectorsArray = Object.entries(Sector);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
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

	<Form.Field
		class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
		{form}
		name="acceptingApplications"
	>
		<Form.Control let:attrs>
			<Checkbox {...attrs} bind:checked={$formData.acceptingApplications} />
			<div class="space-y-1 leading-none">
				<Form.Label>Accepting Applications</Form.Label>
				<Form.Description>
					Whether or not the form will accept new applications
				</Form.Description>
			</div>
			<input hidden name={attrs.name} value={$formData.acceptingApplications} />
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="rangeLow">
		<Form.Control let:attrs>
			<Form.Label>Minimum funding amount</Form.Label>
			<Input {...attrs} bind:value={$formData.rangeLow} step="0.01" type="number" />
		</Form.Control>
		<Form.Description>The smallest amount of money awarded to recipients of this grant</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="rangeHigh">
		<Form.Control let:attrs>
			<Form.Label>Maximum funding amount</Form.Label>
			<Input {...attrs} bind:value={$formData.rangeHigh} step="0.01" type="number" />
		</Form.Control>
		<Form.Description>The largest amount of money awarded to recipients of this grant</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="expirationDate">
		<Form.Control let:attrs>
			<Form.Label>The grant's expiration date</Form.Label>
			<Input {...attrs} bind:value={$formData.expirationDate} placeholder="1900-12-01" type="date" />
		</Form.Control>
		<Form.Description>When this grant will automatically stop accepting new applicants</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Fieldset class="space-y-3" {form} name="sector">
		<Form.Legend>Grant Sector</Form.Legend>
		<RadioGroup.Root
			bind:value={$formData.sector}
			class="flex flex-col space-y-1"
		>
			{#each sectorsArray as [key, _]}
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item {...attrs} value="{key}" />
						<Form.Label class="font-normal">{key.toString().replace("_", " & ").replace(/\w\S*/g,
							function(txt) {
								return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
							})}</Form.Label>
					</Form.Control>
				</div>
			{/each}
			<RadioGroup.Input name="sector" />
		</RadioGroup.Root>
		<Form.FieldErrors />
	</Form.Fieldset>

	<Form.Button>Submit</Form.Button>
</form>