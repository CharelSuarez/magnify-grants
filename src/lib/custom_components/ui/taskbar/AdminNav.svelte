<script lang="ts">
	import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
    import { ListTodo, Users, Home, UsersRound, LogOut, Newspaper, HandCoins } from 'lucide-svelte';
	import TaskbarButton from './TaskbarButton.svelte';
	import ColourSelection from '../colour-selection/Colour-Selection.svelte';

    export let horizontal : boolean = true;
</script>

<div class="{horizontal ? 'flex' : 'grid grid-cols-1 w-full'} gap-5">
    <TaskbarButton path="/grant-admin" Icon={Home} string="admin.nav.overview"/>
    <TaskbarButton path="/grant-admin/grants" Icon={HandCoins} string="admin.nav.grants" />
    <TaskbarButton path="/grant-admin/applications" Icon={Newspaper} string="admin.nav.applications" />
    <TaskbarButton path="/grant-admin/form-builder" Icon={ListTodo} string="admin.nav.formbuilder" />
    <TaskbarButton path="/grant-admin/users" Icon={Users} string="admin.nav.users" />
</div>

<div class="{horizontal ? 'flex' : 'grid grid-cols-1 w-full'} gap-5"> 
    <TaskbarButton path="/" Icon={UsersRound} string="nav.view.userDashboard" variant='outline'/>
    <form action="/logout" method="POST" class="w-full">
        <TaskbarButton variant='destructive' post Icon={LogOut} string="nav.logOut" />
    </form>
    <LocaleSelection />
    <ColourSelection />
</div>