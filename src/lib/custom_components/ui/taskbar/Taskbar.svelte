<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import image from '$lib/assets/branding/images/magnify_logo.png';
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import { t } from '$lib/i18n/i18n';
	import Shield from 'lucide-svelte/icons/shield';
	import LogOut from 'lucide-svelte/icons/log-out';
	import Newspaper from 'lucide-svelte/icons/newspaper';
	import HandCoins from 'lucide-svelte/icons/hand-coins';

	import ColourSelection from '$lib/custom_components/ui/colour-selection/Colour-Selection.svelte';

	export let loggedIn: boolean;
	export let admin: boolean = false;
</script>

<div
	class="top-0 flex justify-between px-10 py-5 shadow-lg items-center fixed w-full z-[10] backdrop-blur-md bg-opacity-40"
>
	<div class="flex items-center">
		<a href="/">
			<img src={image} alt="logo" class="h-12" />
		</a>
	</div>
	<div class="flex items-center font-satoshi gap-5">
		<!-- <Button class=" bg-teal-700 hover:bg-teal-500" href="https://www.magnifyaccess.ai/">
			{$t('nav.magnifyAccess')}
		</Button> -->

		{#if loggedIn}
			{#if admin}
				<Button variant='outline' class="gap-1" href="/grant-admin">
					<Shield class="h-5 w-5"></Shield>
					<span>{$t('nav.view.grant-admin')}</span>
				</Button>
			{/if}

			<Button class="bg-teal-700 hover:bg-teal-500 gap-2" href="/grant-user">
				<HandCoins class="h-5 w-5"></HandCoins>
				<span>{$t('nav.view.grants')}</span>
			</Button>

			<Button class="bg-teal-700 hover:bg-teal-500 gap-2" href="/grant-user/application">
				<Newspaper class="h-5 w-5"></Newspaper>
				<span>{$t('nav.view.myApplications')}</span>
			</Button>

			<form action="/logout" method="POST">
				<Button type="submit" class="bg-red-700 hover:bg-teal-500 gap-1">
					<LogOut class="h-5 w-5"></LogOut>
					<span>{$t('nav.logOut')}</span>
				</Button>
			</form>
		{:else}
			<Button class="bg-teal-700 hover:bg-teal-500" href="/login">
				{$t('nav.login')}
			</Button>
			<Button class="bg-teal-700 hover:bg-teal-500" href="/signup">
				{$t('nav.signUp')}
			</Button>
		{/if}
		<LocaleSelection />
		<ColourSelection />
	</div>
</div>
