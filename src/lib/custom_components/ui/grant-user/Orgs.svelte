<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import circle_500 from '$lib/assets/abstract/circle-500.png';
	import circle_700 from '$lib/assets/abstract/circle-700.png';
	import circle_800 from '$lib/assets/abstract/circle-800.png';
	import logo from '$lib/assets/branding/images/rbc-icon-template.png';
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
    transition-all duration-500 ease-out flex-col hover:bg-white relative overflow-hidden "
	on:click={handleClick}
>
	<div class="flex w-full gap-4 mb-4">
		<img src={logo} alt="" class="h-[40px] self-center" />
		<h1 class="flex w-full text-left text-[3rem] h-fit break-normal text-wrap leading-10 z-10">
			{name}
		</h1>
	</div>

	<div class="flex w-full gap-2 font-bold text-[1rem] mt-4">
		<p class="text-left break-all z-10 text-teal-700">{$t('label.description')}:</p>
		<p class=" text-ellipsis overflow-hidden font-normal">{description}</p>
	</div>

	<img src={circle_500} alt="" class=" absolute bottom-[-25%] left-[-25%] z-20" />
	<img src={circle_700} alt="" class=" absolute bottom-[-30%] left-[0] z-10" />
	<img src={circle_800} alt="" class=" absolute bottom-[-35%] left-[25%] z-0" />
</Button>
