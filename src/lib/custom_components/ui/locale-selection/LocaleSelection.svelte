<script lang="ts">
	import * as Select from "$lib/components/ui/select/";
	import { locale, locales } from '$lib/i18n/i18n';
	import type { Selected } from 'bits-ui';
	import { browser } from '$app/environment';
	let selected: Selected<string>;

	$: if (selected && selected.value) {
		locale.set(selected.value);
	}

	$: selected = {
		value: $locale,
		label: $locale,
	};

</script>

<Select.Root bind:selected={selected}>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="en" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Language</Select.Label>
			{#each locales as l}
				<Select.Item value={l} label={l}>
					{l}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="favoriteFruit" />
</Select.Root>