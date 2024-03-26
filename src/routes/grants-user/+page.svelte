<script lang="ts">
	import type { PageData } from './$types';
    import { toShort } from '$lib/utils/url';

	import logo from '$lib/assets/branding/images/magnify_logo.png';
	import Orgs from '$lib/custom_components/ui/grant-user/Orgs.svelte';

	export let data: PageData;
	let grants = data.grants;
	let orgs = data.organizations;

	let search: string | undefined;

</script>

<main class="flex-col min-h-screen h-auto font-satoshi">
	<div
		class="flex fixed top-0 h-fit w-full shadow-lg backdrop-blur-md z-40 p-8 px-16 justify-between"
	>
		<img src={logo} alt="logo" class="h-10" />
		<div class="flex font-medium text-teal-600">
			<a href="/" class="mr-5">MagnifyAccess</a>
			<a href="/" class="mr-5">home</a>
		</div>
	</div>

	<div class="flex p-[3rem] text-[5rem] font-bold mt-[100px]">Grants</div>
	<div class="flex mb-8 w-full px-[3rem] flex-col relative min-h-[300px]">
		<div class="flex w-[95%] h-2 bg-black absolute bottom-[40%] rounded-full -z-10"></div>
		<div class="flex">
			<h1 class="text-teal-600 font-bold text-3xl ml-8">Organizations</h1>
			<input
				type="text"
				placeholder="Search for Organizations"
				class=" px-2 w-fit ml-4 border-2 border-neutral-600 rounded-md font-bold"
				bind:value={search}
			/>
		</div>
		<div class="flex ml-12 mt-8 gap-8  text-[3rem] font-medium italic text-teal-600">
			{#if orgs.length === 0}
				<p>No organizations found</p>
			{/if}
			{#each orgs as org (org.id)}
				<Orgs name={org.name} description={org.description} id={org.id} endpoint={`/grants-user/${org.id}`} />
			{/each}
		</div>
	</div>

	<div class="flex mb-8 px-[3rem] flex-col mt-16 items-center">
		<div class="flex w-full">
			<h1 class="text-teal-600 font-bold text-3xl ml-8">Grants</h1>
			<input
				type="text"
				placeholder="Search for Grants"
				class=" px-2 w-fit ml-4 border-2 border-neutral-600 rounded-md font-bold"
			/>
		</div>
		<div class="grid grid-cols-6 grid-rows-auto ml-12 mt-8 w-[80%]">
			{#if orgs.length === 0}
				<p>No organizations found</p>
			{/if}

			{#each grants as grant (grant.id)}
				<Orgs
					name={grant.title}
					description={grant.description}
					id={grant.id}
					endpoint={`/grant/${toShort(grant.id)}`}
				/>
			{/each}
		</div>
	</div>
</main>
