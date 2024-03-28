<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { toShort } from '$lib/utils/url';
	import Paperclip from 'lucide-svelte/icons/paperclip';
	import File from 'lucide-svelte/icons/file-text';
	import CircleAlert from 'lucide-svelte/icons/alert-circle';

	export let form: {
		id: string;
		name: string;
	};
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
	<Card.Header class="flex flex-col w-full items-center p-0">
		<Card.Title class="text-xl w-full text-center">{form.name}</Card.Title>
		<Badge variant="destructive" class="pl-1 pr-2 gap-1">
			<CircleAlert></CircleAlert>
			Required
		</Badge>
	</Card.Header>
	<Card.Content class="w-full p-0">
		<File class="w-full h-12"></File>
	</Card.Content>
	<Card.Footer class="w-full p-0">
		<a class="w-full" href={`/form/${toShort(form.id)}`} target="_blank">
			<Button class="w-full">Open Form</Button>
		</a>
	</Card.Footer>
</Card.Root>
