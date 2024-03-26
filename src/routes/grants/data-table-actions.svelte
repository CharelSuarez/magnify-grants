<script lang="ts">
	import MoreHorizontal from 'lucide-svelte/icons/more-horizontal';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { toShort } from '$lib/utils/url';
	import { t } from '$lib/i18n/i18n';


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
			<span class="sr-only">{$t('menu.open')}</span>
			<MoreHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>{$t('menu.actions')}</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => {}}> <!-- TODO navigate to page -->
				{$t('menu.viewApplicants')}
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => window.open(`/grant/${toShort(id)}`, '_blank')}>
				{$t('menu.openGrantPage')}
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => {
				window.open(`/grant/${toShort(id)}`, '_blank');
			}}>
				Open grant page
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>{$t('menu.deleteGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item>{$t('menu.editGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item>{$t('menu.publishGrant')}</DropdownMenu.Item>
		<DropdownMenu.Item>{$t('menu.unpublishGrant')}</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>