<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import Palette from 'lucide-svelte/icons/palette';

	interface Colour {
		saturation: number;
		contrast: number;
	}

	let colour: Colour = {
		saturation: 100,
		contrast: 100
	};

	const mapSat: any = {
		0: 'saturate-0',
		50: 'saturate-50',
		100: 'saturate-100',
		150: 'saturate-150',
		200: 'saturate-200'
	};

	const mapCon: any = {
		100: 'contrast-100',
		150: 'contrast-150',
		200: 'contrast-200'
	};

	const updateFilter = (saturation : number, contrast : number) => {
		if (typeof window === 'undefined') return;

		const classList = document.querySelector('html')?.classList;
		if (!classList) return;

		for (const className of classList) {
			if (className.startsWith('saturate-') || className.startsWith('contrast-')) {
				classList.remove(className);
			}
		}
		if (saturation != 100) classList.add(`${mapSat[saturation]}`);
		if (contrast != 100) classList.add(`${mapCon[contrast]}`);
	};

	$: updateFilter(colour.saturation, colour.contrast);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]} class="gap-2">
			<span><Palette strokeWidth={1}/></span>
			Colour Options
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Adjust Saturation</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<div class="flex flex-wrap justify-center">
			<Button variant="outline" on:click={() => (colour.saturation = 0)}>Very Low</Button>
			<Button variant="outline" on:click={() => (colour.saturation = 50)}>Low</Button>
			<Button variant="outline" on:click={() => (colour.saturation = 100)}>Normal</Button>
			<Button variant="outline" on:click={() => (colour.saturation = 150)}>High</Button>
			<Button variant="outline" on:click={() => (colour.saturation = 200)}>Very High</Button>
		</div>
		<DropdownMenu.Label>Adjust Contrast</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<div class="flex flex-wrap justify-center">
			<Button variant="outline" on:click={() => (colour.contrast = 100)}>Normal</Button>
			<Button variant="outline" on:click={() => (colour.contrast = 150)}>High</Button>
			<Button variant="outline" on:click={() => (colour.contrast = 200)}>Very High</Button>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
