<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { toShort } from '$lib/utils/url';
	import File from 'lucide-svelte/icons/file-text';
	import CircleAlert from 'lucide-svelte/icons/alert-circle';
	import CheckCircle from 'lucide-svelte/icons/check-circle';
	import Eye from 'lucide-svelte/icons/eye';

	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n/i18n';

	export let grantId: string;

	export let form: {
		id: string;
		name: string;
		application?: {
			id: string;
			complete: boolean;
		};
	};

	$: appId = form.application?.id || '';
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
	<Card.Header class="flex flex-col w-full items-center p-0">
		<Card.Title class="break-all text-xl w-full text-center">{form.name}</Card.Title>
		{#if form.application}
			{#if form.application.complete}
				<Badge class="pl-1 pr-2 gap-1 bg-green-500">
					<CheckCircle></CheckCircle>
					{$t('grant.application.complete')}
				</Badge>
			{:else}
				<Badge class="pl-1 pr-2 gap-1 bg-yellow-500">
					<CircleAlert></CircleAlert>
					{$t('grant.application.draft')}
				</Badge>
			{/if}
		{:else}
			<Badge variant="destructive" class="pl-1 pr-2 gap-1">
				<CircleAlert></CircleAlert>
				{$t('grant.application.required')}
			</Badge>
		{/if}
	</Card.Header>
	<Card.Content class="w-full p-0">
		<File class="w-full h-12"></File>
	</Card.Content>
	<Card.Footer class="flex justify-between w-full p-0 gap-2">
		<a
			class="w-full"
			href={`/grant-user/grant/${toShort(grantId)}/form/${toShort(form.id)}`}
			target="_blank"
			on:click={(e) => e.preventDefault()}
		>
			<Button
				class="w-full"
				on:click={() => goto(`/grant-user/grant/${toShort(grantId)}/form/${toShort(form.id)}`)}
			>
				{#if form.application}
					<span>Edit Form</span>
				{:else}
					<span>{$t('grant.application.open_form')}</span>
				{/if}
			</Button>
		</a>
		{#if form.application}
			<a
				class="w-fit"
				href={`/grant-user/application/${toShort(appId)}/form/${toShort(form.id)}`}
				target="_blank"
				on:click={(e) => e.preventDefault()}
			>
				<Button
					class="w-10 p-0"
					on:click={() =>
						goto(`/grant-user/application/${toShort(appId)}/form/${toShort(form.id)}`)}
				>
					<Eye></Eye>
				</Button>
			</a>
		{/if}
	</Card.Footer>
</Card.Root>