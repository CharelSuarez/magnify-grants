<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { FieldType } from '@prisma/client';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
    import { Asterisk } from 'lucide-svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
    import * as RadioGroup from '$lib/components/ui/radio-group';
    import DatePicker from '$lib/custom_components/ui/date-picker/date-picker.svelte';

	export let field: {
		id: string;
		type: FieldType;
		formId: string;
		options: string[];
		prompt: string;
	};
    export let value : any;

    const isInitialCheckboxOption = (fieldId: string, option: string) => {
        return value && value instanceof Array 
            && value.includes(option);
    }
</script>

<Card.Root class="w-full p-8 bg-secondary">
	<Card.Content class="w-full p-0 space-y-2">
        <div class="flex">
            <h1 class="text-lg text-center">{field.prompt}</h1>
        </div>
		{#if field.type == FieldType.ShortAnswer}
			<div class="flex flex-col items-center">
                <Input bind:value={value} disabled={true}
                type="text" name={field.id} placeholder={''}
                />
			</div>
		{:else if field.type == FieldType.Paragraph}
			<div class="flex flex-col items-center">
                <Textarea bind:value={value} disabled={true} class="min-h-min"
                    name={field.id} placeholder={'Type a paragraph here.'}>
                </Textarea>
			</div>
		{:else if field.type == FieldType.MultipleChoice}
            <RadioGroup.Root class="flex gap-4 items-center h-10" bind:value={value} disabled={true}>
                {#each field.options as option}
                    <div class="flex items-center gap-2 mt-2">
                        <RadioGroup.Item class="h-5 w-5" value={option} disabled={true}/>
                        <p class="font-normal">{option}</p>
                    </div>
                {/each}
            </RadioGroup.Root>
		{:else if field.type == FieldType.Checkbox}
			<div class="flex gap-4 items-center h-10">
                {#each field.options as option}
                    <div class="flex items-center gap-2 mt-2">
                        <input checked={isInitialCheckboxOption(field.id, option)} class="h-5 w-5" 
                            type="checkbox" disabled={true}/>
                        <p class="font-normal">{option}</p>
                    </div>
                {/each}
            </div>
		{:else if field.type == FieldType.Dropdown}
            <div class="flex gap-4 items-center h-10">
                <Select.Root selected={{value: value, label: value}} disabled={true}>
                    <Select.Trigger class="w-full">
                        <Select.Value placeholder="Select an option" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group>
                            {#each field.options as option}
                                <Select.Item value={option} label={option}>{option}</Select.Item>
                            {/each}
                        </Select.Group>
                    </Select.Content>
                    <Select.Input/>
                </Select.Root>
            </div>
        {:else if field.type == FieldType.LinearScale}
            <RadioGroup.Root class="flex gap-4 items-center h-10" value={value.toString()} disabled={true}>
                {#each {length: 10} as _, i}
                    <div class="flex items-center gap-2 mt-2">
                        <RadioGroup.Item class="h-5 w-5" value={(i + 1).toString()}/>
                        <p class="font-normal">{i+1}</p>
                    </div>
                {/each}
            </RadioGroup.Root>
        {:else if field.type == FieldType.Date}
            <div class="flex gap-4 items-center h-10">
                <DatePicker bind:value={value} disabled={true}></DatePicker>
            </div>
        {:else if field.type == FieldType.Time}
            <div class="flex gap-4 items-center h-10">
                <Input bind:value={value} disabled={true} type="text"
                    name={field.id} placeholder={'Enter a time in the format HH:MM AM/PM.'}/>
            </div>
		{/if}
	</Card.Content>
</Card.Root>
