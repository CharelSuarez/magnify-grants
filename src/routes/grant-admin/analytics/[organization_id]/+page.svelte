<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { t, locale, locales } from '$lib/i18n/i18n';
	import { translations } from '$lib/i18n/translations';
	import { onMount } from 'svelte';

	export let data: PageData;
	let organization = data.organization;
	let fundsAllocated = data.fundsAllocated;
	let grantsPosted = data.totalGrants;
	let totalApplications = data.totalApplications;
	let acceptanceRate = data.acceptanceRate;
	let fundsAwarded = data.fundsAwarded;
	let grantsPerSector = data.grantsPerSector;
</script>

<div>
	<main>
		<div class="container mx-auto py-10">
			<div class="flex items-center justify-between space-y-2">
				<div>
					<h2 class="text-2xl font-bold tracking-tight">{$t('analytics.title')}</h2>
					<p class="text-muted-foreground">{$t('analytics.organization', { organizationName: organization?.name })}</p>
				</div>
			</div>
			<Separator />
			<div class="py-2 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4">
				<div class="col-span-2 hover:drop-shadow-md">
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-3xl">{$t('card.users.title')}</Card.Title>
							<Card.Description>{$t('card.users.description')}</Card.Description>
						</Card.Header>
						<Card.Content>
							<h1 class="text-7xl">{totalApplications} {$t('card.users.content')}</h1>
						</Card.Content>
					</Card.Root>
				</div>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>{$t('card.grants.title')}</Card.Title>
						<Card.Description>{$t('card.grants.description')}</Card.Description>
					</Card.Header>
					<Card.Content>
						<h1 class="text-7xl">{grantsPosted}</h1>
					</Card.Content>
				</Card.Root>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>{$t('card.funding.title')}</Card.Title>
						<Card.Description>{$t('card.funding.description')}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p class="text-3xl">{fundsAwarded} / {fundsAllocated}</p>
					</Card.Content>
				</Card.Root>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>{$t('card.sectors.title')}</Card.Title>
					</Card.Header>
					<Card.Content>
						{#each grantsPerSector as sector}
							<p>{$t(`card.sectors.${sector.sector.replace("_", "").toLowerCase()}`)}: {sector._count.sector}</p>
						{/each}
					</Card.Content>
				</Card.Root>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>{$t('card.acceptanceRate.title')}</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-7xl">{acceptanceRate}%</p>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</main>
</div>