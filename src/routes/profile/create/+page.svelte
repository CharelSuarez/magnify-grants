<script lang="ts">
	import type { PageData } from './$types';
	import ProfileForm from './ProfileForm.svelte';
	import { t } from '$lib/i18n/i18n';

	export let data: PageData;
</script>

<div class="mx-auto flex w-full h-screen flex-col justify-center space-y-6 sm:w-[350px]">
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">
			{$t('profile.createTitle')}
		</h1>
		<p class="text-sm text-muted-foreground">
			{$t('profile.instruction')}
		</p>
	</div>

	<ProfileForm data={data.form} />
</div>
