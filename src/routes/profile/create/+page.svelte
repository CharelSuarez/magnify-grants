<script lang="ts">
	import type { PageData } from "./$types";
	import ProfileForm from "./ProfileForm.svelte";

    export let data: PageData;
</script>

<div class="mx-auto flex w-full h-screen flex-col justify-center space-y-6 sm:w-[350px]">

    <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Create your profile</h1>
        <p class="text-sm text-muted-foreground">
            Please fill in your information
        </p>
    </div>

    <ProfileForm data={data.form}/>

</div>