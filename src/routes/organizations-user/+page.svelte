<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Image } from 'svelte-radix';
	import { Separator } from '$lib/components/ui/separator';

	import image from '$lib/assets/branding/images/magnify_image.webp';
	import { t } from '$lib/i18n/i18n';

	export let data: PageData;
	let orgs = data.organizations;
</script>

<svelte:head>
	<title>Available Granting Organizations</title>
</svelte:head>

<div>
	<main>
		<div class="container mx-auto py-10">
			<div class="flex items-center justify-between space-y-2">
				<div>
					<h2 class="text-2xl font-bold tracking-tight">{$t('organizations.title')}</h2>
					<p class="text-muted-foreground">{$t('organizations.subtitle')}</p>
				</div>
			</div>
			<Separator />
			<div class="py-2 grid grid-cols-3 gap-4">
				{#each orgs as org (org.id)}
					<Card.Root>
						<img class="h-auto max-w-full" src="{image}" alt="Organization Logo">
						<Card.Header>
							<Card.Title>{org.name}</Card.Title>
							<Card.Description>{org.description}</Card.Description>
						</Card.Header>
						<Card.Footer class="flex justify-between">
							<Button href={`/grants-user/${org.id}`}>{$t('organizations.viewGrants')}</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</div>
	</main>
</div>