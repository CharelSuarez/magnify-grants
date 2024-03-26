<script lang="ts">
	import MoreHorizontal from 'lucide-svelte/icons/more-horizontal';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { Trash2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n/i18n';

	const formAction = (route: string) => {
		goto(`/grant-admin/grant-builder/${id}/${route}`);
	};

	const dispatch = createEventDispatcher();

	const deleteForm = () => {
		dispatch('delete', {
			id: id
		});
	};

	export let id: string;
</script>

<div class="flex flex-row w-full h-full space-x-10 items-center">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]} class="relative h-8 w-8 p-0" size="icon" variant="ghost">
				<span class="sr-only">{$t('menu.open')}</span>
				<MoreHorizontal class="h-4 w-4" />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>{$t('menu.actions')}</DropdownMenu.Label>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={() => formAction('view')}>{$t('menu.viewDocument')}</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => formAction('edit')}>{$t('menu.editDocument')}</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button variant="ghost" size="icon">
				<Trash2 />
			</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{$t('alert.title')}</AlertDialog.Title>
				<AlertDialog.Description>
					{$t('alert.description')}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>{$t('alert.cancel')}</AlertDialog.Cancel>
				<AlertDialog.Action on:click={deleteForm}>{$t('alert.delete')}</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>