<script lang="ts">
	import { AcceptStatus } from '../../../../routes/grant-admin/applications/application-table/app-acceptance-statuses';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import logo from '$lib/assets/branding/images/rbc-icon-template.png';
	import circle_500 from '$lib/assets/abstract/circle-500.png';
	import circle_700 from '$lib/assets/abstract/circle-700.png';
	import circle_800 from '$lib/assets/abstract/circle-800.png';

	import Status from '../status/Status.svelte';

	import { t } from '$lib/i18n/i18n';


	export let name: string;
	export let description: string;
	export let endpoint: string;
	export let submissionDate: Date | null;
    export let status: AcceptStatus;


	const handleClick = () => {
		goto(endpoint);
	};
</script>

<Button
class="flex h-[350px] bg-white border-4 border-teal-500 shadow-xl justify-start p-4 w-[1fr] min-w-[250px] rounded-lg text-black cursor-pointer hover:scale-90
transition-all duration-500 ease-out flex-col hover:bg-white relative overflow-hidden "
	on:click={handleClick}
>	
	<div class="flex w-full  gap-4 mb-4">
		<img src={logo} alt="" class="h-[40px] self-center">
		<h1 class="flex text-[1.5rem] font-bold w-full text-wrap leading-10 text-left ">{name}</h1>

		<!-- <Badge class={`flex gap-4 max-h-12 px-4 ${AcceptStatus.fromString(status).bg} hover:${AcceptStatus.fromString(status).bg}`}>
			{status.toString()} 
			<svelte:component this={AcceptStatus.fromString(status).icon} class={``}/>
		</Badge> -->

		<Status status={status} />
		
	</div>



	<div class="flex w-full gap-2 text-[1rem] mb-2">
		<p class="text-left font-bold text-teal-800">{$t('label.description')}:</p>
		<p class=" overflow-hidden text-ellipsis ">{description}</p>
	</div>


	
	<p class="w-full text-left  bottom-4 left-4 font-bold text-[1rem]">
	 <span class=" text-teal-800">Submission Date: </span> {submissionDate ? submissionDate.toLocaleDateString() : "None"}
	</p>

	<img src={circle_500} alt="" class=" absolute bottom-[-25%] left-[-25%] z-20" />
	<img src={circle_700} alt="" class=" absolute bottom-[-30%] left-[0] z-10" />
	<img src={circle_800} alt="" class=" absolute bottom-[-35%] left-[25%] z-0" />
</Button>
