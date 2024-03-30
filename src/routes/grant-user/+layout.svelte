<script lang="ts">
	import Footer from '$lib/custom_components/ui/footer/Footer.svelte';
import Taskbar from '$lib/custom_components/ui/taskbar/Taskbar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Taskbar admin={data.admin} loggedIn={data.loggedIn}/>
<div class="pt-[88px]">
	<slot/>
</div>

