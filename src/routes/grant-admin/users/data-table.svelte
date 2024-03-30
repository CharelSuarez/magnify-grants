<script lang="ts">
	import { BodyRow, createTable, Render, Subscribe } from 'svelte-headless-table';
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
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { t } from '$lib/i18n/i18n';
	import { goto } from '$app/navigation';
	import { toShort } from '$lib/utils/url';

	export let profiles: { id: string; firstName: string; lastName: string; dateOfBirth: Date }[];

	const data = writable(profiles);

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
				accessor: 'firstName',
				header: 'First Name'
			}),
			table.column({
				accessor: 'lastName',
				header: 'Last Name'
			}),
			table.column({
				accessor: 'dateOfBirth',
				header: 'Date of Birth',
				cell: ({ value }) => {
					if (value) {
						const date = value.toISOString().split('T')[0];
						if (date.length == 0) return $t('common.none');
						else if (date.length < 25) return date;
						return date.substring(0, 25) + '...';
					}
					return 'NA';
				}
			})
		]);
	};

	const columns = createColumns();

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const gotoUser = (row: BodyRow<any, any>) => {
		if (row.isData()) {
			goto(`/grant-admin/users/${toShort(row.original.id)}`);
		}
	};
</script>

<div>
	<div class="flex flex-row items-center py-4">
		<Input
			bind:value={$filterValue}
			class="max-w-sm"
			placeholder={$t('grant.users.search_names')}
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
									<Table.Head {...attrs}>
										<Button variant="ghost" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											<ArrowUpDown class={'ml-2 h-4 w-4'} />
										</Button>
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
						<Table.Row class="hover:cursor-pointer" on:click={() => gotoUser(row)} {...rowAttrs}>
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
