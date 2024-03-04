<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Slider } from "$lib/components/ui/slider"
	import { Checkbox } from "$lib/components/ui/checkbox"
	import { statuses } from "$lib/custom_components/ui/table/grant-statuses"
	import { completeStatuses } from "$lib/custom_components/ui/table/grant-complete-statuses"

	let className: string = "";
	export { className as class };

	let minAge = [0], maxAge = [100];
	let complete = true, incomplete = false;

	let CompleteIcon = completeStatuses["COMPLETE"].icon;
	let completeColor = completeStatuses["COMPLETE"].color;
	let completeName = completeStatuses["COMPLETE"].name;

	let IncompleteIcon = completeStatuses["INCOMPLETE"].icon;
	let incompleteColor = completeStatuses["INCOMPLETE"].color;
	let incompleteName = completeStatuses["INCOMPLETE"].name;

</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title>Filter Applications</Card.Title>
		<!-- <Card.Description></Card.Description> -->
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-2">
			<Label for="min-age">Min Age</Label>
			<div class="grid grid-cols-2 gap-6">
				<Input type="number" min={0} max={100} value={minAge} id="min-age" placeholder="Min age" />
				<Slider value={minAge} min={0} step={1} max={100}></Slider>
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="max-age">Max Age</Label>
			<div class="grid grid-cols-2 gap-6">
				<Input type="number" min={0} max={100} value={maxAge} id="max-age" placeholder="Min age" />
				<Slider value={maxAge} min={0} step={1} max={100}></Slider>
			</div>
		</div>
		<div class="grid gap-2">
			<Label>Complete</Label>
			<div class="grid grid-cols-2 gap-6">
				<div class="h-full flex items-center gap-2">
					<Checkbox id="complete" bind:checked={complete}></Checkbox>
					<div class="flex gap-0">
						<CompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {completeColor}" />
						<Label class="text-center" for="complete">{completeName}</Label>
					</div>
				</div>
				<div class="h-full flex items-center gap-2">
					<Checkbox id="incomplete" bind:checked={incomplete}></Checkbox>
					<div class="flex gap-0">
						<IncompleteIcon class="mr-1 h-4 w-4 text-muted-foreground {incompleteColor}" />
						<Label for="incomplete">{incompleteName}</Label>
					</div>
				</div>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="justify-between space-x-2">
		<Button class="w-full">Filter</Button>
	</Card.Footer>
</Card.Root>
