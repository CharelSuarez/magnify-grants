<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { profileSchema, type ProfileSchema } from '$lib/validation/profile_schema';
	import { Loader2 } from 'lucide-svelte';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<ProfileSchema>>;

	let isLoading = false;

	let form = superForm(data, {
		validators: zodClient(profileSchema),
		onSubmit: () => (isLoading = true),
		onResult: () => setTimeout(() => (isLoading = false), 1000)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="grid gap-4">
	<Form.Field {form} name="firstName" class="grid">
		<Form.Control let:attrs>
			<Form.Label>
				<p class="text-muted-foreground text-sm">First name</p>
			</Form.Label>
			<Input placeholder="Jane" {...attrs} bind:value={$formData.firstName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="lastName" class="grid">
		<Form.Control let:attrs>
			<Form.Label>
				<p class="text-muted-foreground text-sm">Last name</p>
			</Form.Label>
			<Input placeholder="Doe" {...attrs} bind:value={$formData.lastName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="dateOfBirth" class="grid">
		<Form.Control let:attrs>
			<Form.Label>
				<p class="text-muted-foreground text-sm">Date of birth</p>
			</Form.Label>
			<Input
				placeholder="1900-12-01..."
				type="date"
				{...attrs}
				bind:value={$formData.dateOfBirth}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={isLoading}>
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		Create profile
	</Form.Button>
</form>
