export const clearSearch = (setSearchQuery: (value: string) => void, updateQueryParams: (params: Record<string, string | number | null>) => void) => {
  setSearchQuery("");
  updateQueryParams({ search: null, page: 1 });
};
