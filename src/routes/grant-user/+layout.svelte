<script lang="ts">
	import Taskbar from '$lib/custom_components/ui/taskbar/Taskbar.svelte';
	import type { PageData } from './$types';


	export let data: PageData;

	let colourClass: string;

</script>

<Taskbar admin={data.admin} loggedIn={data.loggedIn} bind:colourClass/>
<div class={`${colourClass} pt-[88px]`}>
	<slot/>
</div>

