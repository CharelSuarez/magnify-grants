<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Pencil, Trash2, Eye } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n/i18n';
	import { toShort } from '$lib/utils/url';

	const dispatch = createEventDispatcher();

	const deleteForm = () => {
		dispatch('delete', {
			id: id
		});
	};

	export let id: string;
</script>

<div class="flex flex-row gap-2 w-full">
	<Button
		href={`/grant-admin/form-builder/${toShort(id)}/view`}
		variant="ghost"
		title="View Form Preview"
		size="icon"
		aria-label="View form preview"
	>
		<Eye />
	</Button>

	<Button
		variant="ghost"
		href={`/grant-admin/form-builder/${toShort(id)}/edit`}
		title="Edit Form"
		size="icon"
		aria-label="Edit form"
	>
		<Pencil />
	</Button>

	<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button name="Delete Form" variant="ghost" size="icon" aria-label="Delete form">
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
