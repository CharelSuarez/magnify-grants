<script lang="ts">
	import type { PageData } from './$types';
	import SubmissionGrant from '$lib/custom_components/ui/grant-user/SubmissionGrant.svelte';
	import { toShort } from '$lib/utils/url';
	import { AcceptStatus } from '../../grant-admin/applications/application-table/app-acceptance-statuses';
    

	export let data: PageData;

    let search : string;
	let submissions = data.grants;

    $: if (search) {
		submissions = submissions.filter((submission) => submission.grant.title.toLowerCase().includes(search.toLowerCase()));
	}else{
		submissions = data.grants;
	}
</script>

<main class="flex flex-col min-h-screen p-12">
	<div class="flex text-[3rem] font-satoshi font-bold mb-4">My Applications</div>
	<input
		bind:value={search}
		class=" p-2 px-4 w-fit  border-2 border-neutral-600 rounded-md font-bold mb-8"
		placeholder={"Search for Submissions"}
		type="text"
	/>
    <div class="flex">
        
    </div>
	<div class="grid grid-cols-4 gap-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
		{#each submissions as submission (submission.id)}
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
