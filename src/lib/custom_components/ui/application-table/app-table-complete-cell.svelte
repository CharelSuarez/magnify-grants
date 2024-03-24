<script lang="ts">
    import { CompleteStatus } from "./app-complete-statuses";

	export let value: boolean;
	const status = value ? CompleteStatus.COMPLETE : CompleteStatus.INCOMPLETE;
	const Icon = status?.icon;
</script>

<div class="flex w-[100px] items-center">
    {#if Icon}
        <Icon class="mr-2 h-4 w-4 text-muted-foreground {status.color}" />
    {/if}
    {status?.name || value}
</div>