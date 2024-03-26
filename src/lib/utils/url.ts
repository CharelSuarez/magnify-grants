import shortUUID from "short-uuid";

export function toShort(uuid: string) {
    uuid = uuid.replace(/-/g, "");
    return shortUUID().fromUUID(uuid);
}

export function fromShort(short: string) {
    return shortUUID().toUUID(short);
}