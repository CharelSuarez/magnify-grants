<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Loader2 } from "lucide-svelte";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { t } from '$lib/i18n/i18n';

    import {
        signupSchema,
        type SignupSchema
    } from "$lib/validation/auth_schema";

    import {
        type SuperValidated,
        type Infer,
        superForm
    } from "sveltekit-superforms";

    export let data: SuperValidated<Infer<SignupSchema>>;

    let isLoading = false;

    let form = superForm(data, {
        validators: zodClient(signupSchema),
        onSubmit: () => isLoading = true,
        onResult: () => setTimeout(() => isLoading = false, 1000),
    });

    const { form: formData, enhance } = form;

</script>

<form method="POST" use:enhance class="grid gap-4">
    <Form.Field {form} name="email" class="grid">
        <Form.Control let:attrs>
            <Form.Label>
                <p class="text-muted-foreground text-sm">{$t('form.email')}</p>
            </Form.Label>
            <Input placeholder="janedoe@email.com" {...attrs} bind:value={$formData.email}/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password" class="grid">
        <Form.Control let:attrs>
            <Form.Label>
                <p class="text-muted-foreground text-sm">{$t('form.password')}</p>
            </Form.Label>
            <Input type="password" {...attrs} bind:value={$formData.password}/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="confirm_password" class="grid">
        <Form.Control let:attrs>
            <Form.Label>
                <p class="text-muted-foreground text-sm">{$t('form.confirmPassword')}</p>
            </Form.Label>
            <Input type="password" {...attrs} bind:value={$formData.confirm_password}/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled={isLoading}>
        {#if isLoading}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        {$t('form.signup')}
    </Form.Button>
</form>