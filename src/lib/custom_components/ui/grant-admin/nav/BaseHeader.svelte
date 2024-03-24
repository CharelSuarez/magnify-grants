<script lang="ts">
    export let full = false;
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background/95">
    <div class="{full ? "mx-5" : "container"} flex h-14 items-center">
        <slot />
    </div>
</header>
