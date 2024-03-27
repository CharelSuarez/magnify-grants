<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addTableFilter, addSelectedRows } from 'svelte-headless-table/plugins';
	import { type Writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import GrantTableActions from './AppTableActions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import GrantTableCheckbox from '$lib/custom_components/ui/table/table-checkbox.svelte';
	import GrantTableStatusCell from './AppTableAcceptCell.svelte';
	import GrantTableCompleteStatus from './AppTableCompleteCell.svelte';
	import type { Application } from '$lib/validation/app_schema';
	import AppTableAge from './AppTableAgeCell.svelte';
	import { t } from '$lib/i18n/i18n';

	let className: string = '';
	export { className as class };

	export let applications: Writable<Application[]>;

	const table = createTable(applications, {
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		select: addSelectedRows()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(GrantTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(GrantTableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'grantTitle',
			header: $t('table.header.grant')
		}),
		table.column({
			accessor: 'userProfileName',
			header: $t('table.header.name')
		}),
		table.column({
			accessor: 'userProfileDateOfBirth',
			header: $t('table.header.age'),
			cell: ({ value }) => {
				return createRender(AppTableAge, {
					value
				});
			}
		}),
		table.column({
			accessor: 'userProfileEmail',
			header: $t('table.header.email')
		}),
		table.column({
			accessor: 'complete',
			header: $t('table.header.complete'),
			cell: ({ value }) => {
				return createRender(GrantTableCompleteStatus, {
					value
				});
			}
		}),
		table.column({
			accessor: 'status',
			header: $t('table.header.status'),
			cell: ({ value }) => {
				return createRender(GrantTableStatusCell, {
					value
				});
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(GrantTableActions, { id: value });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;
</script>

<div class={className}>
	<div class="flex items-center py-4 gap-6">
		<Input
			class="max-w-sm"
			placeholder={$t('search.placeholder')}
			type="text"
			bind:value={$filterValue}
		/>
		<Button
			variant="destructive"
			size="sm"
			color="red"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={Object.keys($selectedDataIds).length == 0}
		>
			{$t('button.deleteAll')}
		</Button>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs} class="[&:has([role=checkbox])]:pl-3">
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{$t('pagination.selectedCount', {
				count: Object.keys($selectedDataIds).length,
				total: $rows.length
			})}
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}
		>
			{$t('pagination.previous')}
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}
		>
			{$t('pagination.next')}
		</Button>
	</div>
</div>
