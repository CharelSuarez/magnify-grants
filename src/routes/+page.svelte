<script lang="ts">
	import Taskbar from '$lib/custom_components/ui/taskbar/Taskbar.svelte';
	import image from '$lib/assets/branding/images/magnify_image.webp';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

  export let data: PageData;
</script>

<main class="flex-col h-auto">

	<Taskbar loggedIn={data.loggedIn}/>

	<div class="flex justify-evenly items-center h-screen">
		<div class="flex-col justify-center items-center w-auto">
			<h1 class="text-6xl font-bold max-sm:text-lg">Grant Service</h1>
			<p class="text-lg my-10 w-[550px] max-sm:text-sm ">
				Empowering organizations to fulfill their missions through comprehensive grant support services, driving impactful change and sustainable growth in our communities.
			</p>

			<div class="flex">
				<Button class="mr-5" href="https://www.magnifyaccess.ai/contact-us">Contact Us</Button>
			</div>
		</div>

		<img class="z-50 hidden xl:inline" src={image} alt="Magnify Access Branding" />
	</div>


    <div class="flex justify-evenly items-center h-screen max-sm:flex-col">
        <Card.Root>
            <Card.Header>
              <Card.Title>
                <p class="text-center">Feature #1</p>
              </Card.Title>
            </Card.Header>
            <Card.Content>
                <img src={image} class="w-[250px]" alt="" srcset="">
            </Card.Content>
            <Card.Footer>
              <p class="w-[250px] text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, modi.
              </p>
            </Card.Footer>
        </Card.Root>

        <Card.Root>
            <Card.Header>
              <Card.Title>
                <p class="text-center">Feature #2</p>
              </Card.Title>
            </Card.Header>
            <Card.Content>
                <img src={image} class="w-[250px]" alt="" srcset="">
            </Card.Content>
            <Card.Footer>
              <p class="w-[250px] text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, modi.
              </p>
            </Card.Footer>
        </Card.Root>

        <Card.Root>
            <Card.Header>
              <Card.Title>
                <p class="text-center">Feature #3</p>
              </Card.Title>
            </Card.Header>
            <Card.Content>
                <img src={image} class="w-[250px]" alt="" srcset="">
            </Card.Content>
            <Card.Footer>
              <p class="w-[250px] text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, modi.
              </p>
            </Card.Footer>
        </Card.Root>
	</div>



</main>
