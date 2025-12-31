import { IRoundBadgeProp } from "@/types";
import { Box,Text } from "@mantine/core";
import React from "react";

export const RoundBadge = ({minWidth,title, bgColor, maxWidth, color}:IRoundBadgeProp) =>{
    return(
        <Box 
            miw={minWidth || "120px"}
            maw={maxWidth}
            bg={bgColor}
            ta="center"
            p="4px"
            style={{borderRadius:"8px"}}
        >
            <Text c={color || "#000"} component="span" size="xs">{title}</Text>
        </Box>
    )
}
