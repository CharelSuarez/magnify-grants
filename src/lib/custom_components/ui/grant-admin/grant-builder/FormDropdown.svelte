<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PlusCircle } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { FieldType } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';

	export let variant: 'outline' | 'ghost';

	const dispatch = createEventDispatcher();

	const addField = (fieldType: FieldType) => {
		dispatch('addfield', {
			fieldType: fieldType
		});
	};

	export let opened = false;
</script>

<DropdownMenu.Root bind:open={opened}>
	<DropdownMenu.Trigger class="border-none">
		<Button size="icon" {variant}>
			<PlusCircle />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#each Object.values(FieldType) as type}
			<DropdownMenu.Item on:click={() => addField(type)}>{type}</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
