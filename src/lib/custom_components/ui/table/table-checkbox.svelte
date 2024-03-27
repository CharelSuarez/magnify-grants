<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import type { Writable } from 'svelte/store';

	export let checked: Writable<boolean>;
	export let ariaLabel: string;
</script>

<Checkbox aria-label="{ariaLabel}" bind:checked={$checked} class="checkbox" />