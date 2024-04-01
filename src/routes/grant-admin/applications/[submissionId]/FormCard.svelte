<script lang="ts">
	import { goto } from '$app/navigation';
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
	export let submission: { id: string };
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
	<Card.Header class="flex flex-col w-full items-center p-0">
		<Card.Title class="break-all text-xl w-full text-center">{application.form.name}</Card.Title>
	</Card.Header>
	<Card.Content class="w-full p-0">
		<File class="w-full h-12" />
	</Card.Content>
	<Card.Footer class="flex justify-between w-full p-0 gap-2">
		<a
			class="w-full"
			href={`/grant-admin/applications/${toShort(submission.id)}/form/${toShort(application.formId)}`}
			on:click={(e) => e.preventDefault()}
			target="_blank">
			<Button
				class="w-full"
				on:click={() => {
					goto(`/grant-admin/applications/${toShort(submission.id)}/form/${toShort(application.formId)}`);
				}}
			>
				{$t('grant.application.open_form')}
			</Button>
		</a>
	</Card.Footer>
</Card.Root>
