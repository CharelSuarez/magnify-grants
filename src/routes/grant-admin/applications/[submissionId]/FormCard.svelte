<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { t } from '$lib/i18n/i18n';
	import { toShort } from '$lib/utils/url';
	import { File } from 'lucide-svelte';

	export let application: {
		form: {
			name: string;
		};
		formId: string;
		id: string;
	};
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
	<Card.Header class="flex flex-col w-full items-center p-0">
		<Card.Title class="break-all text-xl w-full text-center">{application.form.name}</Card.Title>
	</Card.Header>
	<Card.Content class="w-full p-0">
		<File class="w-full h-12" />
	</Card.Content>
	<Card.Footer class="flex justify-between w-full p-0 gap-2">
		<Button
			class="w-full"
			href={`/grant-user/application/${toShort(application.id)}/form/${toShort(application.formId)}`}
			target="_blank"
		>
			{$t('grant.application.open_form')}
		</Button>
	</Card.Footer>
</Card.Root>
