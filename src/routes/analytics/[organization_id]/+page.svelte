<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';

	export let data: PageData;
	let organization = data.organization;
</script>

<div>
	<main>
		<div class="container mx-auto py-10">
			<div class="flex items-center justify-between space-y-2">
				<div>
					<h2 class="text-2xl font-bold tracking-tight">Analytics</h2>
					<p class="text-muted-foreground">{organization?.name} </p>
				</div>
			</div>
			<Separator />
			<div class="py-2 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4">
				<div class="col-span-2 hover:drop-shadow-md">
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-3xl">Users</Card.Title>
							<Card.Description>In the last month</Card.Description>
						</Card.Header>
						<Card.Content>
							<h1 class="text-7xl">50 applicants</h1>
						</Card.Content>
					</Card.Root>
				</div>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>Grants Posted</Card.Title>
						<Card.Description>In the last month</Card.Description>
					</Card.Header>
					<Card.Content>
						<h1 class="text-7xl">37</h1>
					</Card.Content>
				</Card.Root>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>Funding</Card.Title>
						<Card.Description>Allocated / Total</Card.Description>
					</Card.Header>
					<Card.Content>
						<p class="text-3xl">$5,530 / $15,000</p>
					</Card.Content>
				</Card.Root>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>Grants per sector</Card.Title>
					</Card.Header>
					<Card.Content>
						<p>Education: 27%</p>
						<p>Research: 43%</p>
						<p>Small business: 13%</p>
						<p>Non-profit: 17%</p>
					</Card.Content>
				</Card.Root>
				<Card.Root class="hover:drop-shadow-md">
					<Card.Header>
						<Card.Title>Acceptance rate</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-7xl">93%</p>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</main>
</div>