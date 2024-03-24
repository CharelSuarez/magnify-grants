import Stopwatch from "svelte-radix/Stopwatch.svelte";
import CheckCircled from "svelte-radix/CheckCircled.svelte";
import CrossCircled from "svelte-radix/CrossCircled.svelte";
import type { ComponentType } from "svelte";

export class AcceptStatus {
    static readonly PENDING = new AcceptStatus("PENDING", "In Progress", Stopwatch, "fill-yellow-500");
    static readonly ACCEPTED = new AcceptStatus("ACCEPTED", "Accepted", CheckCircled, "fill-green-500");
    static readonly REJECTED = new AcceptStatus("REJECTED", "Rejected", CrossCircled, "fill-red-500");

    private constructor(private readonly key: string, public readonly name: string, public readonly icon: ComponentType, public readonly color: string) {}

    public static fromString(name: string) : AcceptStatus {
        switch (name) {
            case AcceptStatus.PENDING.key:
                return AcceptStatus.PENDING;
            case AcceptStatus.ACCEPTED.key:
                return AcceptStatus.ACCEPTED;
            case AcceptStatus.REJECTED.key:
                return AcceptStatus.REJECTED;
            default:
                throw new Error(`Invalid acceptance status: ${name}`);
        }
    }

    public toString() : string {
        return this.key;
    }
}