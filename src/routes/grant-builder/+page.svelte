<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Form from "$lib/components/ui/form";
	import * as Select from "$lib/components/ui/select";
	import { Input } from "$lib/components/ui/input";
	import { formSchema, type FormSchema } from "./schema";
	import {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { FieldType } from "@prisma/client";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
	});

	const { enhance } = form;

	let count = 0;

	const addField = (typeString: string) => {

		const type = typeString as unknown as FieldType;

		if (!type) {
			return;
		}
    
		fields = {
			...fields,
			[`field${count}`]: {
				type: type,
				prompt: "",
				options: []
			}
		}

		count++;

	}

	const hasOptions = (type: FieldType) => {
		return type === FieldType.MultipleChoice || type === FieldType.Checkbox || type === FieldType.Dropdown;
	}

	const addOption = (key: string) => {
		const field = fields[key];
		const options = field.options;
		fields[key].options = [...options, ""];
	}

	let fields: { [field: string]: { type: FieldType, prompt?: string, options: string[] } } = {};

	$: console.log(fields);

</script>


<container class="container flex w-screen flex-col items-center md:my-20">
	<form method="POST" class="w-1/2" use:enhance>
		<Form.Field {form} name="test">
			<Form.Control>
					{#each Object.entries(fields) as [key, field]}
						<div class="border-slate-500 bg-white border-2 shadow-none md:shadow-2xl p-7 rounded-md">
							<Form.Label>{field.type}</Form.Label>
							<Input placeholder="Question..." bind:value={field.prompt} />
							<Form.Field {form} name="test">
								<Form.Control>
									{#if hasOptions(field.type)}
										<Form.Label>{field.type} Options</Form.Label>
										<div class="flex flex-col gap-10">
											{#each field.options as _, i}
												<Input bind:value={field.options[i]}/>
											{/each}
											<Button on:click={() => addOption(key)}>Add option</Button>
										</div>
									{/if}
								</Form.Control>
								<Form.Description />
								<Form.FieldErrors />
							</Form.Field>
						</div>
					{/each}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="border-none">
						<Button>Add new field</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						{#each Object.values(FieldType) as type}
							<DropdownMenu.Item on:click={() => addField(type)}>{type}</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>
	</form>
</container>