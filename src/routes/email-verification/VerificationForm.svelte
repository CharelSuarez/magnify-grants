<script lang="ts">
    import image from "$lib/assets/branding/images/magnify_image.webp";
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Loader2 } from "lucide-svelte";
    import { zodClient } from "sveltekit-superforms/adapters";

    import {
        codeSchema,
        type CodeSchema
    } from "$lib/validation/auth_schema";

    import {
        type SuperValidated,
        type Infer,
        superForm
    } from "sveltekit-superforms";

    export let data: SuperValidated<Infer<CodeSchema>>;

    let isLoading = false;

    let form = superForm(data, {
        validators: zodClient(codeSchema),
        onSubmit: () => isLoading = true,
        onResult: () => setTimeout(() => isLoading = false, 1000),
    });

    const { form: formData, enhance } = form;

</script>

<form method="POST" use:enhance class="grid gap-4">
    <Form.Field {form} name="code" class="grid">
        <Form.Control let:attrs>
            <Form.Label>
                <p class="text-muted-foreground text-sm">Confirmation Code</p>
            </Form.Label>
            <Input placeholder="12345678" {...attrs} bind:value={$formData.code}/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled={isLoading}>
        {#if isLoading}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Verify
    </Form.Button>
</form>