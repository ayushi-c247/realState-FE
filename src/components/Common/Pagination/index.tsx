import { Group, Pagination,Select, Text } from "@mantine/core";
import React from 'react'

import { PaginationBarProps } from "@/types";

export const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  pageSize,
  total,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  labelPerPage,
}) => {
  return (
    <Group justify="space-between" mt="md" className="pagination-group">
      <Group gap="xs">
        <Text size="sm">{labelPerPage}</Text>
        <Select
          value={String(pageSize)}
          data={pageSizeOptions.map((v) => ({ value: v, label: v }))}
          onChange={(v) => {
            onPageSizeChange(Number(v) || pageSize);
          }}
          withCheckIcon={false}
          w={"70px"}
          styles={{
            input: {
              border: "none",
              boxShadow: "none",
              paddingRight:0,
            },
           
          }}

        />
      </Group>

      <Pagination
        value={page}
        onChange={onPageChange}
        total={Math.max(1, Math.ceil(total / pageSize))}
        boundaries={1}
        siblings={1}
        className="custom-pagination"
      />
    </Group>
  );
};
