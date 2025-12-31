import { Box, Image, Modal } from "@mantine/core";
import React, { useState } from "react";

export default function ThumbnailWithPreview({
  src,
  alt,
  size = 48,
}: {
  src?: string | null;
  alt?: string;
  size?: number;
}) {
  const [opened, setOpened] = useState(false);

  if (!src) {
    return (
      <Box className="thumbnail-view-image">
        <Image
          src="/placeholder-image.svg"
          fit="cover"
          w={"100%"}
          h={"100%"}
          alt={alt || "thumbnail"}
        />
      </Box>
    );
  }

  return (
    <>
      <Box className="thumbnail-view-image">
        <Image
          src={src || undefined}
          fit="cover"
          w={"100%"}
          h={"100%"}
          alt={alt}
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation(); // don’t trigger row click
            setOpened(true);
          }}
        />
      </Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size="auto"
        radius="md"
        withCloseButton
        overlayProps={{ blur: 2, opacity: 0.25 }}
        padding={0}
        keepMounted={false}
        className="modal-image-view"
      >
        <Box className="modal-image-box">
          <Image src={src || undefined} alt={alt} fit="cover" h={"100%"} w="100%" />
        </Box>
      </Modal>
    </>
  );
}
