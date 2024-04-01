<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n/i18n';
    import { page } from '$app/stores';

	import type { ComponentType, SvelteComponent } from 'svelte';

	export let path : string | null = null;
    export let href = path;
    export let Icon : ComponentType;
    export let string : string;
    export let variant : 'destructive' | 'outline' | 'default' = 'default';
    export let post : boolean = false;

    let mainColor = 'bg-teal-700';
    let hoverColor = 'bg-teal-500';
    if (variant == 'destructive') {
        mainColor = 'bg-red-700';
        hoverColor = 'bg-red-500';
    } else if (variant == 'outline') {
        mainColor = '';
        hoverColor = 'bg-gray-300';
    }
</script>

<Button variant={variant} class={`${path == $page.url.pathname ? hoverColor : mainColor} hover:${hoverColor} gap-2 w-full`} 
        href={post ? undefined : href} type={post ? 'submit' : undefined}>
    <svelte:component this={Icon} class="h-5 w-5"></svelte:component>
    <span>{$t(string)}</span>
</Button>