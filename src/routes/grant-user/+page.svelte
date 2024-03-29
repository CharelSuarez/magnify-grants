<script lang="ts">
	import type { PageData } from './$types';
	import { toShort } from '$lib/utils/url';

	import { t } from '$lib/i18n/i18n';

	import Orgs from '$lib/custom_components/ui/grant-user/Orgs.svelte';
	import Grants from '$lib/custom_components/ui/grant-user/Grants.svelte';

	export let data: PageData;
	let grants = data.grants;
	let orgs = data.organizations;

	let search: string | undefined;
</script>

<main class="flex-col min-h-screen h-auto font-satoshi">
	<div class="flex p-[3rem] text-[5rem] font-bold ">{$t('body.organization')}</div>
	<div class="flex mb-8 w-full px-[3rem] flex-col relative min-h-[300px]">
		<div class="flex w-[95%] h-2 bg-black absolute bottom-[40%] rounded-full -z-10"></div>
		<div class="flex">
			<h1 class="text-teal-600 font-bold text-3xl ml-8">{$t('body.organization')}</h1>
			<input
				bind:value={search}
				class=" px-2 w-fit ml-4 border-2 border-neutral-600 rounded-md font-bold"
				placeholder={$t('body.search.organizations')}
				type="text"
			/>
		</div>
		<div class="flex ml-12 mt-8 gap-8 text-[3rem] font-medium italic text-teal-600">
			{#if orgs.length === 0}
				<p>{$t('body.organizations.notfound')}</p>
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

	<div class="flex mb-8 px-[3rem] flex-col mt-16 items-center">
		<div class="flex w-full">
			<h1 class="text-teal-600 font-bold text-3xl ml-8">{$t('body.grants')}</h1>
			<input
				class=" px-2 w-fit ml-4 border-2 border-neutral-600 rounded-md font-bold"
				placeholder={$t('body.search.grants')}
				type="text"
			/>
		</div>
		<div class="grid grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 grid-rows-auto ml-12 mt-8 w-[80%] gap-4 overflow-hidden">
			{#if grants.length === 0}
				<p>{$t('body.grants.notfound')}</p>
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
</main>
