<script lang="ts">
	import type { PageData } from './$types';
	import SettingsForm from './new-grant-form.svelte';

	export let data: PageData;
</script>

{#if data && data.form}
	<div class="container mx-auto py-10">
		<SettingsForm forms={data.forms} data={data.form} />
	</div>
{/if}
