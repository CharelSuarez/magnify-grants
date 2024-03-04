import type { ComponentType } from "svelte";
import CheckCircled from "svelte-radix/CheckCircled.svelte";
import CrossCircled from "svelte-radix/CrossCircled.svelte";

const completeStatuses: { [complete: string]: {name: string, icon: ComponentType, color: string} } = {
    "COMPLETE": {
        name: "Complete",
        icon: CheckCircled,
        color: "fill-green-500",
    },
    "INCOMPLETE": {
        name: "Incomplete",
        icon: CrossCircled,
        color: "fill-red-500",
    },
}

export {
    completeStatuses
};