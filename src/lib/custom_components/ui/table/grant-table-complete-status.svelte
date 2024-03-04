<script lang="ts">
    import { completeStatuses } from "./grant-complete-statuses";

	export let value: boolean;
	const status = completeStatuses[value ? "COMPLETE" : "INCOMPLETE"];
	const Icon = status?.icon;
</script>

<div class="flex w-[100px] items-center">
    {#if Icon}
        <Icon class="mr-2 h-4 w-4 text-muted-foreground {status.color}" />
    {/if}
    {status?.name || value}
</div>