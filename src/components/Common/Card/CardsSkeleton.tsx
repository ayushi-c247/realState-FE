"use client";
import { Grid, Card, Skeleton, Box } from "@mantine/core";

export default function CardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Grid mt={20}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Card padding="lg" radius={24} p={0}>
            <Box>
              {/* Image Skeleton */}
              <Skeleton height={180} radius="md" />
              <Box p={16}>
                {/* Title Skeleton */}
                <Skeleton height={16} width="70%" mt={10} />
                {/* Description Skeleton */}
                <Skeleton height={12} mt={8} width="90%" />
                <Skeleton height={12} mt={6} width="80%" />
              </Box>

              {/* Badge and Date Section */}
              <Box px={16} pb={16}>
                <Skeleton height={28} width="40%" radius="xl" mt={12} />
                <Skeleton height={12} width="60%" mt={12} />
              </Box>
            </Box>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
