<script lang="ts">
    import { useState } from "./hooks";

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!$open);
    }

    // export let loggedIn: boolean;
</script>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->


<div class="flex w-full fixed justify-end p-8">
    <div class="flex  z-[60] w-[60px] h-[60px] mt-4 mr-4 bg-blue-600 rounded-full justify-center items-center relative cursor-pointer text-white" on:click={toggleMenu}>
        <div class={`flex absolute h-[2px] w-[50%] bg-white  ${$open ? ' transform rotate-45 top-[50%]' : 'top-[40%] rotate-0'} transition-transform `}></div>
        <div class={`flex absolute h-[2px] w-[50%] bg-white ${$open ? 'transform top-[50%] rotate-[-45deg]' : 'top-[60%] rotate-0'} transition-transform`}></div>              
    </div>
   <div class={`flex flex-col absolute  w-[500px] h-[700px] z-[50] rounded-3xl bg-blue-700 shadow-md ${$open ? '' : 'hidden'}`}>
        <div class="flex absolute top-6 left-8 text-white font-semibold text-[2rem]">
            Grant Service
        </div>
         <div class="flex absolute  top-[15%] flex-col space-y-4 p-4 text-[2rem] left-8 font-light">
              <a href="/login" class="text-white">Link 1</a>
              <a href="/signup" class="text-white">Link 2</a>
              <a href="/contact" class="text-white">Link 3</a>
              <a href="/about" class="text-white">Link 4</a>
         </div>
        <div class="flex flex-col absolute bottom-5 left-8 w-[87%] h-[35%] rounded-3xl text-white bg-blue-950">
            <div class="flex font-semibold p-4 px-8 text-[2rem]">Accessibilities</div>
        </div>
   </div>
</div>