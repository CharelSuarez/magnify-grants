<script lang="ts">
	import Taskbar from '$lib/custom_components/ui/taskbar/Taskbar.svelte';
	import shape_1 from '$lib/assets/abstract/shape_1.png';
	import shape_2 from '$lib/assets/abstract/shape_2.png';
	import shape_3 from '$lib/assets/abstract/shape_3.png';
	import magnify_logo from '$lib/assets/branding/images/magnify_image.webp';
	import type { PageData } from './$types';

	import { t } from '$lib/i18n/i18n';

	let colour = {
		saturation: 100,
		contrast: 100,
		saturationString: `saturate-100`,
		constrastString: `contrast-100`
	};

	export let data: PageData;

</script>

<Taskbar admin={data.admin} loggedIn={data.loggedIn} bind:colour={colour}/>
<main class={`flex-col min-h-screen h-auto ${colour.saturationString} ${colour.constrastString}`}>
	<div class="flex justify-center items-center h-screen relative flex-col font-satoshi">
		<h1 class="text-[9rem] font-bold max-sm:text-lg">
			{$t('home.title.first')}<span class="text-teal-500">{$t('home.title.second')} </span>
		</h1>

		<img
			src={shape_1}
			alt="abstract shape"
			class="absolute z-[-1] left-0 opacity-[.8] top-0 h-[600px]"
		/>
		<img
			src={shape_2}
			alt="abstract shape"
			class="absolute z-[-1] right-0 opacity-[.8] top-0 h-[500px]"
		/>
		<p class=" w-[45%] font-bold italic text-[1.8rem] text-teal-600">
			{$t('home.subtitle')}
		</p>
		<a
			href="#about"
			class="absolute font-semibold bottom-[20%] text-teal-500 border-4 border-teal-500 text-[2rem] right-[25%] px-8 py-2 rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300"
		>
			{$t('home.learnMore')}
		</a>
	</div>

	<div class="flex justify-center items-center h-screen relative" id="about">
		<img
			src={shape_3}
			alt="abstract shape"
			class="absolute z-[-1] left-0 opacity-[.8] top-[-200px] h-[600px]"
		/>
		<img
			src={shape_2}
			alt="abstract shape"
			class="absolute z-[-1] right-0 opacity-[.8] bottom-[-150px] h-[600px]"
		/>

		<div
			class="flex h-[80vh] w-[75vw] bg-teal-600 mt-12 rounded-xl relative overflow-hidden p-12 shadow-inset shadow-2xl cursor-default"
		>
			<div class="flex-col font-satoshi">
				<h1 class="text-white font-semibold text-[3.5rem] text-center">
					{$t('home.sectionTitle')}
				</h1>
				<p class="w-[60%] text-white ml-24 mt-8 text-[1.5rem] leading-[3rem] z-[20]">
					{$t('home.sectionDescription')}
				</p>
				<p class="w-[60%] font-bold text-white ml-24 mt-16 text-[3rem] leading-[3rem] z-[20]">
					{$t('home.missionStatement')}
				</p>
				<p class="w-[40%] text-white ml-32 mt-4 text-[1.5rem] leading-[3rem] z-[20]">
					{$t('home.missionGoal')}
				</p>
			</div>

			<img
				src={magnify_logo}
				alt="Magnify logo"
				class="absolute bottom-[-200px] right-[-200px] z-0"
			/>
		</div>
	</div>

	<footer
		class="flex flex-col justify-center items-center mt-[5rem] bg-teal-800 h-[150px] text-white cursor-default font-satoshi"
	>
		<div class="flex text-xl">
			{$t('footer.association')}
		</div>
		<div class="flex text-teal-950 font-bold italic text-lg">
			{$t('footer.developedBy')}
		</div>
	</footer>
</main>
