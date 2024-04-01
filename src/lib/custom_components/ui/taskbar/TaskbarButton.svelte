<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { t, locale } from '$lib/i18n/i18n';
	import { page } from '$app/stores';

	import type { ComponentType, SvelteComponent } from 'svelte';

	export let path: string | null = null;
	export let href = path;
	export let Icon: ComponentType;
	export let string: string;
	export let variant: 'destructive' | 'outline' | 'default' = 'default';
	export let post: boolean = false;

	let mainColor = 'bg-teal-700';
	let hoverColor = 'bg-teal-500';
	if (variant == 'destructive') {
		mainColor = 'bg-red-700';
		hoverColor = 'bg-red-500';
	} else if (variant == 'outline') {
		mainColor = '';
		hoverColor = 'bg-gray-300';
	}

	$: nameRaw = $t(string);
	$: name =
		($locale === 'fr' || $locale === 'es') && nameRaw.length > 12
			? nameRaw.substring(0, 10) + '...'
			: nameRaw; // quick hack so stuff doesn't overflow in nav bar :/
</script>

<a href={post ? undefined : href}>
	<Button
		{variant}
		class={`${path == $page.url.pathname ? hoverColor : mainColor} hover:${hoverColor} gap-2 w-full`}
		type={post ? 'submit' : undefined}
	>
		<svelte:component this={Icon} class="h-5 w-5"></svelte:component>
		<span>{name}<span></span></span></Button
	>
</a>
