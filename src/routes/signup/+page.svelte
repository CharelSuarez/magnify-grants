<script lang="ts">
	import AuthForm from "$lib/custom_components/ui/form/AuthForm.svelte";
    import image from "$lib/assets/branding/images/magnify_image.webp";

    let alternate = {
        name: "Login",
        route: "/login"
    };

</script>

<AuthForm
    title="Magnify Access"
    {image}
    {alternate}>

    <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p class="text-sm text-muted-foreground">
            Enter your email below to create your account
        </p>
    </div>

    <p class="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="/terms" class="underline underline-offset-4 hover:text-primary">
            Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
            Privacy Policy
        </a>
        .
    </p>

</AuthForm>