<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import DownloadableForm from '../../../grant-user/grant/[grantId]/DownloadableForm.svelte';
	import type { PageData } from './$types';
	import FormCard from './FormCard.svelte';
	import { t } from '$lib/i18n/i18n';
	import ProfileCard from '$lib/custom_components/ui/grant-admin/profile-card/ProfileCard.svelte';
	import { ArrowUpRightFromSquare, Badge, Check, Cross, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ApplicationStatus } from '@prisma/client';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { Slider } from '$lib/components/ui/slider';
	import { Input } from '$lib/components/ui/input';
	import { toShort } from '$lib/utils/url';

	export let data: PageData;

	let amount: number[] = [0];

	$: amountToAward = amount[0];

	const updateStatus = async (status: ApplicationStatus) => {
		const res = await fetch('/grant-admin/applications/approve/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: submission.id,
				status,
				amount: amountToAward
			})
		});

		if (res.status === 200) {
			await updateFlash(page);
			submission.status = status;
		}
	};

	const submission = data.submission;
	const documents = data.documents;
	const userProfile = data.userProfile;
</script>

<div class="h-full flex-1 flex-col p-20 pt-10 md:flex items-center">
	<div class="flex items-center flex-col space-y-10 w-full">
		<div class="flex flex-row w-full">
			<div class="basis-3/4 space-y-4">
				<h2 class="text-4xl font-bold tracking-tight">
					<div class="flex gap-4">
						<span>{submission.grant.title}</span>
						<Button
							class="items-center"
							variant="outline"
							href={`/grant-user/grant/${toShort(submission.grant.id)}`}
						>
							<ArrowUpRightFromSquare class="mr-2" />
							Visit Grant Page
						</Button>
					</div>
				</h2>
				<p class="text-muted-foreground w-full">
					{submission.grant.description}
				</p>
				<div class="flex items-center flex-col space-y-10">
					{#if submission.applications.length !== 0}
						<Card.Root class="bg-secondary w-full p-6 rounded-lg">
							<h2 class="text-3xl font-bold tracking-tight text-center mb-2">Forms</h2>
							<p class="tracking-tight text-center mb-8 text-muted-foreground">
								Here are the forms the user submitted
							</p>
							<div class="flex justify-center w-full gap-10 items-center">
								{#each submission.applications as app}
									<FormCard application={app} {submission}/>
								{/each}
							</div>
						</Card.Root>
					{/if}
				</div>
			</div>

			{#if data && userProfile}
				<ProfileCard classNames="basis-1/4 h-full" profile={userProfile} />
			{/if}
		</div>
		{#if submission.status === ApplicationStatus.IN_PROGRESS}
		<Separator></Separator>
		<div class="!mt-5 space-y-2 w-fit">
			<Input bind:value={amountToAward} placeholder={'Amount to award...'} />
			<Slider
				bind:value={amount}
				max={submission.grant.rangeHigh}
				min={submission.grant.rangeLow}
				step={1}
			/>
			<div class="flex w-full justify-center gap-5 !mt-5">
				<Button
					class="items-center"
					variant="destructive"
					on:click={() => updateStatus(ApplicationStatus.REJECTED)}
				>
					<X class="mr-2" />
					Deny User for Grant
				</Button>

				<Button
					class="items-center"
					variant="outline"
					on:click={() => updateStatus(ApplicationStatus.ACCEPTED)}
				>
					<Check class="mr-2" />
					Approve User for Grant
				</Button>
			</div>
		</div>
	{/if}
	</div>
</div>
