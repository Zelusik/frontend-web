import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Flex, Text } from "components/core";

interface ImageCountProps {
  color?: string;
  top?: string | number;
  right?: string | number;
  style?: any;

  currentIndex: number;
  length: number;
}

const ImageCount = ({
  color = "N0",
  top,
  right,
  style,

  currentIndex,
  length,
}: ImageCountProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      pos="absolute"
      top={top}
      right={right}
      zIndex={1}
    >
      <Text
        pv={4}
        ph={11}
        c={color}
        radius={24}
        typo="Paragraph2"
        style={{ ...style, background: "rgba(32, 35, 48, 0.60)" }}
      >
        {currentIndex + 1}/{length}
      </Text>
    </Flex>
  );
};

export default ImageCount;
