import * as React from "react";
import {
  type ColumnDef,
  type ColumnSizingState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/advanced/Skeleton";
import { Pagination } from "@/components/navigation/Pagination";
import { Button } from "@/components/primitives/Button";
import { Checkbox } from "@/components/primitives/Checkbox";
import { Input } from "@/components/primitives/Input";

export type DataTableColumn<TData> = ColumnDef<TData, unknown> & {
  csvHeader?: string;
  csvValue?: (row: TData) => string | number | boolean | null | undefined;
};

export interface DataTableProps<
  TData,
> extends React.HTMLAttributes<HTMLDivElement> {
  data: TData[];
  columns: DataTableColumn<TData>[];
  pagination?: boolean;
  pageSize?: number;
  sorting?: boolean;
  filtering?: boolean;
  selection?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  caption?: string;
  stickyHeader?: boolean;
  exportCSV?: boolean;
  resizableColumns?: boolean;
}

interface DataTableToolbarProps {
  filtering: boolean;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  exportCSV: boolean;
  onExport: () => void;
  exportDisabled: boolean;
}

interface DataTableHeaderProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
  sorting: boolean;
  stickyHeader: boolean;
  resizableColumns: boolean;
}

interface DataTableBodyProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
  loading: boolean;
  emptyMessage: string;
  onRowClick?: (row: TData) => void;
}

interface DataTableFooterProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
  selection: boolean;
}

interface DataTablePaginationProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

const DataTableToolbar = ({
  filtering,
  globalFilter,
  onGlobalFilterChange,
  exportCSV,
  onExport,
  exportDisabled,
}: DataTableToolbarProps) => {
  if (!filtering && !exportCSV) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 border-b border-navi-border px-4 py-3 dark:border-navi-border-dark sm:flex-row sm:items-center sm:justify-between">
      {filtering ? (
        <div className="w-full sm:max-w-sm">
          <Input
            aria-label="Search table rows"
            placeholder="Search..."
            value={globalFilter}
            onChange={(event) => onGlobalFilterChange(event.target.value)}
          />
        </div>
      ) : (
        <div />
      )}

      {exportCSV ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={exportDisabled}
        >
          Export CSV
        </Button>
      ) : null}
    </div>
  );
};

const DataTableHeader = <TData,>({
  table,
  sorting,
  stickyHeader,
  resizableColumns,
}: DataTableHeaderProps<TData>) => (
  <thead className="bg-navi-surface-hover/60 dark:bg-navi-surface-hover/80">
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const canSort = sorting && header.column.getCanSort();
          const sortDirection = header.column.getIsSorted();
          const ariaSort: React.AriaAttributes["aria-sort"] =
            sortDirection === "asc"
              ? "ascending"
              : sortDirection === "desc"
                ? "descending"
                : canSort
                  ? "none"
                  : undefined;

          return (
            <th
              key={header.id}
              scope="col"
              aria-sort={ariaSort}
              style={{ width: header.getSize() }}
              className={cn(
                "relative border-b border-navi-border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-navi-neutral/70 dark:border-navi-border-dark dark:text-navi-neutral/60",
                stickyHeader &&
                  "sticky top-0 z-10 bg-navi-surface-hover dark:bg-navi-surface-hover",
              )}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={cn(
                    "flex items-center gap-2",
                    canSort && "cursor-pointer select-none",
                  )}
                  onClick={
                    canSort
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  onKeyDown={(event) => {
                    if (!canSort) {
                      return;
                    }

                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      header.column.toggleSorting(sortDirection === "asc");
                    }
                  }}
                  role={canSort ? "button" : undefined}
                  tabIndex={canSort ? 0 : undefined}
                  aria-label={
                    canSort
                      ? `Sort by ${String(header.column.columnDef.header)}`
                      : undefined
                  }
                >
                  <span>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </span>
                  {canSort ? (
                    <span
                      className="inline-flex items-center text-[10px] text-navi-neutral/60"
                      aria-hidden
                    >
                      {sortDirection === "asc"
                        ? "↑"
                        : sortDirection === "desc"
                          ? "↓"
                          : "↕"}
                    </span>
                  ) : null}
                </div>
              )}

              {resizableColumns && header.column.getCanResize() ? (
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={cn(
                    "absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none bg-transparent transition-colors",
                    header.column.getIsResizing() && "bg-navi-primary/30",
                  )}
                  aria-hidden
                />
              ) : null}
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
);

