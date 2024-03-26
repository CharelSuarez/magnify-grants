<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import image from "$lib/assets/branding/images/magnify_logo.png";

    export let loggedIn: boolean;
</script>

<div class="flex justify-between px-10 py-5 shadow-lg items-center fixed w-full z-[10] backdrop-blur-md bg-opacity-40">
    <div class="flex items-center">
        <img src={image} alt="logo" class="h-12"/>
    </div>
    <div class="flex items-center font-satoshi">

        <Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="https://www.magnifyaccess.ai/">
            MaginfyAccess
        </Button>

        {#if loggedIn}
            <form action="/logout" method="POST">
                <Button type="submit" class="mr-5 bg-teal-700 hover:bg-teal-500">Log out</Button>
            </form>
        {:else}
            <Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="/login">Login</Button>
            <Button class="mr-5 bg-teal-700 hover:bg-teal-500" href="/signup">Sign up</Button>
        {/if}

    </div>
</div>
