<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let grants = data.response;
</script>

<div class="container mx-auto py-10">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Admin Panel</h2>
			<p class="text-muted-foreground">All posted grants</p>
		</div>
	</div>
	<DataTable grants={grants} />
</div>