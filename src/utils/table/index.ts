import { TableHandlersProps } from "@/types";
import { getNextSortState } from "./../index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_PAGINATION } from "@/constants";
import { useState } from "react";

/** Create reusable table handlers */
export function getNextTableHandlers({
  router,
  pathname,
  searchParams,
  pageSize,
  sortBy = null,
  sortOrder = null,
}: TableHandlersProps) {
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("limit", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // reset to first page
    params.set("limit", String(newPageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = ({ columnAccessor }: { columnAccessor: string }) => {
    let newSortBy: string | null = columnAccessor;
    let newSortOrder: "asc" | "desc" | null = "asc";

    // If clicking the same column
    if (sortBy === columnAccessor) {
      if (sortOrder === "asc") {
        newSortOrder = "desc"; // 1st toggle: asc -> desc
      } else if (sortOrder === "desc") {
        newSortBy = null; // 2nd toggle: desc -> reset
        newSortOrder = null;
      }
    }

    const params = new URLSearchParams(searchParams.toString());

    if (newSortBy) {
      params.set("sortBy", newSortBy);
      params.set("sortOrder", newSortOrder!);
    } else {
      params.delete("sortBy");
      params.delete("sortOrder");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return { handlePageChange, handlePageSizeChange, handleSortChange };
}

export const useListController = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get("page") ?? DEFAULT_PAGINATION.page);
  const pageSize = Number(searchParams.get("limit") ?? DEFAULT_PAGINATION.limit);
  const sortBy = searchParams.get("sortBy") || null;
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || null;
  const search = searchParams.get("search") || "";

  const updateParams = (key: string, value?: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, String(value));
    else params.delete(key);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    page,
    pageSize,
    sortBy,
    sortOrder,
    search,

    updatePage: (v: number) => updateParams("page", v),
    updateLimit: (v: number) => updateParams("limit", v),
    updateSortBy: (v: string | null) => updateParams("sortBy", v || undefined),
    updateSortOrder: (v: "asc" | "desc" | null) => updateParams("sortOrder", v || undefined),
    updateSearch: (v: string) => updateParams("search", v),
  };
};
