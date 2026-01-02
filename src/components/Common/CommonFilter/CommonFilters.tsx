"use client";

import React, { useState, useEffect, useRef } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { Group, Checkbox, Box, ActionIcon, Tooltip, Text, Flex } from "@mantine/core";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FilterBarProps, FiltersState } from "@/types/Filters";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { normalizeFiltersUtil } from "@/utils";
import { DEFAULT_PAGINATION } from "@/constants";

/** Updates query params by merging new filters */

const updateFilterQuery = (router: any, pathname: string, filters: FiltersState) => {
  const query = Object.entries(filters)
    .filter(([_, value]) => value && value.length > 0)
    .map(([key, value]) => value.map((v) => `${key}=${encodeURIComponent(String(v))}`).join("&"))
    .join("&");

  router.replace(query ? `${pathname}?${query}` : pathname, { shallow: true });
};

/** Custom Checkbox Option */
const CheckboxOption = (props: any) => {
  const {
    data,
    innerProps,
    innerRef,
    isSelected,
    selectProps: { allOptionValues, value },
  } = props;

  const nonAllValues = allOptionValues.map((v: any) => String(v));
  const currentSelectedValues: string[] = Array.isArray(value)
    ? value.map((v: any) => String(v?.value ?? v))
    : [];

  const selectedCount = currentSelectedValues.filter((v: any) =>
    nonAllValues.includes(String(v)),
  ).length;

  let checked = isSelected;
  let indeterminate = false;

  if (data.value === "ALL") {
    checked = selectedCount === nonAllValues.length;
    indeterminate = selectedCount > 0 && selectedCount < nonAllValues.length;
  }

  return (
    <Flex
      align={"center"}
      ref={innerRef}
      {...innerProps}
      style={{
        padding: "8px 10px",
        borderRadius: 6,
      }}
      gap={10}
    >
      <Checkbox checked={checked} indeterminate={indeterminate} readOnly radius="sm" />
      <Text component="span" size="14" style={{ lineHeight: "20px" }}>
        {data.label}
      </Text>
    </Flex>
  );
};

