<script lang="ts">
    import GrantTable from "$lib/custom_components/ui/application-table/app-table.svelte";
    import GrantTableFilter from "./ApplicationFilter.svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Grant Management</h2>
			<p class="text-muted-foreground">View, filter, and action applications here!</p>
		</div>
	</div>
    <div class="flex flex-1 justify-between h-full w-full gap-10">
        <GrantTable class="w-4/5"/>
        <GrantTableFilter data={data.filter} class="w-1/5 h-min items-center"/>
    </div>
</div>