<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip/index.js"
    import {getAge} from "$lib/utils/date"
    import { Cake } from "lucide-svelte";

	  export let value: Date | null | undefined;
</script>

<div class="flex w-[100px] items-center gap-2">
    <span>
      {value ? getAge(value) : "Unknown"}
    </span>
    <Tooltip.Root>
        <Tooltip.Trigger>
          <Cake strokeWidth={1.5} size={20}></Cake>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Date of Birth: {value ? value.toLocaleDateString() : "Unknown"}</p>
        </Tooltip.Content>
    </Tooltip.Root>
</div>