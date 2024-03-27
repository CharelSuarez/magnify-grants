<script lang="ts">
	import { hasOptions } from '$lib/utils/form-utils';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { FieldType } from '@prisma/client';
	import { PlusCircle, Trash2 } from 'lucide-svelte';
	import FormElement from '$lib/custom_components/ui/grant-admin/grant-builder/FormElement.svelte';
	import FormDropdown from '$lib/custom_components/ui/grant-admin/grant-builder/FormDropdown.svelte';
	import { t } from '$lib/i18n/i18n';

	export let errors: { [key: string | number]: { field: string; message: string } } = {};

	export let formName = '';
	export let formDescription = '';

	const addField = (typeString: string, i: number | null) => {
		const type = typeString as unknown as FieldType;

		if (!type) {
			return;
		}

		const len = fields.length;

		const field = {
			type: type,
			index: len,
			prompt: '',
			options: []
		};

		if (i !== null && i < len - 1) {
			field.index = i + 1;
			fields.splice(i + 1, 0, field);
			fields = fields;
		} else {
			fields = [...fields, field];
		}
	};

	const addFieldHandler = (e: { detail: { fieldType: FieldType } }, i: number | null) => {
		addField(e.detail.fieldType, i);
	};

	const deleteField = (index: number) => {
		const len = fields.length;

		if (index < 0 || index >= len) {
			return;
		}

		for (let i = index + 1; i < len; i++) {
			fields[i].index -= 1;
		}

		fields.splice(index, 1);
		fields = fields;
	};

	const addOption = (index: number) => {
		const field = fields[index];
		const options = field.options;
		fields[index].options = [...options, ''];
	};

	const deleteOption = (i: number, j: number) => {
		if (i < 0 || i >= fields.length) {
			return;
		}

		if (j < 0 || j >= fields[i].options.length) {
			return;
		}

		fields[i].options.splice(j, 1);
		fields = fields;
	};

	const moveUp = (index: number) => {
		if (index <= 0) {
			return;
		}

		const above = fields[index - 1];
		above.index = index;

		fields[index - 1] = fields[index];
		fields[index - 1].index = index - 1;

		fields[index] = above;
	};

	const moveDown = (index: number) => {
		if (index >= fields.length - 1) {
			return;
		}

		const below = fields[index + 1];
		below.index = index;

		fields[index + 1] = fields[index];
		fields[index + 1].index = index + 1;

		fields[index] = below;
	};

	export let fields: { type: FieldType; index: number; prompt?: string; options: string[] }[] = [];
</script>

<container class="container flex w-screen flex-col space-y-5 items-center my-20">
	<FormElement type="header">
		<Input bind:value={formName} placeholder={$t('form.placeholder.name')} />
		<Input bind:value={formDescription} placeholder={$t('form.placeholder.description')} />
	</FormElement>
	{#if 'name' in errors}
		<FormElement type="error">
			<h1 class="text-muted-foreground">{errors['name'].message}</h1>
		</FormElement>
	{/if}
	{#if 'description' in errors}
		<FormElement type="error">
			<h1 class="text-muted-foreground">{errors['description'].message}</h1>
		</FormElement>
	{/if}
	{#each fields as field, i}
		<FormElement
			on:addfield={(e) => addFieldHandler(e, i)}
			on:clickup={() => moveUp(i)}
			on:clickdown={() => moveDown(i)}
			on:clickdelete={() => deleteField(i)}
			type="field"
		>
			<h1 class="text-muted-foreground">{$t(`fieldType.${field.type}`)} Prompt</h1>
			<Input placeholder={$t('form.placeholder.question')} bind:value={field.prompt} />
			{#if hasOptions(field.type)}
				<h1 class="text-muted-foreground">{$t('form.field.options', { fieldType: field.type })}</h1>
				<div class="flex flex-col space-y-5">
					{#each field.options as option, j}
						<div class="flex space-x-1 flex-row w-full h-full">
							<Input bind:value={field.options[j]} />
							<Button on:click={() => deleteOption(i, j)} variant="outline" size="icon">
								<Trash2 />
							</Button>
						</div>
					{/each}
					<Button on:click={() => addOption(i)} size="icon" variant="outline">
						<PlusCircle />
					</Button>
				</div>
			{/if}
		</FormElement>
		{#if `${i}.prompt` in errors}
			<FormElement type="error">
				<h1 class="text-muted-foreground">{errors[`${i}.prompt`].message}</h1>
			</FormElement>
		{/if}
		{#if `${i}.options` in errors}
			<FormElement type="error">
				<h1 class="text-muted-foreground">{errors[`${i}.options`].message}</h1>
			</FormElement>
		{/if}
	{/each}
	<div class="flex flex-row w-full space-x-2">
		<!-- Placeholder for other buttons or elements -->
		<FormDropdown on:addfield={(e) => addFieldHandler(e, null)} variant="outline" />
		<slot />
	</div>
</container>
