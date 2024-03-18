<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	export let data: PageData;
	let grants = data.grants;
</script>

<div>
	<main>
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
						<Button>Apply</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</main>
</div>