import React from "react";
import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { Box, Flex, Space, Text } from "@/components/core";

interface TitleProps {
  height?: number;
  padding?: number;
  position?: "relative" | "absolute";
  top?: number;
  bottom?: number;
  color?: string;
  background?: any;
  zIndex?: number;

  renderLeft?: React.ReactNode;
  paddingLeft?: number;
  textLeft?: string;

  textCenter?: string;

  buttonRight?: React.ReactNode;
  paddingRight?: number;
  renderRight?: React.ReactNode;
}

const Title = ({
  height = 0,
  padding = 0,
  position = "relative",
  top,
  bottom,
  color = "N100",
  background,
  zIndex = 801,

  renderLeft,
  paddingLeft,
  textLeft = "",

  textCenter = "",

  buttonRight,
  paddingRight,
  renderRight,
}: TitleProps) => {
  return (
    <Flex
      w="100%"
      h={height}
      ph={padding}
      justify="space-between"
      pos={position}
      top={top}
      bottom={bottom}
      bg={background}
      zIndex={zIndex}
    >
      <Flex>
        <Flex justify="center" align="center">
          {renderLeft && renderLeft}
        </Flex>
        <Space w={paddingLeft} />
        <Flex justify="center" align="center">
          <Text typo="Headline5" c={color}>
            {textLeft}
          </Text>
        </Flex>
      </Flex>

      <Flex justify="center" align="center">
        <Text typo="Headline3" c={color}>
          {textCenter}
        </Text>
      </Flex>

      <Flex>
        <Flex justify="center" align="center">
          {buttonRight && buttonRight}
        </Flex>
        <Space w={paddingRight} />
        <Flex justify="center" align="center">
          {renderRight && renderRight}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Title;
