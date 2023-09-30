import React from "react";
import { Flex, Box, Center, Text, Space } from "@mantine/core";
import { colors } from "constants/colors";
import { typo } from "constants/typo";

interface TitleProps {
  height?: number;
  padding?: number;
  position?: "relative" | "absolute";
  color?: string;

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
  color = "N100",

  renderLeft,
  textLeft = "",

  textCenter = "",

  buttonRight,
  renderRight,
}: TitleProps) => {
  return (
    // <Center h={height} style={{ width: "100%" }}>
    // <Box h={height}>
    <Box pos="relative">
      <Flex
        h={height}
        pl={padding}
        pr={padding}
        justify="space-between"
        pos={position}
        bottom={0}
        style={{ width: "100%" }}
      >
        <Flex>
          <Center>{renderLeft && renderLeft}</Center>
          <Text color={colors[color]} style={typo["Headline5"]}>
            {textLeft}
          </Text>
        </Flex>

        <Text color={colors[color]} style={typo["Headline3"]}>
          {textCenter}
        </Text>

        <Flex>
          {buttonRight && buttonRight}
          <Space w={4} />
          <Center>{renderRight && renderRight}</Center>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Title;
