<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { FieldType } from '@prisma/client';
	import type { SuperForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Asterisk } from 'lucide-svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import DatePicker from '$lib/custom_components/ui/date-picker/date-picker.svelte';
	import { get } from 'svelte/store';

	export let editable = true;

	export let field: {
		id: string;
		type: FieldType;
		formId: string;
		options: string[];
		prompt: string;
	};
	export let filterForm: SuperForm<
		{
			[x: string]: any;
		},
		any
	>;
	$: formData = filterForm.form;

	const toggleCheckboxOption = (
		e: Event & { currentTarget: EventTarget & HTMLInputElement },
		option: string
	) => {
		const checked = e.currentTarget.checked;
		formData.update((fields) => {
			fields[field.id] = fields[field.id] || [];
			if (fields[field.id].includes(option)) {
				if (!checked) {
					fields[field.id] = fields[field.id].filter((selected: any) => selected !== option);
				}
			} else if (checked) {
				fields[field.id].push(option);
			}
			return fields;
		});
	};

	const isInitialCheckboxOption = (fieldId: string, option: string) => {
		const fields = get(formData);
		return fields[fieldId] && fields[fieldId] instanceof Array && fields[fieldId].includes(option);
	};

	const getInitial = (fieldId: string) => {
		const fields = get(formData);
		console.log(fields[fieldId]);
		return fields[fieldId];
	};
</script>

<Card.Root class="w-full p-8 bg-secondary">
	<Card.Content class="w-full p-0 space-y-2">
		<div class="flex">
			<h1 class="text-lg text-center">{field.prompt}</h1>
			<Asterisk strokeWidth={1} color={'red'}></Asterisk>
		</div>
		{#if field.type == FieldType.ShortAnswer}
			<Form.Field form={filterForm} name={field.id} class="flex flex-col items-center">
				<Form.Control let:attrs>
					<Input
						disabled={!editable}
						bind:value={$formData[field.id]}
						{...attrs}
						type="text"
						name={field.id}
						placeholder={'Type a short answer here.'}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{:else if field.type == FieldType.Paragraph}
			<Form.Field form={filterForm} name={field.id} class="flex flex-col items-center">
				<Form.Control let:attrs>
					<Textarea
						disabled={!editable}
						bind:value={$formData[field.id]}
						{...attrs}
						name={field.id}
						placeholder={'Type a paragraph here.'}
					></Textarea>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{:else if field.type == FieldType.MultipleChoice}
			<RadioGroup.Root bind:value={$formData[field.id]}>
				<Form.Field form={filterForm} name={field.id} class="flex gap-4 items-center h-10">
					<Form.Control let:attrs>
						{#each field.options as option}
							<div class="flex items-center gap-2 mt-2">
								<RadioGroup.Item disabled={!editable} class="h-5 w-5" {...attrs} value={option} />
								<Form.Label class="font-normal">{option}</Form.Label>
							</div>
						{/each}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</RadioGroup.Root>
		{:else if field.type == FieldType.Checkbox}
			<Form.Field form={filterForm} name={field.id} class="flex gap-4 items-center h-10">
				<Form.Control let:attrs>
					{#each field.options as option}
						<div class="flex items-center gap-2 mt-2">
							<input
								disabled={!editable}
								checked={isInitialCheckboxOption(field.id, option)}
								class="h-5 w-5"
								type="checkbox"
								{...attrs}
								name={field.id}
								on:input={(e) => toggleCheckboxOption(e, option)}
							/>
							<Form.Label class="font-normal">{option}</Form.Label>
						</div>
					{/each}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{:else if field.type == FieldType.Dropdown}
			<Form.Field form={filterForm} name={field.id}>
				<Form.Control let:attrs>
					<Select.Root
						selected={{ value: $formData[field.id], label: $formData[field.id] }}
						onSelectedChange={(value) => {
							if (value != null && value.value != null) {
								$formData[field.id] = value?.value;
							}
						}}
					>
						<Select.Trigger class="w-full">
							<Select.Value placeholder="Select an option" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each field.options as option}
									<Select.Item disabled={!editable} value={option} label={option}
										>{option}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} name={field.id} />
					</Select.Root>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{:else if field.type == FieldType.LinearScale}
			<RadioGroup.Root class="flex flex-col" value={$formData[field.id].toString()}>
				<Form.Field form={filterForm} name={field.id} class="flex gap-4 items-center h-10">
					<Form.Control let:attrs>
						{#each { length: 10 } as _, i}
							<div class="flex items-center gap-2 mt-2">
								<RadioGroup.Item
									disabled={!editable}
									class="h-5 w-5"
									{...attrs}
									value={(i + 1).toString()}
									on:click={() => ($formData[field.id] = i + 1)}
								/>
								<Form.Label class="font-normal">{i + 1}</Form.Label>
							</div>
						{/each}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</RadioGroup.Root>
		{:else if field.type == FieldType.Date}
			<Form.Field form={filterForm} name={field.id} class="flex gap-4 items-center h-10">
				<Form.Control let:attrs>
					<DatePicker disabled={!editable} bind:value={$formData[field.id]} {...attrs}></DatePicker>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{:else if field.type == FieldType.Time}
			<Form.Field form={filterForm} name={field.id} class="flex gap-4 items-center h-10">
				<Form.Control let:attrs>
					<Input
						disabled={!editable}
						bind:value={$formData[field.id]}
						{...attrs}
						type="text"
						name={field.id}
						placeholder={'Enter a time in the format HH:MM AM/PM.'}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/if}
	</Card.Content>
</Card.Root>