const FilterBar: React.FC<FilterBarProps> = ({ filtersConfig, onFilterChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filters, setFilters] = useState<FiltersState>({});
  const resetFilterIcon = "/icons/reset-filter-icon.svg";
  const initialFilters: FiltersState = {};
  const t = useTranslations("filterMangement");
  filtersConfig.forEach((filter) => {
    const rawValues = searchParams.getAll(filter.key);
    let values: (string | number)[] = [];

    if (rawValues.length > 0) {
      if (filter.selectType === "multi") {
        const expanded = rawValues.flatMap((v) =>
          String(v)
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0),
        );
        values = expanded.map((v) =>
          filter.valueType === "number" && !isNaN(Number(v)) ? Number(v) : v,
        );
      } else {
        const first = rawValues[0];
        values = first ? [filter.valueType === "number" ? Number(first) : first] : [];
      }
    }

    initialFilters[filter.key] = values;
  });

  useEffect(() => {
    setFilters(initialFilters);
  }, [searchParams]);

  /** MULTI SELECT HANDLER */
  const handleFilterChange = (
    key: string,
    values: MultiValue<{ value: string; label: string }>,
    allOptionValues: (string | number)[],
  ) => {
    let updatedValues = values.map((v) => v.value);
    const nonAllValues = allOptionValues.map((v) => String(v));

    if (updatedValues.includes("ALL")) {
      const selectedCount = updatedValues.filter((v) => nonAllValues.includes(v)).length;

      if (selectedCount > 0 && selectedCount < nonAllValues.length) {
        updatedValues = [];
      } else {
        const allSelected = nonAllValues.every((v) => updatedValues.includes(v));
        updatedValues = allSelected ? [] : nonAllValues;
      }
    }

    const updatedFilters: FiltersState = {
      ...filters,
      [key]: updatedValues.map((v) => (key === "cluster_id" ? Number(v) : String(v))),
    };

    setFilters(updatedFilters);
    updateFilterQuery(router, pathname, updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  /** RESET FILTERS (YOUR REQUIRED LOGIC) */
  const resetFilters = () => {
    const cleared: FiltersState = {};

    filtersConfig.forEach((filter) => {
      cleared[filter.key] = [];
    });

    normalizeFiltersUtil(
      cleared,
      searchParams,
      pathname,
      router,
      DEFAULT_PAGINATION.page,
      DEFAULT_PAGINATION.limit,
    );

    // Refetch data after clearing
    onFilterChange && onFilterChange(cleared);
  };

  const activeFilters = Object.values(filters).some((v) => Array.isArray(v) && v.length > 0);

  return (
    <Group align="flex-end" gap="md" className="filter-bar" justify="end">
      <Text c="#081021" fw="500">
        {t("filters.title")} :
      </Text>
      {/* RESET BUTTON */}
      {activeFilters && (
        <Tooltip
          label={t("filters.resetFilterIcon")}
          withArrow
          position="top"
          offset={10}
          styles={{
            tooltip: {
              padding: "8px 12px",
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
          }}
        >
          <ActionIcon variant="transparent" onClick={resetFilters} style={{ marginRight: 8 }}>
            <Image
              src={resetFilterIcon}
              alt={t("filters.resetFilterIcon")}
              width={28}
              height={28}
            />
          </ActionIcon>
        </Tooltip>
      )}

      {filtersConfig.map((filter) => {
        const allOption = { value: "ALL", label: `All ${filter.label}` };
        const options = [
          allOption,
          ...filter.options.map((o) => ({ value: String(o.value), label: o.label })),
        ];
        const selectedValues = (filters[filter.key] || []).map((v) => String(v));

        // === MULTI SELECT ===
        if (filter.selectType === "multi") {
          const selectedOptions = options.filter((o) => selectedValues.includes(o.value));
          const isActive = selectedOptions.length > 0;
          const selectRef = useRef<any>(null);
          return (
            <Box key={filter.key} className="filter-bars">
              {isActive && (
                <label
                  className="custom-placeholder"
                  onClick={() => {
                    selectRef.current?.focus();
                    selectRef.current?.onMenuOpen();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {filter.label}
                </label>
              )}

              <Select
                ref={selectRef}
                className={`multiselect ${isActive ? "active" : ""}`}
                classNamePrefix="filter"
                options={options}
                placeholder={filter.label}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                isSearchable={false}
                components={{
                  Option: CheckboxOption,
                  MultiValueContainer: () => null,
                  MultiValue: () => null,
                }}
                inputValue=""
                value={selectedOptions}
                onChange={(val) =>
                  handleFilterChange(
                    filter.key,
                    val,
                    filter.options.map((o) => o.value),
                  )
                }
                //@ts-expect-error
                allOptionValues={filter.options.map((o) => o.value)}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "9999px",
                    backgroundColor: selectedOptions.length > 0 ? "var(--toggle-icon)" : "white",
                    color: selectedOptions.length > 0 ? "var(--white-color)" : "black",
                    border: "none",
                    boxShadow: "none",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: selectedOptions.length > 0 ? "var(--white-color)" : "var(--toggle-icon)",
                    padding: 0,
                    transform: "translateX(-5px)",
                  }),
                }}
              />
            </Box>
          );
        }

        // === SINGLE SELECT ===
        const selectedOption =
          filter.options
            .map((o) => ({ value: String(o.value), label: o.label }))
            .find((opt) => selectedValues.includes(opt.value)) || null;

        return (
          <Box key={filter.key} className="filter-bars">
            <Select
              className={`multiselect ${selectedOption ? "active" : ""}`}
              classNamePrefix="filter"
              options={filter.options.map((o) => ({
                value: String(o.value),
                label: o.label,
              }))}
              placeholder={filter.label}
              isClearable
              isSearchable={false}
              value={selectedOption}
              onChange={(val: SingleValue<{ value: string; label: string }>) => {
                const updatedFilters: FiltersState = {
                  ...filters,
                  [filter.key]: val
                    ? [filter.valueType === "number" ? Number(val.value) : val.value]
                    : [],
                };
                setFilters(updatedFilters);
                updateFilterQuery(router, pathname, updatedFilters);
                if (onFilterChange) onFilterChange(updatedFilters);
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "9999px",
                  backgroundColor: selectedOption ? "var(--toggle-icon)" : "white",
                  color: selectedOption ? "var(--white-color)" : "black",
                  minHeight: "36px",
                  border: "none",
                  boxShadow: "none",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: selectedOption ? "var(--white-color)" : "black",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: selectedOption ? "var(--white-color)" : "var(--toggle-icon)",
                  padding: 0,
                  transform: "translateX(-5px)",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }),
              }}
            />
          </Box>
        );
      })}
    </Group>
  );
};

export default FilterBar;
