<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import File from 'lucide-svelte/icons/file-text';
	import { t } from '$lib/i18n/i18n';

	export let doc: {
		name: string;
		url: string;
		prompt?: string;
	};
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
	<Card.Header class="flex flex-col w-full items-center p-0">
		<Card.Title class="break-all text-xl w-full text-center">{doc.name}</Card.Title>
	</Card.Header>
	<Card.Content class="w-full p-0">
		<File class="w-full h-12"></File>
	</Card.Content>
	<Card.Footer class="flex flex-col space-y-3 w-full p-0">
		{#if doc.prompt}
			<Card.CardDescription class="font-bold break-all">{doc.prompt}</Card.CardDescription>
		{/if}
		<a href={doc.url} target="_blank">
			<Button class="w-full break-all">{$t('grant.application.download_document')}</Button>
		</a>
	</Card.Footer>
</Card.Root>
