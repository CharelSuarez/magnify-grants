<script lang="ts">
    export let name: string;
    export let description: string;
    export let id: string;

    console.log(id);

    const handleClick = () => {
        window.location.href = `/grants-user/${id}`;
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex h-[300px] bg-white border-4 border-teal-500 shadow-xl p-4 w-[250px] rounded-lg text-black cursor-pointer hover:scale-90
             transition-all duration-500 ease-out flex-col" on:click={handleClick}>
    <h1 class="flex text-[2rem] font-medium">{name}</h1>
    <p>description:</p>
    <p class="flex w-full h-full justify-center items-center p-4">{description}</p>
</div>