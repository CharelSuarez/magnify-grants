<script lang="ts">
    import { 
      createTable, 
      Render, 
      Subscribe, 
      createRender 
    } from "svelte-headless-table";
    import { 
      addPagination, 
      addTableFilter, 
      addSelectedRows 
    } from "svelte-headless-table/plugins";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import GrantTableActions from "./grant-table-actions.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	  import GrantTableCheckbox from "./grant-table-checkbox.svelte";
    import GrantTableStatusCell from "./grant-table-status-cell.svelte";
    import GrantTableCompleteStatus from "./grant-table-complete-status.svelte";
    import { t } from '$lib/i18n/i18n';
   
    type Application = {
      id: string;
      grant: string;
      name: string;
      age: number;
      email: string;
      complete: boolean,
      status: "ACCEPTED" | "REJECTED" | "PENDING";
    };
   
    const data: Application[] = [
      {
        id: "m5gr84i9",
        grant: "GRANT-51",
        name: "Big Chungus",
        age: 26,
        email: "ken99@yahoo.com",
        complete: true,
        status: "ACCEPTED"
      },
      {
        id: "728ed52f",
        grant: "GRANT-51",
        name: "Poppy",
        age: 15,
        email: "m@example.com",
        complete: true,
        status: "REJECTED"
      },
      {
        id: "489e1d42",
        grant: "GRANT-23",
        name: "Been Chilling",
        age: 99,
        email: "example@gmail.com",
        complete: false,
        status: "PENDING"
      },
      {
        id: "93c4a5b7",
        grant: "GRANT-42",
        name: "Sunny Days",
        age: 30,
        email: "sunny@gmail.com",
        complete: false,
        status: "PENDING"
      },
      {
        id: "6a1b2c3d",
        grant: "GRANT-23",
        name: "Moonlight Shadow",
        age: 45,
        email: "moon@example.com",
        complete: true,
        status: "ACCEPTED"
      },
      {
        id: "f8e9d7c6",
        grant: "GRANT-42",
        name: "Starry Night",
        age: 28,
        email: "starry@yahoo.com",
        complete: false,
        status: "PENDING"
      },
      {
        id: "1b2a3c4d",
        grant: "GRANT-51",
        name: "Snowflake",
        age: 22,
        email: "snow@example.com",
        complete: true,
        status: "ACCEPTED"
      },
      {
        id: "5f6e7d8c",
        grant: "GRANT-23",
        name: "Breeze",
        age: 35,
        email: "breeze@gmail.com",
        complete: true,
        status: "REJECTED"
      },
      {
        id: "2a3b4c5d",
        grant: "GRANT-42",
        name: "Firefly",
        age: 18,
        email: "firefly@yahoo.com",
        complete: false,
        status: "PENDING"
      },
      {
        id: "9d8c7b6a",
        grant: "GRANT-51",
        name: "Thunderstorm",
        age: 40,
        email: "thunder@example.com",
        complete: true,
        status: "REJECTED"
      },
    ];
   
    const table = createTable(readable(data), {
      page: addPagination(),
      filter: addTableFilter({
        fn: ({ filterValue, value }) =>
          value.toLowerCase().includes(filterValue.toLowerCase()),
      }),
      select: addSelectedRows(),
    });

    const columns = table.createColumns([
      table.column({
        accessor: "id",
        header: (_, { pluginStates }) => {
          const { allPageRowsSelected } = pluginStates.select;
          return createRender(GrantTableCheckbox, {
            checked: allPageRowsSelected,
          });
        },
        cell: ({ row }, { pluginStates }) => {
          const { getRowState } = pluginStates.select;
          const { isSelected } = getRowState(row);
  
          return createRender(GrantTableCheckbox, {
            checked: isSelected,
          });
        },
        plugins: {
          filter: {
            exclude: true,
          },
        },
      }),
      table.column({
        accessor: "grant",
        header: $t('table.header.grant'),
      }),
      table.column({
        accessor: "name",
        header: $t('table.header.name'),
      }),
      table.column({
        accessor: "age",
        header: $t('table.header.age'),
      }),
      table.column({
        accessor: "email",
        header: $t('table.header.email'),
      }),
      table.column({
        accessor: "complete",
        header: $t('table.header.complete'),
        cell: ({ value }) => {
          return createRender(GrantTableCompleteStatus, {
            value,
          });
        },
      }),
      table.column({
        accessor: "status",
        header: $t('table.header.status'),
        cell: ({ value }) => {
          return createRender(GrantTableStatusCell, {
            value,
          });
        },
      }),
      table.column({
        accessor: ({ id }) => id,
        header: "",
        cell: ({ value }) => {
          return createRender(GrantTableActions, { id: value });
        },
      }),
    ]);

    const { 
      headerRows, 
      pageRows, 
      tableAttrs, 
      tableBodyAttrs, 
      pluginStates, 
      rows,
    } = table.createViewModel(columns);
 
    const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
    const { filterValue } = pluginStates.filter;
    const { selectedDataIds } = pluginStates.select;

    let className: string = "";
	  export { className as class };
</script>

<div class={className}>
  <div class="flex items-center py-4 gap-6">
    <Input
      class="max-w-sm"
      placeholder="{$t('search.placeholder')}"
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
                  <Table.Head {...attrs}>
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
            <Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && "selected"}>
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
      {$t('pagination.selectedCount', { count: Object.keys($selectedDataIds).length, total: $rows.length })}
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
