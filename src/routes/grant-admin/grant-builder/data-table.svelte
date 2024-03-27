<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import DataTableCheckbox from '$lib/custom_components/ui/table/table-checkbox.svelte';
	import type { Form } from '@prisma/client';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { PlusCircle } from 'lucide-svelte';
	import { t } from '$lib/i18n/i18n';

	export let forms: Form[];

	const data = writable(forms);

	const deleteForm = async (id: string) => {
		const res = await fetch('/grant-admin/grant-builder/delete/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: id
			})
		});

		if (res.status === 200) {
			await updateFlash(page);
			const index = forms.map((f) => f.id).indexOf(id);
			if (index < 0 || index >= forms.length) {
				return;
			}
			forms.splice(index, 1);
			$data = $data;
		}
	};

	const table = createTable(data, {
		page: addPagination(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows()
	});

	const createColumns = () => {
		return table.createColumns([
			table.column({
				accessor: 'id',
				header: (_, { pluginStates }) => {
					const { allPageRowsSelected } = pluginStates.select;
					return createRender(DataTableCheckbox, {
						checked: allPageRowsSelected
					});
				},
				cell: ({ row }, { pluginStates }) => {
					const { getRowState } = pluginStates.select;
					const { isSelected } = getRowState(row);
					return createRender(DataTableCheckbox, {
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
				accessor: 'name',
				header: $t('table.header.name')
			}),
			table.column({
				accessor: 'description',
				header: $t('table.header.description'),
				cell: ({ value }) => {
					if (value.length == 0) return 'None';
					else if (value.length < 25) return value;
					return value.substring(0, 25) + '...';
				}
			}),
			table.column({
				accessor: 'createdAt',
				header: $t('table.header.created'),
				cell: ({ value }) => {
					const date = value.toLocaleString();
					if (date.length == 0) return $t('common.none');
					else if (date.length < 25) return date;
					return date.substring(0, 25) + '...';
				}
			}),
			table.column({
				accessor: ({ id }) => id,
				header: '',
				cell: ({ value }) => {
					return createRender(DataTableActions, { id: value }).on($t('action.delete'), (e) =>
						deleteForm(e.detail.id)
					);
				}
			})
		]);
	};

	const columns = createColumns();

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);

	const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);
</script>

<div>
	<div class="flex flex-row items-center py-4">
		<Button href="/grant-admin/grant-builder/new" size="icon" variant="outline">
			<PlusCircle />
		</Button>
		<Input
			bind:value={$filterValue}
			class="max-w-sm"
			placeholder={$t('table.searchPlaceholder')}
			type="text"
		/>
	</div>
	<div class="bg-white rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										{#if cell.id === 'amount'}
											<div class="text-right">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'title'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
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
									<Table.Cell {...attrs}>
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
			{$t('table.pagination.selectedCount', {
				count: Object.keys($selectedDataIds).length,
				total: $rows.length
			})}
		</div>
		<Button
			disabled={!$hasPreviousPage}
			on:click={() => ($pageIndex = $pageIndex - 1)}
			size="sm"
			variant="outline"
		>
			{$t('table.pagination.previous')}
		</Button>
		<Button
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}
			size="sm"
			variant="outline"
		>
			{$t('table.pagination.next')}
		</Button>
	</div>
</div>
