<script lang="ts">
    import { AcceptStatus } from '../../../../routes/grant-admin/applications/application-table/app-acceptance-statuses';
	import Badge from '$lib/components/ui/badge/badge.svelte';
    export let status: AcceptStatus
</script>

<Badge class={`flex gap-2 max-h-12 px-4 ${status.bg} hover:${status.bg} text-[1rem] font-satoshi font-medium`}>
    {status.name} 
    <svelte:component this={status.icon} class={``}/>
</Badge>