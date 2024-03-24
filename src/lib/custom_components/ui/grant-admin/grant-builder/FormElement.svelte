<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowUp, ArrowDown, Trash2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import FormDropdown from './FormDropdown.svelte';
	import type { FieldType } from '@prisma/client';

	export let type: 'header' | 'field' | 'error';

	const colors = {
		header: 'from-teal-800 via-teal-800',
		field: 'from-teal-600 via-teal-600',
		error: 'from-red-500 via-red-500'
	};

	const dispatch = createEventDispatcher();

	const clickUp = () => {
		dispatch('clickup');
	};

	const clickDown = () => {
		dispatch('clickdown');
	};

	const clickAdd = (e: { detail: { fieldType: FieldType } }) => {
		dispatch('addfield', {
			fieldType: e.detail.fieldType
		});
		setTimeout(() => {
			mouseMoved = true;
		}, 500); // avoid some glitching graphics
	};

	const clickDelete = () => {
		dispatch('clickdelete');
	};

	export let allowHover = true;

	let hover = false;
	let mouseMoved = true;

	const mouseOut = () => {
		hover = false;
	};

	const mouseIn = () => {
		hover = true;
	};

	const mouseMove = () => {
		if (openedDropdown) {
			mouseMoved = false;
			return;
		}
		mouseMoved = true;
	};

	let openedDropdown = false;
</script>

<div
	role="group"
	on:mouseenter={mouseIn}
	on:mouseleave={mouseOut}
	on:mousemove={mouseMove}
	class="w-full flex flex-row space-x-2"
>
	<div
		class="{allowHover
			? 'w-[90%]'
			: 'w-full'} space-y-2 p-7 bg-gradient-to-b {`${colors[type]}`} via-[5px] to-[5px] to-white rounded-md border-2"
	>
		<slot />
	</div>
	{#if type === 'field' && allowHover}
		<div
			class="{hover || openedDropdown || !mouseMoved
				? ''
				: 'hidden'} bg-white max-h-[150px] flex-none w-1/10 rounded-md border-2"
		>
			<div class="py-2 flex text-muted-foreground w-full h-full items-center flex-col">
				<Button on:click={clickUp} class="h-1/5" variant="ghost" size="icon">
					<ArrowUp />
				</Button>
				<Button on:click={clickDown} class="h-1/5" variant="ghost" size="icon">
					<ArrowDown />
				</Button>
				<div class="grow h-1/5" />
				<FormDropdown bind:opened={openedDropdown} on:addfield={clickAdd} variant="ghost" />
				<Button on:click={clickDelete} class="h-1/5" variant="ghost" size="icon">
					<Trash2 />
				</Button>
			</div>
		</div>
	{/if}
</div>
