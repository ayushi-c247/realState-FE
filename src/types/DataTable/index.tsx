import { DataTable as MantineDataTable, DataTableProps as MantineDataTableProps } from "mantine-datatable";

export type DataTablePropsWithPagination<T> = MantineDataTableProps<T> & {
  renderPagination?: (props: {
    state: {
      page: number;
      paginationSize: "xs" | "sm" | "md" | "lg";
      totalPages: number;
    };
    actions: {
      setPage: (page: number) => void;
    };
    Controls: {
      Text: React.FC;
      PageSizeSelector: React.FC;
      Pagination: React.FC;
    };
  }) => React.ReactNode;
}

// Wrap Mantine DataTable to use the new type
export const DataTable = MantineDataTable as <T>(
  props: DataTablePropsWithPagination<T>
) => React.ReactNode;
