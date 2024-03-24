<script lang="ts">
    import { useState } from "./hooks";
    import Button from "$lib/components/ui/button/button.svelte";

    import Bold from "lucide-svelte/icons/bold";
    import Italic from "lucide-svelte/icons/italic";
    import Underline from "lucide-svelte/icons/underline";
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!$open);
    }

    export let loggedIn: boolean;
</script>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->


<div class="flex w-full fixed justify-end p-8">
    <div class="flex  z-[60] w-[60px] h-[60px] mt-4 mr-4 bg-teal-600 rounded-full justify-center items-center relative cursor-pointer text-white" on:click={toggleMenu}>
        <div class={`flex absolute h-[2px] w-[50%] bg-white  ${$open ? ' transform rotate-45 top-[50%]' : 'top-[40%] rotate-0'} transition-transform `}></div>
        <div class={`flex absolute h-[2px] w-[50%] bg-white ${$open ? 'transform top-[50%] rotate-[-45deg]' : 'top-[60%] rotate-0'} transition-transform`}></div>              
    </div>

   <div class={`flex flex-col absolute w-[500px] h-[700px] z-[50] rounded-3xl bg-neutral-900 shadow-lg transform ${$open ? '' : 'hidden'}`}>
        <div class="flex absolute top-6 left-8 text-white font-semibold text-[2rem]">
            Grant Service
        </div>
         <div class="flex absolute  top-[15%] flex-col space-y-4 p-4 text-[1.8rem] left-8 font-normal">
              <a href="/login" class="text-white w-fit">Visit Magnify Access</a>
              <a href="/signup" class="text-white w-fit">Login</a>
              <a href="/contact" class="text-white w-fit">Sign up</a>
              {#if loggedIn}
              <form action="/logout" method="POST">
                  <Button type="submit">Log out</Button>
              </form>
            {/if}
         </div>
        <div class="flex flex-col absolute bottom-8 left-8 w-[87%] h-[35%] rounded-3xl text-white bg-teal-700">
            <div class="flex font-semibold p-4 px-8 text-[2rem]">Font Size</div>
            <ToggleGroup.Root type="single" class="mt-8">
                <ToggleGroup.Item value="Small" aria-label="Toggle small" >
                    <div class="text-[1.5rem]">Small</div>
                </ToggleGroup.Item>
                <ToggleGroup.Item value="Medium" aria-label="Toggle italic">
                    <div class="text-[1.5rem]">Medium</div>
                </ToggleGroup.Item>
                <ToggleGroup.Item value="Large" aria-label="Toggle strikethrough">
                    <div class="text-[1.5rem]">Large</div>
                </ToggleGroup.Item>
              </ToggleGroup.Root>
           
        </div>
   </div>
</div>