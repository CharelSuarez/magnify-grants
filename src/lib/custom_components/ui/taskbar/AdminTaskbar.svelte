<script lang="ts">
	import Branding from '../grant-admin/nav/Branding.svelte';
	import AdminNav from './AdminNav.svelte';
</script>

<div
	class="top-0 flex justify-between px-10 py-3 shadow-lg items-center fixed w-full z-[30] backdrop-blur-md bg-opacity-40 gap-10"
>
	<Branding />
	<div class="flex justify-between items-center grow">
		<AdminNav horizontal></AdminNav>
	</div>
</div>
