import React from "react";
import { Carousel } from "@mantine/carousel";
import { CommonCarouselProps } from "@/types";

const CommonCarousel: React.FC<CommonCarouselProps> = ({
  list,
  renderItem,
  showControls = true,
  showIndicators = false,
  slideSize = "auto",
  slideGap = { base: "sm", sm: "md", md: "md", lg: "md" },
  styles,
  ...rest
}) => {
  return (
    <Carousel
      slideSize={slideSize}
      slideGap={slideGap}
      withControls={showControls}
      withIndicators={showIndicators}
      draggable
      styles={{
        indicators: {
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "0",
        },
        indicator: {
          width: 16,
          height: 16,
          borderRadius: 12,
          margin: "0 4px",
          background: "var(--shape-gradient)",
          transition: "width 250ms ease, opacity 250ms ease",
        },
        ...styles,
      }}
      {...rest}
      className="program-carousel"
    >
      {(list ?? [])?.map((m) => (
        <Carousel.Slide key={m?.id}>{renderItem(m)}</Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CommonCarousel;
