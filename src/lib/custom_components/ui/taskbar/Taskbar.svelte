<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import image from '$lib/assets/branding/images/magnify_logo.png';
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import { t } from '$lib/i18n/i18n';

	import ColourSelection from '$lib/custom_components/ui/colour-selection/Colour-Selection.svelte';

	export let loggedIn: boolean;
	export let admin: boolean = false;

	interface Colour {
		saturation: number[];
		contrast: number[];
		saturationString: string;
	}

	export let colour : Colour;

	$: colour.saturationString = `saturate-[${colour.saturation[0]/100}]`;

</script>

<div
	class="top-0 flex justify-between px-10 py-5 shadow-lg items-center fixed w-full z-[10] backdrop-blur-md bg-opacity-40"
>
	<div class="flex items-center">
		<a href="/">
			<img src={image} alt="logo" class="h-12" />
		</a>
	</div>
	<div class="flex items-center font-satoshi">
		<Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="https://www.magnifyaccess.ai/">
			{$t('nav.magnifyAccess')}
		</Button>

		{#if loggedIn}
			{#if admin}
				<Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="/grant-admin">
					{$t('nav.view.grant-admin')}
				</Button>
			{/if}

			<Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="/grant-user">
				{$t('nav.view.grants')}
			</Button>

			<form action="/logout" method="POST">
				<Button type="submit" class="mr-5 bg-teal-700 hover:bg-teal-500">
					{$t('nav.logOut')}
				</Button>
			</form>
		{:else}
			<Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="/login">
				{$t('nav.login')}
			</Button>
			<Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="/signup">
				{$t('nav.signUp')}
			</Button>
		{/if}
		<LocaleSelection />
		<ColourSelection bind:colour={colour} />
	</div>
</div>
