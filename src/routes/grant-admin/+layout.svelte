<script lang="ts">
	import BaseHeader from '$lib/custom_components/ui/grant-admin/nav/BaseHeader.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Branding from '$lib/custom_components/ui/grant-admin/nav/Branding.svelte';
	import {
		Sheet,
		SheetTrigger,
		SheetContent,
		SheetDescription,
		SheetHeader,
		SheetTitle
	} from '$lib/components/ui/sheet';
	import AdminTaskbar from '$lib/custom_components/ui/taskbar/AdminTaskbar.svelte';
	import AdminNav from '$lib/custom_components/ui/taskbar/AdminNav.svelte';
</script>

<div class="flex flex-col h-screen">
	<BaseHeader>
		<div class="hidden md:flex w-full">
			<nav class="flex grow items-center text-sm font-bold">
				<AdminTaskbar />
			</nav>
		</div>

		<div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
			<Sheet>
				<SheetTrigger>
					<Button class="md:hidden" size="icon" variant="ghost">
						<svg class="h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
							<path
								fill="#000000"
								fill-rule="evenodd"
								d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
							/>
						</svg>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>
							<Branding />
						</SheetTitle>
						<SheetDescription>
							<div class="my-4 h-[calc(100vh-8rem)] pb-10 p1-6 overflow-auto">
								<div class="flex flex-col items-start justify-between h-full">
									<AdminNav horizontal={false} />
								</div>
							</div>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>

		<div class="w-full flex-1"></div>
	</BaseHeader>

	<div class={`h-screen`}>
		<slot />
	</div>
</div>

<style>
	:global(body) {
		background-color: rgb(242, 245, 249);
	}
</style>
