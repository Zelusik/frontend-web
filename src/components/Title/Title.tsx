import React from "react";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Box, Flex, Space, Text } from "components/core";

interface TitleProps {
  height?: number;
  padding?: number;
  position?: "relative" | "absolute";
  bottom?: number;
  color?: string;
  background?: string;

  renderLeft?: React.ReactNode;
  textLeft?: string;

  textCenter?: string;

  buttonRight?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const Title = ({
  height = 0,
  padding = 0,
  position = "relative",
  bottom = 0,
  color = "N100",
  background,

  renderLeft,
  textLeft = "",

  textCenter = "",

  buttonRight,
  renderRight,
}: TitleProps) => {
  return (
    <Flex
      w="100%"
      h={height}
      ph={padding}
      justify="space-between"
      pos={position}
      bottom={bottom}
      bg={background}
      zIndex={801}
    >
      <Flex>
        <Flex justify="center" align="center">
          {renderLeft && renderLeft}
        </Flex>
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
        <Space w={4} />
        <Flex justify="center" align="center">
          {renderRight && renderRight}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Title;
