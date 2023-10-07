import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Flex, Text } from "components/core";

interface ImageCountProps {
  color?: string;
  style?: any;

  currentIndex: number;
  length: number;
}

const ImageCount = ({
  color,
  style,

  currentIndex,
  length,
}: ImageCountProps) => {
  return (
    <Flex h={24} justify="end" pos="absolute" top={16} right={16} zIndex={1}>
      <Text
        pl={11}
        pr={11}
        h={24}
        c={color}
        align="center"
        radius={24}
        typo="Paragraph2"
        style={style}
      >
        {currentIndex + 1}/{length}
      </Text>
    </Flex>
  );
};

export default ImageCount;
