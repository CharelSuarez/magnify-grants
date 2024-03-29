<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import logo from '$lib/assets/branding/images/rbc-icon-template.png';

	import { t } from '$lib/i18n/i18n';

	export let name: string;
	export let description: string;
	export let endpoint: string;
	export let expirationDate: Date | null;

	const handleClick = () => {
		goto(endpoint);
	};
</script>

<Button
	class="flex h-fit bg-white border-4 border-teal-500 shadow-xl p-4 w-[1fr] rounded-lg text-black cursor-pointer hover:scale-90
    transition-all duration-500 ease-out flex-col hover:bg-white justify-start relative "
	on:click={handleClick}
>	
	<div class="flex w-full  gap-4 mb-4">
		<img src={logo} alt="" class="h-[40px] self-center">
		<h1 class="flex text-[1.5rem] font-bold w-full text-wrap leading-10 text-left ">{name}</h1>
	</div>


	<div class="flex w-full gap-2 text-[1rem] mb-2">
		<p class="text-left font-bold text-teal-800">{$t('label.description')}:</p>
		<p class=" overflow-hidden text-ellipsis ">{description}</p>
	</div>
	
	<p class="w-full text-left  bottom-4 left-4 font-bold text-[1rem]">
	 <span class=" text-teal-800">	{$t('grant.expirationDate')}</span> {expirationDate ? expirationDate.toLocaleDateString() : "None"}
	</p>
</Button>
