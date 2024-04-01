<script lang="ts">
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
	import { UsersRound, LogOut } from 'lucide-svelte';
	import TaskbarButton from './TaskbarButton.svelte';
	import ColourSelection from '../colour-selection/Colour-Selection.svelte';
	import Branding from '../grant-admin/nav/Branding.svelte';
	import AdminNavButtons from './AdminNavButtons.svelte';
	import { Button } from '$lib/components/ui/button';

	export let horizontal: boolean = true;
</script>

<div class="{horizontal ? 'flex' : 'grid grid-cols-1 w-full'} gap-5">
	<AdminNavButtons />
</div>

<div class="{horizontal ? 'flex' : 'grid grid-cols-1 w-full'} gap-5">
	<a href="/">
		<Button size="icon" class="px-2" variant="outline">
			<UsersRound />
		</Button>
	</a>
	<form action="/logout" method="POST" class="w-full">
		<TaskbarButton variant="destructive" post Icon={LogOut} string="nav.logOut" />
	</form>
	<LocaleSelection />
	<ColourSelection />
</div>
