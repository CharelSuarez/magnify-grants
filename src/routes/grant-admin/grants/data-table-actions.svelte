<script lang="ts">
	import MoreHorizontal from 'lucide-svelte/icons/more-horizontal';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n/i18n';
	import { toShort } from '$lib/utils/url';
	import { createEventDispatcher } from 'svelte';

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

	export let id: string;
</script>

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
			<a href={`/grant-user/grant/${toShort(id)}`} target="_blank">
				<DropdownMenu.Item class="cursor-pointer">{$t('menu.openGrantPage')}</DropdownMenu.Item>
			</a>
			<DropdownMenu.Item on:click={() => {}}>
				{$t('menu.viewApplicants')}
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={deleteGrant}>{$t('menu.deleteGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item on:click={publishGrant}>{$t('menu.publishGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item on:click={unpublishGrant}>{$t('menu.unpublishGrant')}</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
