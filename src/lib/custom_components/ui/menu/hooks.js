import { readable } from "svelte/store";

/**
 * @param {any} initState
 */


function useState(initState) {
    let setValue;

    const theStore = readable(initState, set => {
        setValue = set;
        return () => { };
    });

    theStore.subscribe(val => { });

    return [theStore, setValue];
}

export { useState };
