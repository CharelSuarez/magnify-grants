<script lang="ts">
    import Badge from '$lib/components/ui/badge/badge.svelte';
	import CheckCircle from 'lucide-svelte/icons/check-circle';
    import CircleAlert from 'lucide-svelte/icons/alert-circle';


    export let complete: boolean;

    $: icon = complete ? CheckCircle : CircleAlert;
    $: color = complete ? 'bg-green-500' : 'bg-yellow-500';
    $: text = complete ? 'Complete' : 'Draft';

</script>

<Badge class={`flex gap-2 max-h-12 px-4 py-2 ${color} hover:${color} text-[1rem] font-satoshi font-medium w-fit`}>
    <svelte:component this={icon} class={color}></svelte:component>
    {text}
</Badge>