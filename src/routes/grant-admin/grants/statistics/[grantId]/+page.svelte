<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { toShort } from '$lib/utils/url';
	import { t } from '$lib/i18n/i18n';
	import { Separator } from '$lib/components/ui/separator';
	import { Activity, DollarSign, Users } from 'lucide-svelte';

	export let data: PageData;
	let grant = data.grant;
	let amountAwarded = data.amountAwarded;
	let numApplicants = data.numApplicants;
	let acceptanceRate = data.acceptanceRate;
	let avgAmountAwarded = data.avgAmountAwarded;
</script>

<svelte:head>
	<title>{$t('page.title.postedGrants')}</title>
</svelte:head>

<div>
	<main class="flex-col min-h-screen h-auto">
		<div class="container mx-auto py-10">
			<div class="flex items-center justify-between space-y-2">
				<div>
					<h2 class="text-2xl font-bold tracking-tight">{$t('analytics.grant.title')}</h2>
					<p class="text-muted-foreground">{grant.title ? grant.title : "No Title"}</p>
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Total Funding Awarded</Card.Title>
							<DollarSign class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">${amountAwarded ? amountAwarded : 0}</div>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Applicants</Card.Title>
							<Users class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">{numApplicants}</div>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Acceptance Rate</Card.Title>
							<Activity class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">{acceptanceRate}%</div>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Average Amount Awarded</Card.Title>
							<DollarSign class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">${avgAmountAwarded || "N/A"}</div>
						</Card.Content>
					</Card.Root>
				</div>
			<Separator />
	</main>
</div>
