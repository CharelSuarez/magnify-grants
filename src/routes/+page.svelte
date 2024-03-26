<script lang="ts">
	import Taskbar from '$lib/custom_components/ui/taskbar/Taskbar.svelte';
  import shape_1 from '$lib/assets/abstract/shape_1.png';
  import shape_2 from '$lib/assets/abstract/shape_2.png';
  import shape_3 from '$lib/assets/abstract/shape_3.png';
  import magnify_logo from '$lib/assets/branding/images/magnify_image.webp';
	import type { PageData } from './$types';
  export let data: PageData;
</script>

<main class="flex-col min-h-screen h-auto">

	<Taskbar loggedIn={data.loggedIn}/>

  <div class="flex justify-center items-center h-screen relative flex-col font-satoshi">
    <h1 class="text-[9rem] font-bold max-sm:text-lg">Grant <span class=" text-teal-500">Service</span></h1>

    <img src={shape_1} alt="abstract shape" class=" absolute z-[-1] left-0 opacity-[.8] top-0 h-[600px]">
    <img src={shape_2} alt="abstract shape" class=" absolute z-[-1] right-0 opacity-[.8] top-0 h-[500px]">
    

      <p class=" w-[45%] font-bold italic text-[1.8rem] text-teal-600 ">
        Empowering The Community 
      </p>
    <a href="#about" class=" absolute font-semibold bottom-[20%] text-teal-500 border-4 border-teal-500 text-[2rem] right-[25%] 
    px-8 py-2 rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300">Learn More</a>
  </div>

  <div class="flex justify-center items-center h-screen relative" id="about">
    <img src={shape_3} alt="abstract shape" class=" absolute z-[-1] left-0 opacity-[.8] top-[-200px] h-[600px]">
    <img src={shape_2} alt="abstract shape" class=" absolute z-[-1] right-0 opacity-[.8] bottom-[-150px] h-[600px]">

    <div class="flex h-[80vh] w-[75vw] bg-teal-600 mt-12 rounded-xl relative overflow-hidden p-12 shadow-inset shadow-2xl cursor-default"> 

      <div class="flex-col font-satoshi">
          <h1 class=" text-white font-semibold text-[3.5rem] text-center ">Striving To Provide Equal Opportunities For All</h1>
          <p class="w-[60%] text-white ml-24 mt-8 text-[1.5rem] leading-[3rem] z-[20] ">
            We are dedicated to leveling the playing field for individuals with disabilities by providing comprehensive grant 
            application services tailored to their unique needs. We understand the challenges that people with disabilities face 
            in accessing resources and opportunities, and we are committed to empowering them to achieve their goals and 
            aspirations
          </p>
          <p class="w-[60%] font-bold text-white ml-24 mt-16 text-[3rem] leading-[3rem] z-[20]">
            Our Mission is Simple:
          </p>
          <p class="w-[40%]  text-white ml-32 mt-4 text-[1.5rem] leading-[3rem] z-[20] ">
            To bridge the gap between individuals with disabilities and the funding they need to thrive.
          </p>

      </div>

      <img src={magnify_logo} alt="" srcset="" class=" absolute bottom-[-200px] right-[-200px] z-0">
    </div>
  </div>

<footer class="flex flex-col justify-center items-center mt-[5rem] bg-teal-800 h-[150px] text-white cursor-default font-satoshi">
    <div class="flex text-xl">
      In Association with MagnifyAccess
    </div>
    <div class="flex text-teal-950 font-bold italic text-lg">
      Developed by Group 17
    </div>
</footer>

</main>

