<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import image from '$lib/assets/branding/images/rbc-grant-template.jpg';
	import { t } from '$lib/i18n/i18n';

	export let name: string;
	export let description: string;
	export let endpoint: string;

	const handleClick = () => {
		goto(endpoint);
	};
</script>

<Button
	class="flex h-[350px] bg-white border-4 border-teal-500 shadow-xl justify-start p-4 w-[1fr] min-w-[250px] rounded-lg text-black cursor-pointer hover:scale-90
    transition-all duration-500 ease-out flex-col hover:bg-white relative"
	on:click={handleClick}
>
	<h1 class="flex w-full text-left text-[2rem] h-fit break-normal text-wrap leading-10 z-10">
		{name}
	</h1>
	<div class="flex w-full gap-2 font-bold text-[1rem] mt-4">
		<p class="text-left break-all z-10">{$t('label.description')}: </p>
		<p class=" text-ellipsis overflow-hidden font-normal">{description}</p>
	</div>
	
	<img src={image} alt="Grant Banner" class=" absolute w-full p-4 bottom-0 max-h-full rounded-2xl">
</Button>