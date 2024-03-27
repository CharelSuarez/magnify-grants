<script lang="ts">
    import { AcceptStatus } from "./app-acceptance-statuses";

	export let value: string;
	$: status = AcceptStatus.fromString(value);
	$: Icon = status?.icon;
</script>

<div class="flex w-[100px] items-center">
    {#if Icon}
        <Icon class="mr-2 h-4 w-4 text-muted-foreground {status.color}" />
    {/if}
    {status?.name || value}
</div>