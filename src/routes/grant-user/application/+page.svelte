<script lang="ts">
	import type { PageData } from './$types';
	import SubmissionGrant from '$lib/custom_components/ui/grant-user/SubmissionGrant.svelte';
	import { toShort } from '$lib/utils/url';
	import { AcceptStatus } from '../../grant-admin/applications/application-table/app-acceptance-statuses';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;

	let search: string;
	let submissions = data.grants;

    let filter: Record <string , boolean> = {
        'Rejected': true,
        'In Progress': true,
        'Accepted': true
    };  

    function updateFilter(curr: string){
        filter[curr] = !filter[curr]
    }

	$: if (search) {

		submissions = submissions.filter((submission) =>
			submission.grant.title.toLowerCase().includes(search.toLowerCase()));
	} else {
		submissions = data.grants;
	}

    $: filtered = submissions.filter((submission) => filter[AcceptStatus.fromString(submission.status).name])


</script>

<main class="flex flex-col min-h-screen p-12">
	<div class="flex text-[3rem] font-satoshi font-bold mb-4">My Applications</div>
	<div class="flex gap-4 items-end mb-8">
		<input
			bind:value={search}
			class=" p-2 px-4 w-fit border-2 border-neutral-600 rounded-md font-bold"
			placeholder={'Search for Submissions'}
			type="text"
		/>
        <div class="flex text-[2rem] font-medium font-satoshi ">View By:</div>
        <div class="flex items-center gap-2">
            <Button on:click={()=> updateFilter('Accepted')} class={`hover:bg-teal-600 ${filter['Accepted']? 'bg-teal-500' : ''}`}>Accepted</Button>
            <Button on:click={()=> updateFilter('In Progress')} class={`hover:bg-teal-600 ${filter['In Progress']? 'bg-teal-500' : ''}`}>In Progress</Button>
            <Button on:click={()=> updateFilter('Rejected')}  class={`hover:bg-teal-600 ${filter['Rejected']? 'bg-teal-500' : ''}`}>Rejected</Button>
        </div>


	</div>

	<div class="flex"></div>
	<div class="grid grid-cols-4 gap-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
		{#each filtered as submission (submission.id)}
			<SubmissionGrant
				name="{submission.grant.title},"
				description="{submission.grant.description},"
				endpoint={`/grant-user/grant/${toShort(submission.grantId)}`}
				submissionDate={submission.submissionDate}
				status={AcceptStatus.fromString(submission.status)}
			/>
		{/each}
	</div>
</main>
