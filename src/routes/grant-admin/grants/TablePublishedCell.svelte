<script lang="ts">
	import { t } from "$lib/i18n/i18n";
	export let published: boolean;
    import { Rocket, EyeOff } from "lucide-svelte";

	$: status = published ? $t('table.header.published') : $t('grant.application.draft');
	$: Icon = published ? Rocket : EyeOff;
    $: color = published ? 'text-green-500' : 'text-red-500';
</script>

<div class="flex w-[100px] items-center">
    {#if Icon}
        <svelte:component this={Icon} class="mr-2 h-4 w-4 {color}" />
    {/if}
    {status}
</div>
