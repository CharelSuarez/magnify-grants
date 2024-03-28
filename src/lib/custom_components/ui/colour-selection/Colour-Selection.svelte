<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';

  interface Colour {
    saturation: number;
    contrast: number;
  }

  let colour : Colour = {
		saturation: 100,
		contrast: 100
	};

	export let colourClass: string = 'saturate-100 contrast-100';

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

  $: colourClass = `${mapSat[colour.saturation]} ${mapCon[colour.contrast]}`;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]}>Open</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Adjust Saturation</DropdownMenu.Label>
		<DropdownMenu.Separator />
      <div class="flex flex-wrap justify-center">
        <Button variant="outline" on:click={() => colour.saturation = 0}>Very Low</Button>
        <Button variant="outline" on:click={() => colour.saturation = 50}>Low</Button>
        <Button variant="outline" on:click={() => colour.saturation = 100}>Normal</Button>
        <Button variant="outline" on:click={() => colour.saturation = 150}>High</Button>
        <Button variant="outline" on:click={() => colour.saturation = 200}>Very High</Button>
      </div>
    <DropdownMenu.Label>Adjust Contrast</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <div class="flex flex-wrap justify-center">
      <Button variant="outline" on:click={() => colour.contrast = 100}>Normal</Button>
      <Button variant="outline" on:click={() => colour.contrast = 150}>High</Button>
      <Button variant="outline" on:click={() => colour.contrast = 200}>Very High</Button>
    </div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
