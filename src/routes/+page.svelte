<script lang="ts">

	import { Button } from "$lib/components/ui/button";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h1>WELCOME HAHAHAHAHAHHAHAHA</h1>

{#if data.loggedIn}
    <form action="/logout" method=POST>
        <Button type="submit">
            Logout
        </Button>
    </form>
{/if}

