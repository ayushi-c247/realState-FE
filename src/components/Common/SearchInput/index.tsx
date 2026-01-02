"use client";

import { CloseButton, Input, InputProps } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import IconSearch from "../Icons/IconSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface ISearchProps extends InputProps {
  placeholder?: string;
  className?: string;
  onSearchChange?: (value: string, debouncedValue: string) => void;
}

export const SearchInput: React.FC<ISearchProps> = ({
  placeholder = "Search...",
  className,
  onSearchChange,
  styles,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initial);
  const [debouncedSearchQuery] = useDebouncedValue(
    searchQuery.trim().length >= 3 ? searchQuery.trim() : "",
    500,
  );

  /** Update URL query params */
  const updateQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  /** On input change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateQueryParams(value);
  };

  /** On clear button click */
  const handleClear = () => {
    setSearchQuery("");
    updateQueryParams("");

    if (onSearchChange) onSearchChange("", "");
  };

  /** Notify parent about debounced value */
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchQuery, debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return (
    <Input
      className={className}
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleChange}
      leftSection={<IconSearch size={18} color="#64748B" />}
      leftSectionPointerEvents="none"
      rightSection={
        <CloseButton
          onClick={handleClear}
          aria-label="Clear search"
          style={{ visibility: searchQuery ? "visible" : "hidden" }}
        />
      }
      rightSectionPointerEvents="all"
      styles={{
        input: {
          border: "1px solid #e0d6f5",
          backgroundColor: "white",
          minWidth: 220,
          maxWidth: 350,
        },
        ...(styles || {}), // allow parent overrides
      }}
      {...props}
    />
  );
};

export default SearchInput;
