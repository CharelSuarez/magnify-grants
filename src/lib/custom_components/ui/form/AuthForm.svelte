<script lang="ts">
	import { Button } from "$lib/components/ui/button";
    import wave from "$lib/assets/branding/images/wave_gradient.webp";

    export let title: string;
    export let image: string;
    export let alternate: {
            name: string,
            route: string,
        } | null = null;
</script>

    <div class="overflow-hidden p-10 container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-9">
        {#if alternate}
            <Button class="absolute right-5 top-5 md:right-9 md:top-9"
                href={alternate.route}
                variant="ghost">
                {alternate.name}
            </Button>
        {/if}
        <div class="relative hidden h-full flex-col p-10 lg:flex">
            <div class="absolute z-49 inset-0 bg-cover"
            style="background-image: url({wave}); transform: scaleX(-1);">
                <!-- <img class="z-50 hidden xl:inline" src={image} alt="Magnify Access Branding"> -->
            </div>
            <div class="relative z-50 flex text-neutral-700 items-center text-xl font-[900]">
                {title}
            </div>
        </div>
        <div class="lg:p-8">
            <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <slot />
            </div>
        </div>
    </div>