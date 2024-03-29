<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let grants = data.response;
</script>

{#if data && grants}
	<div class="container mx-auto py-10">
		<DataTable {grants} />
	</div>
{/if}
