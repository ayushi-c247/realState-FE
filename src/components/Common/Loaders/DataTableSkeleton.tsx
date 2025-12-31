"use client";
import { Box, Skeleton, Grid } from "@mantine/core";
import React from "react";

export default function DataTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <Box
      style={{
        borderRadius: "16px",
        backgroundColor: "var(--white-color)",
        padding: "0 16px",
        overflow: "hidden",
      }}
    >
      {/* Header Row (Table headings) */}
      <Grid
        gutter={16}
        align="center"
        style={{
          padding: "16px 0",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <Grid.Col span={4}>
          <Skeleton height={16} width="40%" radius="sm" />
        </Grid.Col>
        <Grid.Col span={3}>
          <Skeleton height={16} width="60%" radius="sm" />
        </Grid.Col>
        <Grid.Col span={2}>
          <Skeleton height={16} width="50%" radius="sm" />
        </Grid.Col>
        <Grid.Col span={2}>
          <Skeleton height={16} width="40%" radius="sm" />
        </Grid.Col>
        <Grid.Col span={1}>
          <Skeleton height={16} width="20px" radius="sm" />
        </Grid.Col>
      </Grid>

      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <Grid
          key={i}
          gutter={16}
          align="center"
          style={{
            padding: "16px 0",
            borderBottom:
              i !== rows - 1 ? "1px solid var(--border-color)" : "none",
          }}
        >
          {/* Module thumbnail + name */}
          <Grid.Col span={4}>
            <Box
              display="flex"
              style={{ alignItems: "center", gap: "12px" }}
            >
              <Skeleton
                height={100}
                width={150}
                radius="md"
                style={{ flexShrink: 0 }}
              />
              <Box style={{ flex: 1 }}>
                <Skeleton height={20} width="60%" mb={6} />
                <Skeleton height={20} width="40%" />
              </Box>
            </Box>
          </Grid.Col>

          {/* Cluster Name */}
          <Grid.Col span={3}>
            <Skeleton height={20} width="70%" />
          </Grid.Col>

          {/* Lesson Count */}
          <Grid.Col span={2}>
            <Skeleton
              height={30}
              width={32}
              radius="6px"
              style={{ margin: "auto" }}
            />
          </Grid.Col>

          {/* Status Badge */}
          <Grid.Col span={2}>
            <Skeleton
              height={28}
              width={90}
              radius="xl"
              style={{ margin: "auto" }}
            />
          </Grid.Col>

          {/* Action Menu */}
          <Grid.Col span={1}>
            <Skeleton
              height={20}
              width={20}
              radius="sm"
              style={{ margin: "auto" }}
            />
          </Grid.Col>
        </Grid>
      ))}
    </Box>
  );
}
