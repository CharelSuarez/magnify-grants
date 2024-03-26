<script lang="ts">
	import MoreHorizontal from 'lucide-svelte/icons/more-horizontal';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { toShort } from '$lib/utils/url';

	export let id : string; 
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="relative h-8 w-8 p-0"
			size="icon"
			variant="ghost"
		>
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => {}}> <!-- TODO navigate to page -->
				View applicants
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => {
				window.open(`/grant/${toShort(id)}`, '_blank');
			}}>
				Open grant page
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Delete grant</DropdownMenu.Item>
		<DropdownMenu.Item>Edit grant</DropdownMenu.Item>
		<DropdownMenu.Item>Publish grant</DropdownMenu.Item> <!-- TODO only show one of these depending on status -->
		<DropdownMenu.Item>Un-publish grant</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>