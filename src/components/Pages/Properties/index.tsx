"use client";

import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Group,
  Menu,
  NumberInput,
  Paper,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconChevronDown,
  IconDotsVertical,
  IconEye,
} from "@tabler/icons-react";
import type { DataTableSortStatus } from "mantine-datatable";
import { DataTable } from "mantine-datatable";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import EmptyState from "@/components/Common/EmptyDatatable/EmptyState";

import SectionHeader from "@/components/Common/SectionHeader";

import { paths } from "@/routes";
import { capitalize, normalizeFiltersUtil } from "@/utils";

import SearchInput from "@/components/Common/SearchInput";
import FilterBar from "@/components/Common/CommonFilter/CommonFilters";
import { getNextTableHandlers, useListController } from "@/utils/table";
import DataTableSkeleton from "@/components/Common/Loaders/DataTableSkeleton";

import { INVESTOR_AGENT_TABS, InvestorAgentTab } from "@/constants";
import { getFilterConfig } from "@/utils/filters";
import { FILETR_ENTITIES } from "@/constants/common";
import {
  useGetAllPropertiesQuery,
  useUpdatePropertyStatusMutation,
} from "@/hooks/property";
import { IProperty, PropertyVisibilityEnum } from "@/types/Property";

export default function UserList() {
  const tProperty = useTranslations("propertyManagement");
  const searchParams = useSearchParams();
  const { page, pageSize } = useListController();
  const [filter, setFilter] = useState<Record<string, any>>({});
  const pathname = usePathname();
  const g = useTranslations("generic");

  const { data: propertyData, isLoading: isListPending } =
    useGetAllPropertiesQuery({
      page: page,
      limit: pageSize,
    });
  const { mutateAsync: updatePropertyStatus } =
    useUpdatePropertyStatusMutation();

  const router = useRouter();

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<IProperty>>({
    columnAccessor: "name",
    direction: "asc",
  });
  const [userHasSorted, setUserHasSorted] = useState(false);

  const filtersConfig = getFilterConfig(FILETR_ENTITIES.USER);

  const showPagination = propertyData?.data?.total ?? 0;
  const handleStatusChange = async (
    newStatus: "ACTIVE" | "INACTIVE",
    id: number
  ) => {
    try {
      const { message } = await updatePropertyStatus({
        id,
        input: { status: newStatus },
      });
      showNotification({
        color: "green",
        title: "Success",
        message: message,
      });
    } catch (error) {
      showNotification({
        color: "red",
        title: "Error",
        message: `${(error as Error).message}`,
      });
    }
  };

  /** Columns for Investor Table */

  const columns = [
    {
      accessor: "title",
      title: "Project Name",
      sortable: true,
      width: 250,
      render: (row: IProperty) => row.specifications?.[0]?.title || "-",
    },

    {
      accessor: "location",
      title: "Location",
      sortable: true,
      render: (row: IProperty) => row.specifications?.[0]?.location || "-",
    },

    {
      accessor: "property_type",
      title: "Property Type",
      sortable: true,
      render: (row: IProperty) => row.specifications?.[0]?.property_type || "-",
    },

    {
      accessor: "price_range",
      title: "Price Range",
      sortable: true,
      render: (row: IProperty) =>
        row.price ||
        `₹ ${row.specifications?.[0]?.price_min} L - ${row.specifications?.[0]?.price_max} Cr`,
    },
    {
      accessor: "visibility_status",
      title: "Status",
      sortable: true,
      textAlign: "center" as const,

      render: (row: IProperty) => {
        const isActive: boolean =
          row.visibility_status === PropertyVisibilityEnum.ACTIVE;

        return (
          <Menu>
            <Menu.Target>
              <Flex
                justify="center"
                align="center"
                className={
                  isActive ? "status-badge-active" : "status-badge-inactive"
                }
              >
                {capitalize(row.visibility_status)}
                <IconChevronDown size={14} style={{ marginLeft: 8 }} />
              </Flex>
            </Menu.Target>

            <Menu.Dropdown miw={"180px"}>
              {isActive && (
                <Menu.Item
                  ta="center"
                  onClick={() => handleStatusChange("INACTIVE", row.id)}
                >
                  {PropertyVisibilityEnum.INACTIVE}
                </Menu.Item>
              )}

              {!isActive && (
                <Menu.Item
                  ta="center"
                  onClick={() => handleStatusChange("ACTIVE", row.id)}
                >
                  {PropertyVisibilityEnum.ACTIVE}
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        );
      },
    },

    {
      accessor: "actions",
      title: "Actions",
      render: (row: IProperty) => (
        <Menu position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => router.push(`/properties/${row.id}`)}>
              <IconEye size={18} /> View
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

  const { handlePageChange, handlePageSizeChange } = getNextTableHandlers({
    router,
    pathname,
    searchParams,
    pageSize,
  });

  // delete modal

  return (
    <Container size="xxl" className="max-container">
      <SectionHeader title={tProperty("title")}>
        <Box pt={10}>
          <Flex gap={20} wrap={"wrap"} justify={"end"} mb={20}>
            {/* <SearchInput
              placeholder={getPlaceholder()}
              onSearchChange={(value, debouncedValue) => {
                setDebouncedSearchQuery(debouncedValue);
              }}
              radius="xl"
              size="md"
            /> */}
          </Flex>
          <Flex gap="md" wrap="wrap" justify={"end"}>
            <FilterBar
              filtersConfig={filtersConfig}
              onFilterChange={(filterObj) => {
                const normalized = normalizeFiltersUtil(
                  filterObj,
                  searchParams,
                  pathname,
                  router
                );
                setFilter(normalized);
              }}
            />
          </Flex>
        </Box>
      </SectionHeader>

      <Paper>
        {isListPending ? (
          <DataTableSkeleton rows={10} />
        ) : (
          <DataTable
            minHeight={750}
            withTableBorder={false}
            records={propertyData?.data?.properties}
            columns={columns}
            page={page}
            recordsPerPage={pageSize}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handlePageSizeChange}
            recordsPerPageOptions={[5, 10, 20, 50]}
            sortStatus={sortStatus}
            onSortStatusChange={(s: DataTableSortStatus<any>) => {
              setSortStatus(s);
              setUserHasSorted(true);
            }}
            totalRecords={propertyData?.data?.total}
            fetching={false}
            highlightOnHover
            emptyState={
              <EmptyState
                heading={g("emptytable.heading")}
                description={g("emptytable.description")}
              />
            }
            renderPagination={({ state, Controls }) => {
              const totalPages = Math.ceil(
                (propertyData?.data?.total ?? 0) / pageSize
              );

              return (
                <>
                  <Controls.Text />
                  <Controls.PageSizeSelector />
                  {totalPages > 1 && (
                    <Group gap="xs">
                      <Text size={state.paginationSize}>
                        {g("pagination.jumpTo")}
                      </Text>
                      <NumberInput
                        styles={{ wrapper: { "--input-height-sm": "30px" } }}
                        hideControls
                        w={50}
                        size={state.paginationSize}
                        onChange={(v) => {
                          const newPage = Math.max(
                            Math.round(Number(v) || 1),
                            1
                          );
                          handlePageChange(newPage);
                        }}
                        min={1}
                        step={1}
                        allowDecimal={false}
                        value={page}
                      />
                    </Group>
                  )}

                  <Controls.Pagination />
                </>
              );
            }}
            classNames={{
              pagination: showPagination ? undefined : "hidden",
            }}
          />
        )}
      </Paper>
    </Container>
  );
}
