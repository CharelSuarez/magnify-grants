<script lang="ts">
	import image from '$lib/assets/branding/images/magnify_logo.png';
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import Shield from 'lucide-svelte/icons/shield';
	import LogOut from 'lucide-svelte/icons/log-out';
	import Newspaper from 'lucide-svelte/icons/newspaper';
	import HandCoins from 'lucide-svelte/icons/hand-coins';
	import ColourSelection from '$lib/custom_components/ui/colour-selection/Colour-Selection.svelte';
	import TaskbarButton from './TaskbarButton.svelte';
	import LogIn from 'lucide-svelte/icons/log-in';
	import SignUp from 'lucide-svelte/icons/user-round-plus';
	import Branding from '../grant-admin/nav/Branding.svelte';

	export let loggedIn: boolean;
	export let admin: boolean = false;
</script>

<div
	class="top-0 flex justify-between px-10 py-5 shadow-lg items-center fixed w-full z-[30] backdrop-blur-md bg-opacity-40"
>
	<Branding/>
	<div class="flex items-center font-satoshi gap-5">
		{#if loggedIn}
			{#if admin}
				<TaskbarButton path="/grant-admin" Icon={Shield} string="nav.view.grant-admin" variant="outline" />
			{/if}

			<TaskbarButton path="/grant-user" Icon={HandCoins} string="nav.view.grants" />
			<TaskbarButton path="/grant-user/application" Icon={Newspaper} string="nav.view.myApplications" />

			<form action="/logout" method="POST">
				<TaskbarButton variant='destructive' post Icon={LogOut} string="nav.logOut" />
			</form>
		{:else}
			<TaskbarButton href="/login" Icon={LogIn} string="nav.login" />
			<TaskbarButton href="/signup" Icon={SignUp} string="nav.signUp" />
		{/if}
		<div class="flex gap-4">
			<LocaleSelection />
			<ColourSelection />
		</div>
	</div>
</div>
