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
  background = "N0",

  renderLeft,
  textLeft = "",

  textCenter = "",

  buttonRight,
  renderRight,
}: TitleProps) => {
  return (
    <Box pos="relative" bg={colors[background]}>
      <Flex
        h={height}
        pl={padding}
        pr={padding}
        justify="space-between"
        pos={position}
        bottom={bottom}
        style={{ width: "100%" }}
      >
        <Flex>
          {/* <Center> */}
          {renderLeft && renderLeft}
          {/* </Center> */}
          {/* <Center> */}
          <Text typo="Headline5" c={color} style={typography["Headline5"]}>
            {textLeft}
          </Text>
          {/* </Center> */}
        </Flex>

        <Text typo="Headline3" c={color} style={typography["Headline3"]}>
          {textCenter}
        </Text>

        <Flex>
          {buttonRight && buttonRight}
          <Space w={4} />
          {/* <Center> */}
          {renderRight && renderRight}
          {/* </Center> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Title;
