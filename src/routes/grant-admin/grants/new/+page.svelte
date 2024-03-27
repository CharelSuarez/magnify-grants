<script lang="ts">
	import type { PageData } from './$types.js';
	import SettingsForm from './new-grant-form.svelte';

	export let data: PageData;
</script>

<div class="container mx-auto py-10">
	<SettingsForm data={data.form} />
</div>