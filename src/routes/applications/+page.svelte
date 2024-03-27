<script lang="ts">
    import GrantTable from "$lib/custom_components/ui/application-table/AppTable.svelte";
    import GrantTableFilter from "./ApplicationFilter.svelte";
	import type { PageData, ActionData } from "./$types";
	import { writable, type Writable } from "svelte/store";
	import type { Application } from "$lib/validation/app_schema";

    export let data: PageData;
    export let form: ActionData;

    const applications : Writable<Application[]> = writable(data.applications);
    const updateApplications = (form : ActionData) => {
        if (form == null || form.applications == null) return;
        $applications = form.applications;
    }

    $: updateApplications(form);
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Grant Applications</h2>
			<p class="text-muted-foreground">View, filter, and action applications here!</p>
		</div>
	</div>
    <div class="flex flex-1 justify-between h-full w-full gap-10">
        <GrantTable {applications} class="w-4/5"/>
        <GrantTableFilter data={data.filter} class="w-1/5 h-min items-center"/>
    </div>
</div>