<script lang="ts">
	import AuthForm from "$lib/custom_components/ui/form/AuthForm.svelte";
    import image from "$lib/assets/branding/images/magnify_image.webp";
	import SignupForm from "./SignupForm.svelte";
	import type { PageData } from "./$types";

    let alternate = {
        name: "Login",
        route: "/login"
    };

    export let data: PageData;

</script>

<AuthForm
    title="Magnify Access"
    {image}
    {alternate}>

    <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p class="text-sm text-muted-foreground">
            Fill in your details to create your account
        </p>
    </div>

    <SignupForm data={data.form} />

    <p class="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="/terms" class="underline underline-offset-4 hover:text-primary">
            Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
            Privacy Policy
        </a>
    </p>

    <p class="px-8 text-center text-sm text-muted-foreground">
        <a href="/login" class="underline-offset-4 hover:text-primary hover:underline">
            Log in instead
        </a>{" "}
    </p>



</AuthForm>