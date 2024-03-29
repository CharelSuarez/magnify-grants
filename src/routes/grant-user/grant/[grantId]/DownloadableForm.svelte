<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import File from 'lucide-svelte/icons/file-text';
	import { t } from '$lib/i18n/i18n';

	export let doc: {
		name: string;
		url: string;
	};
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
	<Card.Header class="flex flex-col w-full items-center p-0">
		<Card.Title class="break-all text-xl w-full text-center">{doc.name}</Card.Title>
	</Card.Header>
	<Card.Content class="w-full p-0">
		<File class="w-full h-12"></File>
	</Card.Content>
	<Card.Footer class="w-full p-0">
		<Button class="w-full break-all" href={doc.url}
			>{$t('grant.application.download_document')}</Button
		>
	</Card.Footer>
</Card.Root>
