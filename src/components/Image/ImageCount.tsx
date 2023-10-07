import { Box, Flex, Center } from "@mantine/core";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Text } from "components/core";

interface ImageCountProps {
  currentIndex: number;
  length: number;
}

const ImageCount = ({ currentIndex, length }: ImageCountProps) => {
  return (
    <Flex
      h={24}
      justify="end"
      pos="absolute"
      top={16}
      right={16}
      style={{ zIndex: 1 }}
    >
      <Text
        pl={11}
        pr={11}
        h={24}
        c={colors["N0"]}
        style={{
          ...typography["Paragraph2"],
          display: "flex",
          alignItems: "center",
          borderRadius: 24,
          background: "rgba(32, 35, 48, 0.6)",
        }}
      >
        {currentIndex + 1}/{length}
      </Text>
    </Flex>
  );
};

export default ImageCount;
