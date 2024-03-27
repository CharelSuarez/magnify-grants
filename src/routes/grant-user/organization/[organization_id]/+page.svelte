<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { toShort } from '$lib/utils/url';
	import { t } from '$lib/i18n/i18n';
	import logo from '$lib/assets/branding/images/magnify_logo.png';
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import Taskbar from '$lib/custom_components/ui/taskbar/Taskbar.svelte';

	export let data: PageData;
	let grants = data.grants;
</script>

<svelte:head>
	<title>Posted Grants</title>
</svelte:head>

<div>
	<main class="flex-col min-h-screen h-auto">
		<Taskbar loggedIn={data.loggedIn}/>

		<div class="container mx-auto py-10">


			<div class="flex items-center justify-between space-y-2">
				<div>
					{#if grants.length === 0}
						<h2 class="text-2xl font-bold tracking-tight">{$t('organizations.noGrantsFoundTitle')}</h2>
						<p class="text-muted-foreground">{$t('organizations.noGrantsFoundDesc')}</p>
					{:else}
						<h2 class="text-2xl font-bold tracking-tight">{grants[0].organization.name}'s
							{$t('organizations.grants')}</h2>
						<p class="text-muted-foreground">{$t('organizations.applyToday')}</p>
					{/if}
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				{#each grants as grant (grant.id)}
					<Card.Root>
						<Card.Header>
							<Card.Title>{grant.title}</Card.Title>
							<Card.Description>{grant.organization.name}</Card.Description>
						</Card.Header>
						<Card.Content>
							<p>{grant.description}</p>
							<Badge variant="secondary">Apply by: {grant.expirationDate}</Badge>
							<Badge
								variant="secondary">{$t(`card.sectors.${grant.sector.replace("_", "").toLowerCase()}`)}</Badge>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button variant="secondary">{$t('button.favorite')}</Button>
							<a href={`/grant/${toShort(grant.id)}`} target="_blank">
								<Button>{$t('button.apply')}</Button>
							</a>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</div>
	</main>
</div>