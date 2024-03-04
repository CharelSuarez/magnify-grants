<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;
	let grants = data.grants;
</script>

<div>
	<h1>Grants</h1>
	<main>
		<div>
			{#each grants as grant (grant.id)}
				<Card.Root>
					<Card.Header>
						<Card.Title>{grant.title}</Card.Title>
						<Card.Description>{grant.organization.name}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>{grant.description}</p>
					</Card.Content>
					<Card.Footer>
						<Button>Apply</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</main>
</div>