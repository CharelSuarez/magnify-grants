<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import Slider from '$lib/components/ui/slider/slider.svelte';

  interface Colour {
    saturation: number[];
    contrast: number[];
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
		<DropdownMenu.Item>
      <Slider min={0} max={200} bind:value={colour.saturation} />
    </DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
