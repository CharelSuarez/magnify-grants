<script lang="ts">
	import CalendarIcon from "lucide-svelte/icons/calendar";
	import { type DateValue, DateFormatter, getLocalTimeZone, fromDateToLocal } from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button";
	import { Calendar } from "$lib/components/ui/calendar";
	import * as Popover from "$lib/components/ui/popover";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	export let value = null;
	let date: DateValue | null = value ? fromDateToLocal(value) : null;
	$: ((date: DateValue | null) => {
		if (date != null) {
			const newValue = new Date();
			newValue.setFullYear(date.year);
			newValue.setMonth(date.month - 1);
			newValue.setDate(date.day);
			newValue.setHours(0, 0, 0, 0);
			value = newValue;
		}
	})(date);
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				"w-[280px] justify-start text-left font-normal",
				!date && "text-muted-foreground"
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date"}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value={date} {...$$restProps} initialFocus/>
	</Popover.Content>
</Popover.Root>