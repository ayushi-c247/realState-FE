import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface FilterConfig {
  key: string;
  label: string;
  options: { label: string; value: string | number }[];
  valueType?: string | number;
  selectType?: "multi" | "single";
}

export interface FiltersState {
  [key: string]: (string | number)[];
}

export interface FilterBarProps {
  filtersConfig: FilterConfig[];
  onFilterChange?: (filterObject: Record<string, (string | number)[]>) => void;
}

export interface ResetFiltersParams {
  setFilter: (val: Record<string, any>) => void;
  setSearchQuery: (val: string) => void;
  setIsHiddenFilter: (val: boolean) => void;
  router: AppRouterInstance;
  pathname: string;
  refetchData?: () => void;
  page?: number;
  limit?: number;
}

export interface HandleSearchChangeParams {
  value: string;
  router: AppRouterInstance;
  pathname: string;
  searchParams: URLSearchParams;
  pageSize: number;
  setSearchQuery: (val: string) => void;
  updateQueryParams: (
    router: AppRouterInstance,
    pathname: string,
    searchParams: URLSearchParams,
    params: Record<string, string | number | null>
  ) => void;
}
