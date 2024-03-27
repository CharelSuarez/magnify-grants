<script lang="ts">
	import AuthForm from '$lib/custom_components/ui/form/AuthForm.svelte';
	import SignupForm from './SignupForm.svelte';
	import type { PageData } from './$types';
	import { t } from '$lib/i18n/i18n';

	let alternate = {
		name: $t('nav.login'),
		route: '/login'
	};

	export let data: PageData;
</script>

<AuthForm title="Magnify Access" {alternate}>
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">
			{$t('signup.title')}
		</h1>
		<p class="text-sm text-muted-foreground">
			{$t('signup.description')}
		</p>
	</div>

	<SignupForm data={data.form} />

	<p class="px-8 text-center text-sm text-muted-foreground">
		{$t('signup.terms')}{' '}
		<a href="/terms" class="underline underline-offset-4 hover:text-primary">
			{$t('signup.termsOfService')}
		</a>{' '}
		and{' '}
		<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
			{$t('signup.privacyPolicy')}
		</a>
	</p>

	<p class="px-8 text-center text-sm text-muted-foreground">
		<a href="/login" class="underline-offset-4 hover:text-primary hover:underline">
			{$t('signup.loginInstead')}
		</a>
	</p>
</AuthForm>
