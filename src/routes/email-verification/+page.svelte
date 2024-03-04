<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	import { updateFlash } from "sveltekit-flash-message";
	import type { PageData } from "./$types";
	import VerificationForm from "./VerificationForm.svelte";
	import { page } from "$app/stores";

    const newCode = async () => {
        await fetch("/email-verification/resend-code", {
            method: "POST",
        });
        updateFlash(page);
    }

    export let data: PageData;
</script>

<div class="mx-auto flex w-full h-screen flex-col justify-center space-y-6 sm:w-[350px]">

    <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Confirm your email</h1>
        <p class="text-sm text-muted-foreground">
            Enter the code you received in your email
        </p>
    </div>

    <VerificationForm data={data.form}/>

    <div class="flex flex-col space-y-2 text-center">
        <Button
        variant="link"
        on:click={newCode}
        class="text-muted-foreground hover:text-primary">
            Resend Code
        </Button>
    </div>
</div>
