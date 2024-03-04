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

		switch (type) {
			case FieldType.ShortAnswer:
				fields = {
					...fields,
					[`field${count}`]: {
						type: FieldType.ShortAnswer,
						prompt: "",
					}
				}
				break;
		}

		count++;

	}

	let fields: { field: { type: FieldType, prompt: string } } = {};

</script>

<container class="container flex w-screen flex-col items-center md:my-20">
	<form method="POST" class="w-1/2 border-none border-2 p-7 shadow-none md:shadow-2xl rounded-md" use:enhance>
		<Form.Field {form} name="test">
			<Form.Control>
					{#each Object.values(fields) as field}
						<form method="POST" use:enhance>

							<Form.Field {form} name="test">
								<Form.Control>
									<Form.Label>{field.type}</Form.Label>
									{#if field.type === FieldType.ShortAnswer || field.type === FieldType.MultipleChoice || field.type === FieldType.Checkbox || field.type === FieldType.Dropdown}
										<Form.Label>Option</Form.Label>
										<Input bind:value={field.prompt}/>
										<Button>Add option</Button>
									{/if}
								</Form.Control>
								<Form.Description />
								<Form.FieldErrors />
							</Form.Field>

						</form>
					{/each}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="border-none">
						<Button>Add new field</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item on:click={() => addField(FieldType.ShortAnswer)}>Short Answer</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.Paragraph)}>Paragraph</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.MultipleChoice)}>Multiple Choice</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.Checkbox)}>Checkboxes</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.Dropdown)}>Dropdown</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.FileUpload)}>File Upload</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.LinearScale)}>Linear Scale</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.Date)}>Date</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => addField(FieldType.Time)}>Time</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>
	</form>
</container>


<!--<Dialog.Root>-->
<!--	<Dialog.Trigger>Edit Profile</Dialog.Trigger>-->
<!--	<Dialog.Content class="sm:max-w-[425px]">-->
<!--		<Dialog.Header>-->
<!--			<Dialog.Title>Add Question</Dialog.Title>-->
<!--			<Dialog.Description>-->
<!--				Make changes to your profile here. Click save when you're done.-->
<!--			</Dialog.Description>-->
<!--		</Dialog.Header>-->
<!--		<div class="grid gap-4 py-4">-->
<!--			<div class="grid grid-cols-4 items-center gap-4">-->
<!--				<Label class="text-right">Name</Label>-->
<!--				<DropdownMenu.Root>-->
<!--					<DropdownMenu.Trigger asChild let:builder>-->
<!--						<Button builders={[builder]} variant="outline">Select Field Type</Button>-->
<!--					</DropdownMenu.Trigger>-->
<!--					<DropdownMenu.Content>-->
<!--						<DropdownMenu.Group>-->
<!--							&lt;!&ndash;			<DropdownMenu.Item on:click={(e) => e.preventDefault()}><AddFieldDialog type={FieldType.ShortAnswer}></AddFieldDialog>></DropdownMenu.Item>&ndash;&gt;-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.ShortAnswer)}>Short Answer</DropdownMenu.Item>-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.Paragraph)}>Paragraph</DropdownMenu.Item>-->
<!--							<DropdownMenu.Separator />-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.MultipleChoice)}>Multiple Choice</DropdownMenu.Item>-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.Checkbox)}>Checkbox</DropdownMenu.Item>-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.Dropdown)}>Dropdown</DropdownMenu.Item>-->
<!--							<DropdownMenu.Separator />-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.FileUpload)}>File Upload</DropdownMenu.Item>-->
<!--							<DropdownMenu.Separator />-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.LinearScale)}>Linear Scale</DropdownMenu.Item>-->
<!--							&lt;!&ndash;			<DropdownMenu.Item>Multiple Choice Grid</DropdownMenu.Item>&ndash;&gt;-->
<!--							&lt;!&ndash;			<DropdownMenu.Item>Checkbox Grid</DropdownMenu.Item>&ndash;&gt;-->
<!--							<DropdownMenu.Separator />-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.Date)}>Date</DropdownMenu.Item>-->
<!--							<DropdownMenu.Item on:click={() => addField(FieldType.Time)}>Time</DropdownMenu.Item>-->
<!--						</DropdownMenu.Group>-->
<!--					</DropdownMenu.Content>-->
<!--				</DropdownMenu.Root>-->
<!--			</div>-->
<!--		<Dialog.Footer>-->
<!--			<Button type="submit">Save changes</Button>-->
<!--		</Dialog.Footer>-->
<!--	</Dialog.Content>-->
<!--</Dialog.Root>-->

<!--<DropdownMenu.Root>-->
<!--	<DropdownMenu.Trigger asChild let:builder>-->
<!--		<Button builders={[builder]} variant="outline">Add Field</Button>-->
<!--	</DropdownMenu.Trigger>-->
<!--	<DropdownMenu.Content>-->
<!--		<DropdownMenu.Group>-->
<!--&lt;!&ndash;			<DropdownMenu.Item on:click={(e) => e.preventDefault()}><AddFieldDialog type={FieldType.ShortAnswer}></AddFieldDialog>></DropdownMenu.Item>&ndash;&gt;-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.ShortAnswer)}>Short Answer</DropdownMenu.Item>-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.Paragraph)}>Paragraph</DropdownMenu.Item>-->
<!--			<DropdownMenu.Separator />-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.MultipleChoice)}>Multiple Choice</DropdownMenu.Item>-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.Checkbox)}>Checkbox</DropdownMenu.Item>-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.Dropdown)}>Dropdown</DropdownMenu.Item>-->
<!--			<DropdownMenu.Separator />-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.FileUpload)}>File Upload</DropdownMenu.Item>-->
<!--			<DropdownMenu.Separator />-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.LinearScale)}>Linear Scale</DropdownMenu.Item>-->
<!--			&lt;!&ndash;			<DropdownMenu.Item>Multiple Choice Grid</DropdownMenu.Item>&ndash;&gt;-->
<!--			&lt;!&ndash;			<DropdownMenu.Item>Checkbox Grid</DropdownMenu.Item>&ndash;&gt;-->
<!--			<DropdownMenu.Separator />-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.Date)}>Date</DropdownMenu.Item>-->
<!--			<DropdownMenu.Item on:click={() => addField(FieldType.Time)}>Time</DropdownMenu.Item>-->
<!--		</DropdownMenu.Group>-->
<!--	</DropdownMenu.Content>-->
<!--</DropdownMenu.Root>-->

