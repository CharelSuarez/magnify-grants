<script lang="ts">
    import "../app.pcss";
    import { page } from "$app/stores";
    import { getFlash } from "sveltekit-flash-message";
    import { Toaster } from "$lib/components/ui/sonner";
    import { toast } from "svelte-sonner";
    import { setMode } from "mode-watcher";

    setMode("light");

    const flash = getFlash(page);

    let richColors = false;

    $: if ($flash) {

        richColors = $flash.richColors == null ? false : $flash.richColors ? true : false;

        if ($flash.type === "message") {
            toast.message($flash.message, {
                description: $flash.description
            });
        } else if ($flash.type === "success") {
            toast.success($flash.message, {
                description: $flash.description
            });
        } else if ($flash.type === "error") {
            toast.error($flash.message, {
                description: $flash.description
            });
        }

    }


</script>

<slot />

<Toaster {richColors}/>