<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { toShort } from '$lib/utils/url';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		ArrowUpRightFromSquare,
		BarChart4,
		EyeOff,
		LayoutGrid,
		Rocket,
		Trash2
	} from 'lucide-svelte';
	import { t } from '$lib/i18n/i18n';

	const dispatch = createEventDispatcher();

	const deleteGrant = () => {
		dispatch('delete', {
			id: id
		});
	};

	const publishGrant = () => {
		dispatch('publish', {
			id: id
		});
	};

	const unpublishGrant = () => {
		dispatch('unpublish', {
			id: id
		});
	};

	export let published: boolean;

	export let id: string;
</script>

<div class="flex flex-row space-x-2 w-full">
	<Button
		title="View Grant Page"
		href={`/grant-user/grant/${toShort(id)}`}
		variant="ghost"
		size="icon"
	>
		<ArrowUpRightFromSquare />
	</Button>

	<Button
		title="View Grant Submissions"
		href={`/grant-admin/applications/?grant=${toShort(id)}`}
		variant="ghost"
		size="icon"
	>
		<LayoutGrid />
	</Button>

	<Button
		title="View Grant Statistics"
		href={`/grant-admin/grants/statistics/${toShort(id)}`}
		variant="ghost"
		size="icon"
	>
		<BarChart4 />
	</Button>
	{#if published}
		<Button title="Unpublish Grant" on:click={unpublishGrant} variant="ghost" size="icon">
			<EyeOff />
		</Button>
	{:else}
		<Button title="Publish Grant" on:click={publishGrant} variant="ghost" size="icon">
			<Rocket />
		</Button>
	{/if}
	<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button title="Delete Grant" variant="ghost" size="icon">
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
				<AlertDialog.Action on:click={deleteGrant}>{$t('alert.delete')}</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
