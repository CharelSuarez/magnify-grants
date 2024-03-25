<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip/index.js"
    import {getAge} from "$lib/utils/user"

	export let value: Date | null | undefined;
</script>

<div class="flex w-[100px] items-center">
    <Tooltip.Root>
        <Tooltip.Trigger>
          {value ? getAge(value) : ""}
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Date of Birth: {value ? value.toLocaleDateString() : ""}</p>
        </Tooltip.Content>
    </Tooltip.Root>
</div>