"use client";

import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Menu,
  Modal,
  NumberInput,
  Paper,
  Tabs,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconChevronDown,
  IconCirclePlus,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconSend,
  IconTrash,
} from "@tabler/icons-react";
import type { DataTableSortStatus } from "mantine-datatable";
import { DataTable } from "mantine-datatable";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/Common/EmptyDatatable/EmptyState";
import { DeleteModal } from "@/components/Common/Modals";
import SectionHeader from "@/components/Common/SectionHeader";
import {
  useDeleteUserMutation,
  useGetAllUserDataQuery,
  useResendInvitation,
  useUpdateStatusMutation,
  useUpdateAgentApprovalStatusMutation,
} from "@/hooks/user/Details";
import {
  IUserList,
  AgentApprovalStatusEnum,
  AgentApprovalStatusLabels,
} from "@/types/User";
import { paths } from "@/routes";
import {
  normalizeFiltersUtil,
  getFormattedFullName,
  capitalize,
} from "@/utils";

import SearchInput from "@/components/Common/SearchInput";
import FilterBar from "@/components/Common/CommonFilter/CommonFilters";
import { getNextTableHandlers, useListController } from "@/utils/table";
import DataTableSkeleton from "@/components/Common/Loaders/DataTableSkeleton";

import AddUser from "./AddUser";
import { INVESTOR_AGENT_TABS, InvestorAgentTab } from "@/constants";
import { getFilterConfig } from "@/utils/filters";
import { FILETR_ENTITIES } from "@/constants/common";

