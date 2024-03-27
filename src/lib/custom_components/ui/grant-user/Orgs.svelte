<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/i18n/i18n';

	export let name: string;
	export let description: string;
	export let endpoint: string;

	const handleClick = () => {
		goto(endpoint);
	};
</script>

<Button
	class="flex h-[300px] bg-white border-4 border-teal-500 shadow-xl p-4 w-[250px] rounded-lg text-black cursor-pointer hover:scale-90
    transition-all duration-500 ease-out flex-col hover:bg-white"
	on:click={handleClick}
>
	<h1 class="flex text-[2rem] font-medium w-full">{name}</h1>
	<p class="w-full text-left">{$t('label.description')}:</p>
	<p class="flex w-full h-full justify-center items-center p-4">{description}</p>
</Button>
