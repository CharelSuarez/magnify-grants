<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let forms = data.response;
</script>

<div class="container mx-auto py-10">
	{#if data && forms}
		<DataTable {forms} />
	{/if}
</div>
