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

	let className: string = "";
	export { className as class };

	let CompleteIcon = CompleteStatus.COMPLETE.icon;
	let IncompleteIcon = CompleteStatus.INCOMPLETE.icon;
	let PendingIcon = AcceptStatus.PENDING.icon;
	let AcceptedIcon = AcceptStatus.ACCEPTED.icon;
	let RejectedIcon = AcceptStatus.REJECTED.icon;


	let ageSlider = [0, 130];
	let minAge = 0;
	let maxAge = 130;
	let complete = true, incomplete = false;

	const updateMinAge = (x : number) => {minAge = x; ageSlider[0] = x};
	const updateMaxAge = (x : number) => {maxAge = x; ageSlider[1] = x};
	
	$: updateMinAge(ageSlider[0]);
	$: updateMaxAge(ageSlider[1]);
	$: updateMinAge(minAge);
	$: updateMaxAge(maxAge);
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title>Filter Applications</Card.Title>
		<Card.Description>Populate the table with applicants that match the given criteria.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-2">
			<Label for="min-age">Age Range</Label>
			<div class="flex gap-4">
				<Input class="basis-1/4" bind:value={minAge} type="number" min={0} max={130} id="min-age" placeholder="Min age" />
				<Slider class="basis-1/2" bind:value={ageSlider} min={0} step={1} max={130}></Slider>
				<Input class="basis-1/4"bind:value={maxAge} type="number" min={0} max={130} id="min-age" placeholder="Min age" />
			</div>
		</div>
		<div class="grid gap-2">
			<Label>Complete</Label>
			<div class="grid grid-cols-2 gap-6">
				<div class="h-full flex items-center gap-2">
					<Checkbox id="complete" bind:checked={complete}></Checkbox>
					<div class="flex gap-0">
						<CompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {CompleteStatus.COMPLETE.color}" />
						<Label class="text-center" for="complete">{CompleteStatus.COMPLETE.name}</Label>
					</div>
				</div>
				<div class="h-full flex items-center gap-2">
					<Checkbox id="incomplete" bind:checked={incomplete}></Checkbox>
					<div class="flex gap-0">
						<IncompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {CompleteStatus.INCOMPLETE.color}" />
						<Label for="incomplete">{CompleteStatus.INCOMPLETE.name}</Label>
					</div>
				</div>
			</div>
		</div>
		<div class="grid gap-2">
			<Label>Status</Label>
			<div class="grid grid-cols-2 gap-6">
				<div class="h-full flex items-center gap-2">
					<Checkbox id="complete" bind:checked={complete}></Checkbox>
					<div class="flex gap-0">
						<AcceptedIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.ACCEPTED.color}" />
						<Label class="text-center" for="complete">{AcceptStatus.ACCEPTED.name}</Label>
					</div>
				</div>
				<div class="h-full flex items-center gap-2">
					<Checkbox id="incomplete" bind:checked={incomplete}></Checkbox>
					<div class="flex gap-0">
						<PendingIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.PENDING.color}" />
						<Label for="incomplete">{AcceptStatus.PENDING.name}</Label>
					</div>
				</div>
				<div class="h-full flex items-center gap-2">
					<Checkbox id="incomplete" bind:checked={incomplete}></Checkbox>
					<div class="flex gap-0">
						<RejectedIcon class="mr-1 h-4 w-4 text-muted-foreground {AcceptStatus.REJECTED.color}" />
						<Label for="incomplete">{AcceptStatus.REJECTED.name}</Label>
					</div>
				</div>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="justify-between space-x-2">
		<Button class="w-full">Filter</Button>
	</Card.Footer>
</Card.Root>
