"use client";

import { EmptyStateProps } from "@/types/Common";
import { Button, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EmptyState({
  image = "/no-data-found.svg",
  heading,
  description,
  buttonText,
  buttonHref,
  onButtonClick,
}: EmptyStateProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonHref) {
      router.push(buttonHref);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <Image src={image} alt="Empty state" width={250} height={250} />
      <Text fw={600} size="lg" mt={10}>
        {heading}
      </Text>
      {description && <Text mb="sm">{description}</Text>}
      {buttonText && (
        <Button
          variant="gradient"
          onClick={handleClick}
          className="gradiant-button"
          radius="var(--radius-xxl)"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
