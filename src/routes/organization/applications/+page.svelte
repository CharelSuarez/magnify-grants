<script lang="ts">
    import GrantTable from "$lib/custom_components/ui/table/grant-table.svelte";
    import GrantTableFilter from "$lib/custom_components/ui/filter/grant-table-filter.svelte";
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Grant Management</h2>
			<p class="text-muted-foreground">View, filter, and action applications here!</p>
		</div>
	</div>
    <div class="flex flex-1 justify-between h-full w-full gap-10">
        <GrantTable class="w-full"/>
        <GrantTableFilter class="w-96 h-min items-center"/>
    </div>
</div>