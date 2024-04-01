<script lang="ts">
	import type { PageData } from './$types';
	import { toShort } from '$lib/utils/url';

	import { t } from '$lib/i18n/i18n';

	import Orgs from '$lib/custom_components/ui/grant-user/Orgs.svelte';
	import Grants from '$lib/custom_components/ui/grant-user/Grants.svelte';

	export let data: PageData;
	let grants = data.grants;
	let orgs = data.organizations;

	let search: string;
	let searchGrant: string;


	$: if (search) {
		orgs = orgs.filter((org) => org.name.toLowerCase().includes(search.toLowerCase()));
	}else{
		orgs = data.organizations;
	}

	$: if (searchGrant) {
		grants = grants.filter((grant) => grant.title.toLowerCase().includes(searchGrant.toLowerCase()));
	}else{
		grants = data.grants;
	}


</script>

<main class="flex-col min-h-screen h-auto font-satoshi p-12 pt-4">
	<div class="flex text-[3rem] font-bold mb-4">{$t('page.title.postedGrants')}</div>
	<div class="flex mb-8 w-full flex-col items-center">
		<div class="flex w-full">
			<h1 class="text-teal-600 font-bold text-3xl">{$t('body.grants')}</h1>
			<input
				class=" px-2 w-fit ml-4 border-2 border-neutral-600 rounded-md font-bold"
				placeholder={$t('body.search.grants')}
				type="text"
				bind:value={searchGrant}
			/>
		</div>
		<div class="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 grid-rows-auto mt-8 w-[100%] gap-4 overflow-hidden">
			{#if grants.length === 0}
				<p class="mt-4 text-[3rem] font-medium italic text-teal-600">{$t('body.grants.notfound')}</p>
			{/if}

			{#each grants as grant (grant.id)}
				<Grants
					name={grant.title}
					description={grant.description}
					expirationDate="{grant.expirationDate}"
					endpoint={`/grant-user/grant/${toShort(grant.id)}`}
				/>
			{/each}
		</div>
	</div>
	<div class="flex mb-8 w-full flex-col relative min-h-[300px]">
		<div class="flex">
			<h1 class="text-teal-600 font-bold text-3xl">{$t('body.organization')}</h1>
				<input
				bind:value={search}
				class=" px-2 w-fit ml-4 border-2 border-neutral-600 rounded-md font-bold"
				placeholder={$t('body.search.organizations')}
				type="text"
			/>
		</div>
		<div class="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 grid-rows-auto 
		 gap-4 mt-8 text-[3rem] font-medium italic text-teal-600">
			{#if orgs.length === 0}
				<p class="w-[800px] ml-36">{$t('body.organizations.notfound')}</p>
			{/if}
			{#each orgs as org (org.id)}
				<Orgs
					name={org.name}
					description={org.description}
					endpoint={`/grant-user/organization/${toShort(org.id)}`}
				/>
			{/each}
		</div>
	</div>
</main>
