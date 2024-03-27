<script lang="ts">
	import { createTable, Render, Subscribe, createRender, BodyRow } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows,
		addColumnFilters
	} from 'svelte-headless-table/plugins';
	import { get, readable, type Writable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import DataTableCheckbox from '$lib/custom_components/ui/table/table-checkbox.svelte';
	import type { Grant } from '@prisma/client';
	import Cross2 from 'svelte-radix/Cross2.svelte';
	import { trueFalseFilter } from './filter-types';
	import { DataTableFacetedFilter } from './index';
	import { goto } from '$app/navigation';
	import { toShort } from '$lib/utils/url';

	export let grants: Grant[];

	const table = createTable(readable(grants), {
		page: addPagination(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		colFilter: addColumnFilters()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected,
					ariaLabel: 'Select all rows'
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);
				return createRender(DataTableCheckbox, {
					checked: isSelected,
					ariaLabel: 'Select row'
				});
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'title',
			header: 'Title'
		}),
		table.column({
			accessor: 'description',
			header: 'Description',
			cell: ({ value }) => {
				if (value.length == 0) return 'None';
				else if (value.length < 25) return value;
				return value.substring(0, 25) + '...';
			}
		}),
		table.column({
			accessor: 'acceptingApplications',
			header: 'Accepting Applications',
			plugins: {
				filter: {
					exclude: true
				},
				colFilter: {
					fn: ({ filterValue, value }) => {
						if (filterValue.length === 0) return true;
						console.log(filterValue, typeof value);
						if (!Array.isArray(filterValue) || typeof value.toString() !== 'string') return true;

						return filterValue.some((filter) => {
							return value.toString().includes(filter);
						});
					},
					initialFilterValue: [],
					render: ({ filterValue }) => {
						return get(filterValue);
					}
				}
			}
		}),
		table.column({
			accessor: 'published',
			header: 'Published',
			plugins: {
				filter: {
					exclude: true
				},
				colFilter: {
					fn: ({ filterValue, value }) => {
						if (filterValue.length === 0) return true;
						console.log(filterValue, typeof value);
						if (!Array.isArray(filterValue) || typeof value.toString() !== 'string') return true;

						return filterValue.some((filter) => {
							return value.toString().includes(filter);
						});
					},
					initialFilterValue: [],
					render: ({ filterValue }) => {
						return get(filterValue);
					}
				}
			}
		}),
		table.column({
			accessor: (item) => item,
			header: 'Range',
			id: 'range',
			cell: ({ value: { rangeLow, rangeHigh } }) => {
				const rangeLowFormatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'CAD'
				}).format(rangeLow);
				const rangeHighFormatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'CAD'
				}).format(rangeHigh);
				return `${rangeLowFormatted} to ${rangeHighFormatted}`;
			},
			plugins: {
				sort: {
					getSortValue: ({ value }) => {
						console.log(value);
						return value;
					}
				}
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: () => {
				return createRender(DataTableActions);
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);

	const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;
	const {
		filterValues
	}: {
		filterValues: Writable<{
			acceptingApplications: string[];
			published: string[];
		}>;
	} = pluginStates.colFilter;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);
	const hidableCols = ['title', 'acceptingApplications', 'published', 'description', 'range'];

	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);

	function gotoUser(row: BodyRow<any, any>) {
        if (row.isData()) {
            goto(`/grant-admin/grants/${toShort(row.original.id)}`);
        }
    }
</script>

<svelte:head>
	<title>All grants</title>
</svelte:head>

<div>
	<div class="flex items-center py-4">
		<Input
			bind:value={$filterValue}
			class="max-w-sm"
			placeholder="Search titles or descriptions"
			type="text"
		/>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.acceptingApplications}
			options={trueFalseFilter}
			title="Accepting Applications"
		/>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.published}
			options={trueFalseFilter}
			title="Published"
		/>
		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.acceptingApplications = [];
					$filterValues.published = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2 class="ml-2 h-4 w-4" />
			</Button>
		{/if}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} class="ml-auto" variant="outline">
					Columns
					<ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hidableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
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
										{#if cell.id === 'range'}
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
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'} class="hover:cursor-pointer" on:click={() => gotoUser(row)} {...rowAttrs}>
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
			{Object.keys($selectedDataIds).length} of{' '}
			{$rows.length} row(s) selected.
		</div>
		<Button
			disabled={!$hasPreviousPage}
			on:click={() => ($pageIndex = $pageIndex - 1)}
			size="sm"
			variant="outline"
			>Previous
		</Button>
		<Button
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}
			size="sm"
			variant="outline"
			>Next
		</Button>
	</div>
</div>
