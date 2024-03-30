<script lang="ts">
	import { t } from '$lib/i18n/i18n';
	import { AcceptStatus } from './app-acceptance-statuses';

	export let value: string;

	let status = AcceptStatus.fromString(value);

	$: statusString = $t(`admin.applications.${status.name.toLowerCase().replaceAll(' ', '_')}`);

	$: Icon = status?.icon;
</script>

<div class="flex w-[100px] items-center">
	{#if Icon}
		<svelte:component this={Icon} class="mr-2 h-4 w-4 text-muted-foreground {status.color}" />
	{/if}
	{statusString}
</div>
