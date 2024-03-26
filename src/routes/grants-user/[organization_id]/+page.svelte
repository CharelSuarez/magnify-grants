<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { toShort } from '$lib/utils/url';

	export let data: PageData;
	let grants = data.grants;
</script>

<div>
	<main>
		<div class="container mx-auto py-10">
			<div class="flex items-center justify-between space-y-2">
				<div>
					<h2 class="text-2xl font-bold tracking-tight">Organizations</h2>
					<p class="text-muted-foreground">View grants and apply today!</p>
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
							<Badge variant="secondary">{grant.expirationDate}</Badge>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button variant="secondary">Favorite</Button>
							<a href={`/grant/${toShort(grant.id)}`} target="_blank">
								<Button>Apply</Button>
							</a>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</div>
	</main>
</div>