import Stopwatch from "svelte-radix/Stopwatch.svelte";
import CheckCircled from "svelte-radix/CheckCircled.svelte";
import CrossCircled from "svelte-radix/CrossCircled.svelte";
import type { ComponentType } from "svelte";

const statuses: { [status: string]: {name: string, icon: ComponentType, color: string} } = {
    "PENDING": {
        name: "In Progress",
        icon: Stopwatch,
        color: "fill-yellow-500",
    },
    "ACCEPTED": {
        name: "Accepted",
        icon: CheckCircled,
        color: "fill-green-500",
    },
    "REJECTED": {
        name: "Rejected",
        icon: CrossCircled,
        color: "fill-red-500",
    },
}

export {
	statuses
};