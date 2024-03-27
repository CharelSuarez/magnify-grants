<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Role } from '@prisma/client';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { updateFlash } from 'sveltekit-flash-message';

	export let data: PageData;

	const profile = data.profile;

	const initials = `${profile.firstName.substring(0, 1)}.${profile.lastName.substring(0, 1)}`;
	const dateOfBirth = profile.dateOfBirth.toISOString().split('T')[0];

	let promoted = false;

	const promoteUser = async (e: Event) => {
		const form = e.target as HTMLFormElement;
		const body = new FormData(e.target as HTMLFormElement);

		const res = await fetch(form.action, { method: 'POST', body });

		if (res.status === 200) {
			promoted = true;
		}

		await updateFlash(page);
	};
</script>

<container class="flex w-screen flex-col items-center md:my-20">
	<div
		class="border-none border-2 px-[80px] py-[30px] space-y-5 relative items-center shadow-none md:shadow-2xl rounded-md flex flex-col"
	>
		<div class="inline object-cover ring-gray-300 ring-2 bg-gray-200 p-[80px] rounded-full">
			<span class="text-2xl text-muted-foreground">{initials}</span>
		</div>

		<div class="text-2xl pt-7 text-gray-700">{profile.firstName} {profile.lastName}</div>
		<div class="text-md text-gray-700">Date of birth: {dateOfBirth}</div>
		<div class="max-h-[200px] flex-grow"></div>

		{#if profile.user.role === Role.GRANT_USER && !promoted}
			<form method="POST" on:submit|preventDefault={promoteUser}>
				<Button type="submit" class="bg-gray-300 text-gray-700 hover:bg-gray-400"
					>Promote to organization admin</Button
				>
			</form>
		{/if}
	</div>
</container>