const DataTableBody = <TData,>({
  table,
  loading,
  emptyMessage,
  onRowClick,
}: DataTableBodyProps<TData>) => {
  const rows = table.getRowModel().rows;
  const columnCount = Math.max(table.getVisibleLeafColumns().length, 1);

  if (loading) {
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={`skeleton-row-${index}`}>
            {Array.from({ length: columnCount }).map((__, cellIndex) => (
              <td
                key={`skeleton-cell-${index}-${cellIndex}`}
                className="border-b border-navi-border px-3 py-3 dark:border-navi-border-dark"
              >
                <Skeleton className="h-4 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columnCount}
            className="px-4 py-12 text-center text-sm text-navi-neutral/70 dark:text-navi-neutral/60"
          >
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          className={cn(
            "border-b border-navi-border text-sm text-navi-ink transition-colors dark:border-navi-border-dark dark:text-navi-neutral-light",
            onRowClick &&
              "cursor-pointer hover:bg-navi-surface-hover/70 dark:hover:bg-navi-surface-hover",
          )}
          onClick={onRowClick ? () => onRowClick(row.original) : undefined}
        >
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-3 py-3 align-middle">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const DataTableFooter = <TData,>({
  table,
  selection,
}: DataTableFooterProps<TData>) => {
  const totalVisible = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="flex flex-col gap-2 border-t border-navi-border px-4 py-3 text-sm text-navi-neutral/70 dark:border-navi-border-dark dark:text-navi-neutral/60 sm:flex-row sm:items-center sm:justify-between">
      <span>
        Showing {table.getRowModel().rows.length} of {totalVisible} rows
      </span>
      {selection ? <span>{selectedCount} selected</span> : null}
    </div>
  );
};

const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  const pageCount = table.getPageCount();

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="border-t border-navi-border px-4 py-3 dark:border-navi-border-dark">
      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={pageCount}
        onPageChange={(page) => table.setPageIndex(page - 1)}
      />
    </div>
  );
};

const safeCellValue = (value: unknown): string => {
  if (value == null) {
    return "";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return "";
};

const quotedCsvValue = (value: string) => `"${value.replaceAll('"', '""')}"`;

const DataTableInner = <TData,>(
  {
    className,
    data,
    columns,
    pagination = true,
    pageSize = 10,
    sorting = true,
    filtering = true,
    selection = false,
    loading = false,
    emptyMessage = "No results found",
    onRowClick,
    caption,
    stickyHeader = false,
    exportCSV = false,
    resizableColumns = false,
    ...props
  }: DataTableProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sortingState, setSortingState] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize,
    },
  );
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});

  React.useEffect(() => {
    setPaginationState((current) => ({
      ...current,
      pageSize,
    }));
  }, [pageSize]);

  const captionId = React.useId();

  const tableColumns = React.useMemo(() => {
    if (!selection) {
      return columns as ColumnDef<TData, unknown>[];
    }

    const selectionColumn: ColumnDef<TData, unknown> = {
      id: "__select__",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(Boolean(value))
          }
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
          aria-label={`Select row ${row.id}`}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      enableResizing: false,
      size: 52,
      minSize: 52,
      maxSize: 52,
    };

    return [selectionColumn, ...columns] as ColumnDef<TData, unknown>[];
  }, [columns, selection]);

  // TanStack Table returns mutable instance APIs that React Compiler intentionally skips.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      globalFilter,
      sorting: sortingState,
      pagination: paginationState,
      rowSelection,
      columnSizing,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSortingState,
    onPaginationChange: setPaginationState,
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: sorting,
    enableGlobalFilter: filtering,
    enableRowSelection: selection,
    enableColumnResizing: resizableColumns,
    columnResizeMode: "onChange",
  });

  const exportRows = table.getPrePaginationRowModel().rows;

  const handleExportCSV = React.useCallback(() => {
    const visibleColumns = table
      .getVisibleLeafColumns()
      .filter((column) => column.id !== "__select__");

    const headers = visibleColumns.map((column) => {
      const definition = column.columnDef as DataTableColumn<TData>;
      if (definition.csvHeader) {
        return definition.csvHeader;
      }

      if (typeof definition.header === "string") {
        return definition.header;
      }

      return column.id;
    });

    const body = exportRows.map((row) =>
      visibleColumns
        .map((column) => {
          const definition = column.columnDef as DataTableColumn<TData>;
          const value = definition.csvValue
            ? definition.csvValue(row.original)
            : row.getValue(column.id);

          return quotedCsvValue(safeCellValue(value));
        })
        .join(","),
    );

    const csv = [
      headers.map((value) => quotedCsvValue(value)).join(","),
      ...body,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "datatable-export.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }, [exportRows, table]);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-navi-lg border border-navi-border bg-navi-surface dark:border-navi-border-dark dark:bg-navi-surface",
        className,
      )}
      {...props}
    >
      <DataTableToolbar
        filtering={filtering}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        exportCSV={exportCSV}
        onExport={handleExportCSV}
        exportDisabled={loading || exportRows.length === 0}
      />

      <div
        className={cn(
          "w-full overflow-x-auto",
          stickyHeader && "max-h-104 overflow-y-auto",
        )}
      >
        <table
          role="table"
          aria-describedby={caption ? captionId : undefined}
          className="w-full border-collapse"
        >
          {caption ? (
            <caption id={captionId} className="sr-only">
              {caption}
            </caption>
          ) : null}
          <DataTableHeader
            table={table}
            sorting={sorting}
            stickyHeader={stickyHeader}
            resizableColumns={resizableColumns}
          />
          <DataTableBody
            table={table}
            loading={loading}
            emptyMessage={emptyMessage}
            onRowClick={onRowClick}
          />
        </table>
      </div>

      <DataTableFooter table={table} selection={selection} />
      {pagination ? <DataTablePagination table={table} /> : null}
    </div>
  );
};

const DataTable = React.forwardRef(DataTableInner) as (<TData>(
  props: DataTableProps<TData> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement) & { displayName?: string };
DataTable.displayName = "DataTable";

export { DataTable };
