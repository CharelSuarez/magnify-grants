<script lang="ts">
	import AuthForm from "$lib/custom_components/ui/form/AuthForm.svelte";
    import image from "$lib/assets/branding/images/magnify_image.webp";
    import LoginForm from "./LoginForm.svelte";
	import type { PageData } from "./$types";

    let alternate = {
        name: "Sign up",
        route: "/signup"
    };

    export let data: PageData;

</script>

<AuthForm
    title="Magnify Access"
    {image}
    {alternate}>

    <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Log in to your account</h1>
    </div>

    <LoginForm data={data.form} />

    <p class="px-8 text-center text-sm text-muted-foreground">
        <a href="/signup" class="underline-offset-4 hover:text-primary hover:underline">
            Sign up instead
        </a>{" "}
    </p>



</AuthForm>