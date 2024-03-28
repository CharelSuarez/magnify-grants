<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';

  interface Colour {
    saturation: number;
    contrast: number;
  }

	export let colour: Colour;


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
