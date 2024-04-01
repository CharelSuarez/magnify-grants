<script lang="ts">
    import Badge from '$lib/components/ui/badge/badge.svelte';
	import CheckCircle from 'lucide-svelte/icons/check-circle';
</script>

<Badge class={`flex gap-2 max-h-12 px-4 py-2 bg-green-500 hover:bg-green-500 text-[1rem] font-satoshi font-medium w-fit`}>
    <svelte:component this={CheckCircle} class={'bg-green-500'}></svelte:component>
    {'Complete'}
</Badge>