<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import image from "$lib/assets/branding/images/magnify_logo.png";

    export let loggedIn: boolean;
</script>

<div class="flex justify-between px-10 py-5 shadow-lg items-center">
    <div class="flex items-center">
        <img src={image} alt="logo" class="h-12"/>
    </div>
    <div class="flex items-center">

        <Button class="mr-5" href="https://www.magnifyaccess.ai/">
            Home
        </Button>

        {#if loggedIn}
            <form action="/logout" method="POST">
                <Button type="submit">Log out</Button>
            </form>
        {:else}
            <Button class="mr-5" href="/login">Login</Button>
            <Button class="mr-5" href="/signup">Sign up</Button>
        {/if}

    </div>
</div>
