import { Flex, Text } from "components/core";

interface ImageCountProps {
  style?: any;
  currentIndex: number;
}

const ImageCount = ({ style, currentIndex }: ImageCountProps) => {
  return (
    <Flex pos="absolute" top={20} left={20} zIndex={1}>
      <Text align="center" c="Orange600" typo="Paragraph7" style={style}>
        {currentIndex}
      </Text>
    </Flex>
  );
};

export default ImageCount;