export default function UserList() {
  const tUserMangement = useTranslations("userManagement");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState({
    status: false,
    role: "",
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userDetail, setUserDetail] = useState<IUserList | null>(null);

  const searchParams = useSearchParams();
  const { page, pageSize } = useListController();
  const [filter, setFilter] = useState<Record<string, any>>({});
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const pathname = usePathname();
  const g = useTranslations("generic");
  const initialTabFromUrl = searchParams.get("role") as InvestorAgentTab | null;
  const defaultTab: InvestorAgentTab =
    initialTabFromUrl ||
    (pathname === paths.ROOT_INVESTOR_MANAGEMENT
      ? INVESTOR_AGENT_TABS.INVESTOR
      : pathname === paths.ROOT_AGENT_MANAGEMENT
        ? INVESTOR_AGENT_TABS.AGENT
        : INVESTOR_AGENT_TABS.INVESTOR);

  const [activeTab, setActiveTab] = useState<InvestorAgentTab>(defaultTab);

  const router = useRouter();

  useEffect(() => {
    const filterObj: Record<string, any> = {};

    filtersConfig.forEach((filter) => {
      const values = searchParams.getAll(filter.key);

      if (values.length) {
        filterObj[filter.key] = values.map((v) =>
          filter.valueType === "number" ? Number(v) : v
        );
      }
    });

    setFilter(filterObj); // now all filters restored from URL after refresh
  }, [searchParams]);

  const mergedFilterString = useMemo(() => {
    const base: { role: string; [key: string]: any } = { role: activeTab };

    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        base[key] = value.join(",");
      }
    });

    return JSON.stringify(base);
  }, [activeTab, filter]);

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<IUserList>>({
    columnAccessor: "name",
    direction: "asc",
  });
  const [userHasSorted, setUserHasSorted] = useState(false);

  const columnToBackendField = (
    tab: string | null,
    accessor: string
  ): string => {
    const mapCommon: Record<string, string> = {
      name: "first_name",
      lastName: "last_name",
      email: "email",
      status: "status",
    };
    if (accessor === "name") return mapCommon.parentNameChild;
    return mapCommon[accessor] || "first_name";
  };

  const tabToPath: Record<InvestorAgentTab, string> = {
    investor: paths.ROOT_INVESTOR_MANAGEMENT,
    agent: paths.ROOT_AGENT_MANAGEMENT,
  };

  const filtersConfig = getFilterConfig(FILETR_ENTITIES.USER);

  const { data: userAllData, isPending: isUserListPending } =
    useGetAllUserDataQuery({
      page: page,
      limit: pageSize,
      search: debouncedSearchQuery || undefined,
      sortBy: userHasSorted
        ? columnToBackendField(activeTab, sortStatus.columnAccessor)
        : undefined,
      sortOrder: userHasSorted ? sortStatus.direction : undefined,
      filter: mergedFilterString,
    });

  // user status update
  const { mutateAsync: updateUserStatus } = useUpdateStatusMutation();
  const { mutateAsync: updateAgentApprovalStatus } =
    useUpdateAgentApprovalStatusMutation();
  const { mutateAsync: deleteUser, isPending: isDeleting } =
    useDeleteUserMutation();
  const { mutateAsync: resendInvitation, isPending: isResendInvite } =
    useResendInvitation();
  const showPagination = userAllData?.data?.total ?? 0;

  /** Columns for Investor Table */
  const columns = [
    {
      accessor: "name",
      title: tUserMangement("table.columns.title.fullName"),
      sortable: true,
      width: 250,
      render: (row: IUserList) => (
        <Flex
          gap={12}
          align="center"
          className="cursor-pointer"
          onClick={() => handleViewDetails(row)}
        >
          <Text
            fz={"var(--font-size-sm)"}
            fw={400}
            c="var(--body-color)"
            tt={"capitalize"}
            lineClamp={2}
          >
            {getFormattedFullName(row.first_name || "", row.last_name || "")}
          </Text>
        </Flex>
      ),
    },
    {
      accessor: "email",
      title: tUserMangement("table.columns.title.email"),
      sortable: true,
      render: (record: IUserList) => record.email,
    },
    {
      accessor: "last_login_date",
      title: tUserMangement("table.columns.title.lastLogin"),
      sortable: true,
      render: (record: IUserList) => record.last_login_date ?? "-",
    },

    {
      accessor: "status",
      title: tUserMangement("table.columns.title.status"),
      sortable: true,
      textAlign: "center" as const,
      width: "350",
      render: (row: IUserList) => {
        const isActive = row.status === "ACTIVE";
        if (row.status === "PENDING") {
          return (
            <Flex
              justify="center"
              align="center"
              style={{
                backgroundColor: "#FFFBE6",
                color: "#8B6F00",
                borderRadius: 16,
                height: 35,
                minWidth: "180px",
              }}
            >
              {tUserMangement("table.columns.status.pending")}
            </Flex>
          );
        }

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
                {capitalize(row.status)}
                <IconChevronDown size={14} style={{ marginLeft: 8 }} />
              </Flex>
            </Menu.Target>
            <Menu.Dropdown miw={"180px"}>
              {!isActive && (
                <Menu.Item
                  onClick={() => handleStatusChange("ACTIVE", row.id)}
                  ta={"center"}
                >
                  {tUserMangement("table.columns.status.active")}
                </Menu.Item>
              )}
              {isActive && (
                <Menu.Item
                  onClick={() => handleStatusChange("INACTIVE", row.id)}
                  ta={"center"}
                >
                  {tUserMangement("table.columns.status.inactive")}
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        );
      },
    },
    {
      accessor: "actions",
      title: tUserMangement("table.columns.title.actions"),
      render: (record: IUserList) => (
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => handleViewDetails(record)}>
              <Box className="menu-item-content">
                <IconEye size={20} />
                <Text fz={14} fw={400}>
                  {tUserMangement("table.columns.title.viewaction")}
                </Text>
              </Box>
            </Menu.Item>
            <Menu.Item onClick={() => handleEdit(record)}>
              <Box className="menu-item-content">
                <IconEdit size={20} />
                <Text fz={14} fw={400}>
                  {tUserMangement("table.columns.title.editaction")}
                </Text>
              </Box>
            </Menu.Item>
            <Menu.Item onClick={() => handleDelete(record.id, "Investor")}>
              <Box className="menu-item-content">
                <IconTrash size={20} />
                <Text fz={14} fw={400}>
                  {tUserMangement("table.columns.title.deleteaction")}
                </Text>
              </Box>
            </Menu.Item>
            {record.status === "INACTIVE" &&
              record.role === "PARENT" &&
              record.is_email_verified === false && (
                <Menu.Item
                  onClick={() => handleResendInviation(record.id)}
                  disabled={isResendInvite}
                >
                  <Box className="menu-item-content">
                    <IconSend size={20} />
                    <Text fz={14} fw={400}>
                      {tUserMangement("table.columns.title.resendInviteaction")}
                    </Text>
                  </Box>
                </Menu.Item>
              )}
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];
  const handleAgentApprovalChange = async (
    status: AgentApprovalStatusEnum,
    id: number
  ) => {
    try {
      const { message } = await updateAgentApprovalStatus({
        id,
        input: { status },
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

  const agentApprovalColumn = [
    {
      accessor: "agent_approval_status",
      title: "Approval Status",
      sortable: true,
      textAlign: "center" as const,
      width: 350,

      render: (row: IUserList) => {
        const status =
          row.agent_profile?.approval_status || AgentApprovalStatusEnum.PENDING;

        const isApproved = status === AgentApprovalStatusEnum.APPROVED;

        return (
          <Menu>
            <Menu.Target>
              <Flex
                justify="center"
                align="center"
                className={
                  status === AgentApprovalStatusEnum.APPROVED
                    ? "status-badge-active"
                    : status === AgentApprovalStatusEnum.REJECTED
                      ? "status-badge-inactive"
                      : ""
                }
                style={
                  status === AgentApprovalStatusEnum.PENDING
                    ? {
                        backgroundColor: "#FFFBE6",
                        color: "#8B6F00",
                        borderRadius: 16,
                        height: 35,
                        minWidth: "180px",
                        cursor: "pointer",
                      }
                    : { cursor: "pointer" }
                }
              >
                {AgentApprovalStatusLabels[status]}
                <IconChevronDown size={14} style={{ marginLeft: 8 }} />
              </Flex>
            </Menu.Target>

            <Menu.Dropdown miw={"180px"}>
              {Object.values(AgentApprovalStatusEnum).map((value) => (
                <Menu.Item
                  key={value}
                  ta="center"
                  onClick={() => handleAgentApprovalChange(value, row.id)}
                >
                  {AgentApprovalStatusLabels[value]}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        );
      },
    },
  ];

  const getColumns = () => {
    switch (activeTab) {
      case INVESTOR_AGENT_TABS.INVESTOR:
        return columns;

      case INVESTOR_AGENT_TABS.AGENT:
        const arr = [...columns, ...agentApprovalColumn];
        return arr;
      default:
        return [];
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case INVESTOR_AGENT_TABS.INVESTOR:
        return tUserMangement("placeholders.investor");
      case INVESTOR_AGENT_TABS.AGENT:
        return tUserMangement("placeholders.agent");
      default:
        return tUserMangement("placeholders.typeToSearch");
    }
  };

  const handleEdit = (row: IUserList) => {
    setUserDetail(row);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewDetails = (row: IUserList) => {
    // Default to the clicked row
    let targetUserId: number | undefined = row?.id;
    if (targetUserId) {
      router.push(`${tabToPath[activeTab]}/${row.id}`);
    } else {
      showNotification({
        title: tUserMangement("error"),
        message: tUserMangement("unknownRouteError"),
        color: "red",
      });
    }
  };

  const handleTabChange = (tab: string | null) => {
    if (!tab) return; // handle null case

    const typedTab = tab as InvestorAgentTab;
    setActiveTab(typedTab);

    const query = new URLSearchParams();
    query.set("role", typedTab);
    router.replace(`${tabToPath[typedTab]}`, undefined);
  };

  const { handlePageChange, handlePageSizeChange } = getNextTableHandlers({
    router,
    pathname,
    searchParams,
    pageSize,
  });

  const handleStatusChange = async (
    newStatus: "ACTIVE" | "INACTIVE",
    id: number
  ) => {
    try {
      const { message } = await updateUserStatus({
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

  // delete modal

  const handleDelete = (id: number | undefined, role: string) => {
    if (id) {
      setSelectedUserId(id);
      setShowDeleteModal({ status: true, role });
    }
  };
  const handleResendInviation = async (user_id: number) => {
    try {
      const { message } = await resendInvitation({ input: { user_id } });
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

  const onDelete = async (id: number) => {
    if (!id) return null;

    try {
      const { message } = await deleteUser({ id });
      setShowDeleteModal({ status: false, role: "" });
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

  return (
    <Container size="xxl" className="max-container">
      <SectionHeader title={tUserMangement("title")}>
        <Box pt={10}>
          <Flex gap={20} wrap={"wrap"} justify={"end"} mb={20}>
            <SearchInput
              placeholder={getPlaceholder()}
              onSearchChange={(value, debouncedValue) => {
                setDebouncedSearchQuery(debouncedValue);
              }}
              radius="xl"
              size="md"
            />
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              rightSection={<IconCirclePlus size={24} />}
              className="gradiant-button"
              variant="gradient"
            >
              {activeTab === INVESTOR_AGENT_TABS.AGENT
                ? tUserMangement("button.addAgent")
                : tUserMangement("button.addInvestor")}
            </Button>
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
        <Tabs
          className="common-tab"
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List>
            <Tabs.Tab
              value="investor"
              py={12}
              px={20}
              size={14}
              fw={500}
              className="tab-button"
            >
              {tUserMangement("tabs.investor")}
            </Tabs.Tab>
            <Tabs.Tab
              value="agent"
              py={12}
              px={20}
              size={14}
              fw={500}
              className="tab-button"
            >
              {tUserMangement("tabs.agent")}
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {isUserListPending ? (
          <DataTableSkeleton rows={10} />
        ) : (
          <DataTable
            minHeight={750}
            withTableBorder={false}
            records={userAllData?.data?.users}
            columns={getColumns()}
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
            totalRecords={userAllData?.data?.total}
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
                (userAllData?.data?.total ?? 0) / pageSize
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
        <Modal
          opened={isModalOpen}
          onClose={() => {
            handleCloseModal();
          }}
          closeOnClickOutside={false}
          closeOnEscape={false}
          size="xl"
          title={
            activeTab === INVESTOR_AGENT_TABS.AGENT
              ? tUserMangement("button.addAgent")
              : tUserMangement("button.addInvestor")
          }
          centered
          className="common-modal"
          withCloseButton
        >
          <AddUser onCloseModal={handleCloseModal} role={activeTab} />
        </Modal>
        {showDeleteModal && (
          <DeleteModal
            opened={showDeleteModal.status}
            onCancel={() => setShowDeleteModal({ status: false, role: "" })}
            onConfirm={() => selectedUserId && onDelete(selectedUserId)}
            loading={isDeleting}
            title={`${tUserMangement("confirmDelete.title")} ${showDeleteModal.role}`}
            description={`${tUserMangement("confirmDelete.description", { role: showDeleteModal.role })}`}
            itemDetails={
              selectedUserId
                ? [
                    {
                      label: tUserMangement("table.columns.title.fullName"),
                      value: String(
                        userAllData?.data?.users?.find(
                          (u) => u.id === selectedUserId
                        )?.full_name || "-"
                      ),
                    },
                    {
                      label: tUserMangement("table.columns.title.email"),
                      value: String(
                        userAllData?.data?.users?.find(
                          (u) => u.id === selectedUserId
                        )?.email || "-"
                      ),
                    },
                  ]
                : []
            }
            confirmText={tUserMangement("confirmDelete.delete")}
            cancelText={tUserMangement("confirmDelete.cancel")}
          />
        )}
      </Paper>
    </Container>
  );
}
