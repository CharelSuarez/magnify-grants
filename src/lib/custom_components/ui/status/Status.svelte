<script lang="ts">
	import { AcceptStatus } from '../../../../routes/grant-admin/applications/application-table/app-acceptance-statuses';
	import Badge from '$lib/components/ui/badge/badge.svelte';
    import { t } from '$lib/i18n/i18n';
    export let status: AcceptStatus

    const translation: Record <string, string> = {
        'Accepted': 'application.status.accepted',
        'In Progress': 'application.status.inProgress',
        'Rejected': 'application.status.rejected'
    }

</script>

<Badge class={`flex gap-2 max-h-12 px-4 ${status.bg} hover:${status.bg} text-[1rem] font-satoshi font-medium`}>
    {$t(translation[status.name])} 
    <svelte:component this={status.icon} class={``}/>
</Badge>
