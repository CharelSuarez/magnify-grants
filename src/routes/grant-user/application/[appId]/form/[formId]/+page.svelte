<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toShort } from '$lib/utils/url';
	import { t } from '$lib/i18n/i18n';
	import ViewFormField from './ViewFormField.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import { goto } from '$app/navigation';
	import Eye from 'lucide-svelte/icons/eye';

	export let data: PageData;

	const banner = data.banner;
	const form = data.form;
	const grant = data.grant;
	const formData = data.formData;
	const submission = data.submission;

</script>

<div
	class="min-h-full flex-1 flex-row p-20 pt-10 flex items-start justify-center gap-10 box-border"
>
	<div class="hidden md:flex basis-1/4 w-full"></div>
	<div
		class="min-h-screen hidden basis-1/4 flex-grow-0 md:flex flex-col justify-end
		h-full items-start space-y-4 fixed w-1/4 bottom-0 left-0 p-16"
	>
		<Alert.Root>
			<AlertCircle class="h-4 w-4"></AlertCircle>
			<Alert.Title>Note</Alert.Title>
			<Alert.Description
				>This form has been submitted, but can still be viewed.</Alert.Description
			>
		</Alert.Root>
		<div class="flex gap-2">
			<Badge variant="outline" class="text-md mt-1">GRANT</Badge>
			<h2 class="text-2xl font-bold tracking-tight">{grant?.title || 'Unknown'}</h2>
		</div>
		{#if banner}
			<Card.Root>
				<Card.Content class={'aspect-video w-full p-0 rounded-inherit'}>
					<img
						class={'h-full w-full object-cover transition-all hover:scale-105 rounded-inherit'}
						src={banner}
						alt={grant.bannerAlt || ''}
					/>
					<!-- TODO Grant image alt text! -->
				</Card.Content>
			</Card.Root>
		{/if}
		<a
			class="w-full"
			href={`/grant-user/grant/${!grant ? '' : toShort(grant.id)}`}
			target="_blank"
			on:click={(e) => e.preventDefault()}
		>
			<Button
				on:click={() => {
					goto(`/grant-user/grant/${!grant ? '' : toShort(grant.id)}`);
				}}
				size="lg"
				variant="secondary"
				class="w-full text-md gap-2"
				disabled={!grant}
			>
				<ExternalLink class="h-4 w-4"></ExternalLink>
				<span>{$t('grant.form.return')}</span>
			</Button>
		</a>
	</div>
	<div class="basis-1/2 w-full h-full flex flex-1 flex-col justify-start items-center space-y-10">
		<div class="flex gap-2 items-center">
			<Badge variant="outline" class="text-md mt-1 max-h-10 gap-1">
				<Eye strokeWidth={1} class="h-8 w-8"></Eye>
				<span>FORM</span>
			</Badge>
			<h2 class="text-4xl font-bold tracking-tight">{grant?.title || 'Unknown'}: {form.name}</h2>
		</div>
		{#each form.fields as field}
			<ViewFormField {field} value={formData[field.id]}></ViewFormField>
		{/each}
	</div>
	<div class="hidden xl:flex basis-1/4 w-full"></div>
</div>
