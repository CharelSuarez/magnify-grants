<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import Palette from 'lucide-svelte/icons/palette';
	import { t } from '$lib/i18n/i18n';

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

	const updateFilter = (saturation: number, contrast: number) => {
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
		<Button aria-label="Website color options" builders={[builder]} class="gap-2" variant="outline">
			<span><Palette strokeWidth={1} /></span>
			{$t('nav.colour_selection')}
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>{$t('colour_selection.adjust_saturation')}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<div class="flex flex-wrap justify-center">
			<Button aria-label="Very low saturation" on:click={() => (colour.saturation = 0)} variant="outline"
				>{$t('colour_selection.very_low')}</Button
			>
			<Button aria-label="Low saturation" on:click={() => (colour.saturation = 50)} variant="outline"
				>{$t('colour_selection.low')}</Button
			>
			<Button aria-label="Normal saturation" on:click={() => (colour.saturation = 100)} variant="outline"
				>{$t('colour_selection.normal')}</Button
			>
			<Button aria-label="High saturation"on:click={() => (colour.saturation = 150)} variant="outline"
				>{$t('colour_selection.high')}</Button
			>
			<Button aria-label="Very High saturation" on:click={() => (colour.saturation = 200)} variant="outline"
				>{$t('colour_selection.very_high')}</Button
			>
		</div>
		<DropdownMenu.Label>{$t('colour_selection.adjust_contrast')}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<div class="flex flex-wrap justify-center">
			<Button aria-label="Normal contrast" on:click={() => (colour.contrast = 100)} variant="outline"
				>{$t('colour_selection.normal')}</Button
			>
			<Button aria-label="High contrast" on:click={() => (colour.contrast = 150)} variant="outline"
				>{$t('colour_selection.high')}</Button
			>
			<Button aria-label="Very High contrast" on:click={() => (colour.contrast = 200)} variant="outline"
				>{$t('colour_selection.very_high')}</Button
			>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
