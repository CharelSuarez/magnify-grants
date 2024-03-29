<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { toShort } from '$lib/utils/url';
	import File from 'lucide-svelte/icons/file-text';
	import CircleAlert from 'lucide-svelte/icons/alert-circle';
    import CheckCircle from "lucide-svelte/icons/check-circle";
	import { goto } from '$app/navigation';

    export let grantId : string;

	export let form: {
		id: string;
		name: string;
        application?: {
            complete: boolean
        }
	};
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
    <Card.Header class="flex flex-col w-full items-center p-0">
        <Card.Title class="text-xl w-full text-center">{form.name}</Card.Title>
        {#if form.application}
            {#if form.application.complete}
                <Badge class="pl-1 pr-2 gap-1 bg-green-500">
                    <CheckCircle></CheckCircle>
                    Complete
                </Badge>
            {:else}
                <Badge class="pl-1 pr-2 gap-1 bg-yellow-500">
                    <CircleAlert></CircleAlert>
                    Draft
                </Badge>
            {/if}
        {:else}
            <Badge variant="destructive" class="pl-1 pr-2 gap-1">
                <CircleAlert></CircleAlert>
                Required
            </Badge>
        {/if}
    </Card.Header>
    <Card.Content class="w-full p-0">
        <File class="w-full h-12"></File>
    </Card.Content>
    <Card.Footer class="w-full p-0">
        <a class="w-full" href={`/grant-user/grant/${toShort(grantId)}/form/${toShort(form.id)}`} target="_blank" 
            on:click={(e) => e.preventDefault()}>
            <Button class="w-full" on:click={() => goto(`/grant-user/grant/${toShort(grantId)}/form/${toShort(form.id)}`)}>Open Form</Button>
        </a>
    </Card.Footer>
</Card.Root>
