<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let profiles = data.response;
</script>

<div class="container mx-auto py-10">
	<DataTable {profiles} />
</div>
