<script lang="ts">
	import { HandCoins, Home, ListTodo, Newspaper, Users } from 'lucide-svelte';
	import TaskbarButton from './TaskbarButton.svelte';
</script>

<TaskbarButton path="/grant-admin" Icon={Home} string="admin.nav.overview" />
<TaskbarButton path="/grant-admin/grants" Icon={HandCoins} string="admin.nav.grants" />
<TaskbarButton path="/grant-admin/applications" Icon={Newspaper} string="admin.nav.applications" />
<TaskbarButton path="/grant-admin/form-builder" Icon={ListTodo} string="admin.nav.formbuilder" />
<TaskbarButton path="/grant-admin/users" Icon={Users} string="admin.nav.users" />
