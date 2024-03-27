<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Slider } from "$lib/components/ui/slider"
	import { AcceptStatus } from "$lib/custom_components/ui/application-table/app-acceptance-statuses"
	import { CompleteStatus } from "$lib/custom_components/ui/application-table/app-complete-statuses"
	import { zodClient } from "sveltekit-superforms/adapters";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { filterSchema, type FilterSchema } from "$lib/validation/app_schema";
    import { Loader2 } from "lucide-svelte";
    import * as Form from "$lib/components/ui/form";
	import { t } from '$lib/i18n/i18n';

	let CompleteIcon = CompleteStatus.COMPLETE.icon;
	let IncompleteIcon = CompleteStatus.INCOMPLETE.icon;
	let PendingIcon = AcceptStatus.IN_PROGRESS.icon;
	let AcceptedIcon = AcceptStatus.ACCEPTED.icon;
	let RejectedIcon = AcceptStatus.REJECTED.icon;

	let className: string = "";
	export { className as class };
    export let data: SuperValidated<Infer<FilterSchema>>;

	let isLoading = false;
    let filterForm = superForm(data, {
		resetForm: false,
		dataType: 'json',
        validators: zodClient(filterSchema),
		onSubmit: () => { isLoading = true },
		onResult: () => setTimeout(() => isLoading = false, 1000)
    });
	
	const { form: formData, enhance, allErrors } = filterForm;

	let errors = false;
	allErrors.subscribe((value) => errors = value.length > 0);

	/* Synchronize the age input fields with the slider and vice-versa. */
	let ageSlider : [number, number] = [0, 150];
	let lastMinAge : number | undefined = undefined, lastMaxAge : number | undefined = undefined;
	formData.subscribe((value) => {
		if (value.minAge !== undefined && value.minAge !== lastMinAge) 
			lastMinAge = ageSlider[0] = value.minAge;``
		if (value.maxAge !== undefined && value.maxAge !== lastMaxAge) 
			lastMaxAge = ageSlider[1] = value.maxAge;
	});
	$: $formData.minAge = ageSlider[0];
	$: $formData.maxAge = ageSlider[1];
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title>{$t("applications.filter.title")}</Card.Title>
		<Card.Description>{$t("applications.filter.description")}</Card.Description>
	</Card.Header>
	<form method="POST" use:enhance class="w-full">
		<Card.Content class="flex flex-col space-y-2">
			<div class="grid gap-2">
				<Label>Age Range</Label>
				<div class="flex gap-4">
					<Form.Field form={filterForm} name="minAge" class="basis-1/4">
						<Form.Control let:attrs>
							<Input bind:value={$formData.minAge} {...attrs} type="number" min={0} max={150} name="minAge" placeholder="0" />
						</Form.Control>
					</Form.Field>
					<Slider class="basis-1/2" bind:value={ageSlider} min={0} step={1} max={150}></Slider>
					<Form.Field form={filterForm} name="maxAge" class="basis-1/4">
						<Form.Control let:attrs>
							<Input bind:value={$formData.maxAge} {...attrs} type="number" min={0} max={150} name="maxAge" placeholder="150" />
						</Form.Control>
					</Form.Field>
				</div>
				<Form.Field form={filterForm} name="minAge" class="text-center">
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={filterForm} name="maxAge" class="text-center">
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex flex-col space-y-2">
				<Label>Complete</Label>
				<div class="grid grid-cols-2 gap-6">
					<Form.Field form={filterForm} name="complete" class="h-full flex items-center gap-2">
						<Form.Control let:attrs>
							<input type="checkbox" bind:checked={$formData.complete} {...attrs} name="complete"/>
						</Form.Control>
						<div class="flex gap-0 h-full">
							<CompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {CompleteStatus.COMPLETE.color}"/>
							<Label class="text-center" for="complete">{CompleteStatus.COMPLETE.name}</Label>
						</div>
					</Form.Field>
					<Form.Field form={filterForm} name="incomplete">
						<div class="h-full flex items-center gap-2">
							<Form.Control let:attrs>
								<input type="checkbox" bind:checked={$formData.incomplete} {...attrs} name="incomplete"/>
							</Form.Control>
							<div class="flex gap-0">
								<IncompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {CompleteStatus.INCOMPLETE.color}" />
								<Label for="incomplete">{CompleteStatus.INCOMPLETE.name}</Label>
							</div>
						</div>
					</Form.Field>
				</div>
				<Form.Field form={filterForm} name="complete" class="text-center">
					<Form.FieldErrors/>
				</Form.Field>
				<Form.Field form={filterForm} name="incomplete" class="text-center">
					<Form.FieldErrors/>
				</Form.Field>
			</div>
			<div class="flex flex-col space-y-2">
				<Label>Status</Label>
				<div class="grid grid-cols-2 gap-6">
					<Form.Field form={filterForm} name="accepted">
						<div class="h-full flex items-center gap-2">
							<Form.Control let:attrs>
								<input type="checkbox" bind:checked={$formData.accepted} {...attrs} name="accepted"/>
							</Form.Control>
							<div class="flex gap-0">
								<AcceptedIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.ACCEPTED.color}" />
								<Label class="text-center" for="accepted">{AcceptStatus.ACCEPTED.name}</Label>
							</div>
						</div>
					</Form.Field>
					<Form.Field form={filterForm} name="pending">
						<div class="h-full flex items-center gap-2">
							<Form.Control let:attrs>
								<input type="checkbox" bind:checked={$formData.pending} {...attrs} name="pending"/>
							</Form.Control>
							<div class="flex gap-0">
								<PendingIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.IN_PROGRESS.color}" />
								<Label class="text-center" for="pending">{AcceptStatus.IN_PROGRESS.name}</Label>
							</div>
						</div>
					</Form.Field>
					<Form.Field form={filterForm} name="rejected">
						<div class="h-full flex items-center gap-2">
							<Form.Control let:attrs>
								<input type="checkbox" bind:checked={$formData.rejected} {...attrs} name="rejected"/>
							</Form.Control>
							<div class="flex gap-0">
								<RejectedIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.REJECTED.color}" />
								<Label class="text-center" for="rejected">{AcceptStatus.REJECTED.name}</Label>
							</div>
						</div>
					</Form.Field>
				</div>
				<Form.Field form={filterForm} name="accepted" class="text-center">
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={filterForm} name="pending" class="text-center">
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={filterForm} name="rejected" class="text-center">
					<Form.FieldErrors />
				</Form.Field>
			</div>
		</Card.Content>
		<Card.Footer>
			<Form.Button disabled={isLoading || errors} class="w-full">
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$t("applications.filter")}
			</Form.Button>
		</Card.Footer>
	</form>
</Card.Root>
