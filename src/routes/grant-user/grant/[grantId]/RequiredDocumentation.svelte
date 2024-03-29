<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import Dropzone from 'svelte-file-dropzone';
	import CircleAlert from 'lucide-svelte/icons/alert-circle';
	import CheckCircle from 'lucide-svelte/icons/check-circle';
	import { requiredDocSchema } from '$lib/validation/app_schema';
	import { createEventDispatcher } from 'svelte';

	export let fieldName;
	export let submitted = false;
	let file: File;

	let errors: [{ message: string }] | undefined = undefined;

	const dispatch = createEventDispatcher();

	const handleFileUpload = (e: { detail: { acceptedFiles: [file: File] } }) => {
		const acceptedFile = {
			file: e.detail.acceptedFiles[0]
		};

		const parsedFiles = requiredDocSchema.safeParse(acceptedFile);

		if (!parsedFiles.success) {
			errors = JSON.parse(parsedFiles.error.message);
			return;
		}

		errors = undefined;

		file = parsedFiles.data.file;

		dispatch('uploaded', {
			file
		});
	};
</script>

<Card.Root class="flex flex-col justify-start h-min w-48 p-4 space-y-2">
	<Card.Header class="flex flex-col w-full items-center p-0">
		<Card.Title class="text-xl break-all w-full text-center">{fieldName}</Card.Title>

		{#if submitted || file}
			<Badge class="pl-1 pr-2 gap-1 bg-green-500">
				<CheckCircle></CheckCircle>
				Complete
			</Badge>
		{:else}
			<Badge variant="destructive" class="pl-1 pr-2 gap-1">
				<CircleAlert></CircleAlert>
				Required
			</Badge>
		{/if}
	</Card.Header>
	{#if !submitted}
		<Card.Content class="{errors ? 'border-red-500' : ''} w-full p-0">
			<Dropzone
				containerClasses="break-all justify-center min-h-[100px]"
				multiple={false}
				on:drop={handleFileUpload}
			>
				{#if file}
					{file.name}
				{:else}
					Drag a file to upload
				{/if}
			</Dropzone>
		</Card.Content>
	{/if}
	<Card.Footer class="w-full p-0">
		{#if errors}
			{#each errors as error}
				<p class="text-center text-red-500">{error.message}</p>
			{/each}
		{/if}
	</Card.Footer>
</Card.Root>
