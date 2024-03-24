<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import type { InputEvents } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Slider } from "$lib/components/ui/slider"
	import { Checkbox } from "$lib/components/ui/checkbox"
	import { AcceptStatus } from "$lib/custom_components/ui/application-table/app-acceptance-statuses"
	import { CompleteStatus } from "$lib/custom_components/ui/application-table/app-complete-statuses"
	import { zodClient } from "sveltekit-superforms/adapters";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { filterSchema, type FilterSchema } from "$lib/validation/app_schema";
    import { Loader2 } from "lucide-svelte";
    import * as Form from "$lib/components/ui/form";

	let CompleteIcon = CompleteStatus.COMPLETE.icon;
	let IncompleteIcon = CompleteStatus.INCOMPLETE.icon;
	let PendingIcon = AcceptStatus.PENDING.icon;
	let AcceptedIcon = AcceptStatus.ACCEPTED.icon;
	let RejectedIcon = AcceptStatus.REJECTED.icon;

	let className: string = "";
	export { className as class };
    export let data: SuperValidated<Infer<FilterSchema>>;

	let isLoading = false;
    let filterForm = superForm(data, {
        validators: zodClient(filterSchema),
		onSubmit: () => isLoading = true,
		onResult: () => setTimeout(() => isLoading = false, 1000),
    });
	
	const { form: formData, enhance } = filterForm;

	let ageSlider : [number, number] = [0, 130]; 
	let minAge : number | undefined = undefined;
	let maxAge : number | undefined = undefined;
	// let complete = true, incomplete = false;
	let accepted = false, pending = true, rejected = false;

	// TODO Fix this... Not trying to have an infinite loop.
	const updateAges = (min? : number, max? : number) => {
		if (min !== undefined) {
			minAge = min; ageSlider[0] = min; $formData.minAge = min;
		}
		if (max !== undefined) {
			maxAge = max; ageSlider[1] = max; $formData.maxAge = max;
		}
	};
	$: updateAges(ageSlider[0], ageSlider[1]);
	// $: $formData.complete = complete;
	// $: $formData.incomplete = incomplete;
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title>Filter Applications</Card.Title>
		<Card.Description>Populate the table with applicants that match the given criteria.</Card.Description>
	</Card.Header>
	<form use:enhance method="POST" class="w-full">
		<Card.Content class="grid gap-6">
			<div class="grid gap-2">
				<Label>Age Range</Label>
				<div class="flex gap-4">
					<Form.Field form={filterForm} name="minAge" class="basis-1/4">
						<Form.Control let:attrs>
							<Input bind:value={minAge} {...attrs} type="number" min={0} max={130} id="min-age" placeholder="0" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Slider class="basis-1/2" bind:value={ageSlider} min={0} step={1} max={130}></Slider>
					<Form.Field form={filterForm} name="maxAge" class="basis-1/4">
						<Form.Control let:attrs>
							<Input bind:value={maxAge} {...attrs} type="number" min={0} max={130} id="max-age" placeholder="130" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>
			<div class="grid gap-2">
				<Label>Complete</Label>
				<div class="grid grid-cols-2 gap-6">
					<Form.Field form={filterForm} name="complete" class="h-full flex items-center gap-2">
						<Form.Control let:attrs>
							<Checkbox bind:checked={$formData.complete} {...attrs} id="complete" on:click={(e) => console.log($formData.complete)}></Checkbox>
						</Form.Control>
						<Form.FieldErrors />
						<div class="flex gap-0 h-full">
							<CompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {CompleteStatus.COMPLETE.color}" />
							<Label class="text-center" for="complete">{CompleteStatus.COMPLETE.name}</Label>
						</div>
					</Form.Field>
					<!-- <Form.Field form={filterForm} name="incomplete">
						<div class="h-full flex items-center gap-2">
							<Form.Control let:attrs>
								<Checkbox bind:checked={$formData.incomplete} {...attrs} id="incomplete"></Checkbox>
							</Form.Control>
							<Form.FieldErrors />
							<div class="flex gap-0">
								<IncompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {CompleteStatus.INCOMPLETE.color}" />
								<Label for="incomplete">{CompleteStatus.INCOMPLETE.name}</Label>
							</div>
						</div>
					</Form.Field> -->
				</div>
			</div>
			<!-- <div class="grid gap-2">
				<Label>Status</Label>
				<div class="grid grid-cols-2 gap-6">
					<div class="h-full flex items-center gap-2">
						<Checkbox id="complete" bind:checked={accepted}></Checkbox>
						<div class="flex gap-0">
							<AcceptedIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.ACCEPTED.color}" />
							<Label class="text-center" for="complete">{AcceptStatus.ACCEPTED.name}</Label>
						</div>
					</div>
					<div class="h-full flex items-center gap-2">
						<Checkbox id="incomplete" bind:checked={pending}></Checkbox>
						<div class="flex gap-0">
							<PendingIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.PENDING.color}" />
							<Label for="incomplete">{AcceptStatus.PENDING.name}</Label>
						</div>
					</div>
					<div class="h-full flex items-center gap-2">
						<Checkbox id="incomplete" bind:checked={rejected}></Checkbox>
						<div class="flex gap-0">
							<RejectedIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.REJECTED.color}" />
							<Label for="incomplete">{AcceptStatus.REJECTED.name}</Label>
						</div>
					</div>
				</div>
			</div> -->
		</Card.Content>
		<Card.Footer class="justify-between space-x-2">
			<Form.Button disabled={isLoading} class="w-full">
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Filter
			</Form.Button>
		</Card.Footer>
	</form>
</Card.Root>
