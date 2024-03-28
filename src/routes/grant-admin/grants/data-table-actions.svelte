<script lang="ts">
	import MoreHorizontal from 'lucide-svelte/icons/more-horizontal';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n/i18n';
	import { toShort } from '$lib/utils/url';

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
		<DropdownMenu.Item>{$t('menu.deleteGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item>{$t('menu.editGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item>{$t('menu.publishGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item>{$t('menu.unpublishGrant')}</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
