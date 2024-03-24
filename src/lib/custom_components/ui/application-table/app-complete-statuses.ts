import type { ComponentType } from "svelte";
import CheckCircled from "svelte-radix/CheckCircled.svelte";
import CrossCircled from "svelte-radix/CrossCircled.svelte";

export class CompleteStatus {
    static readonly COMPLETE = new CompleteStatus("COMPLETE", "Complete", CheckCircled, "fill-green-500");
    static readonly INCOMPLETE = new CompleteStatus("INCOMPLETE", "Draft", CrossCircled, "fill-red-500");

    private constructor(private readonly key: string, public readonly name: string, public readonly icon: ComponentType, public readonly color: string) {}

    public static fromString(name: string) : CompleteStatus {
        switch (name) {
            case CompleteStatus.COMPLETE.key:
                return CompleteStatus.COMPLETE;
            case CompleteStatus.INCOMPLETE.key:
                return CompleteStatus.INCOMPLETE;
            default:
                throw new Error(`Invalid complete status: ${name}`);
        }
    }

    public toString() : string {
        return this.key;
    }
}