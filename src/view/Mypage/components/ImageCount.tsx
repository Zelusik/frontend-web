import { Flex, Text } from "@/components/core";

interface ImageCountProps {
  currentIndex: number;
}

const ImageCount = ({ currentIndex }: ImageCountProps) => {
  return (
    <Flex pos="absolute" top={20} left={17} zIndex={1}>
      <Text
        w={28}
        align="center"
        c="Orange600"
        typo="Paragraph7"
        style={{ fontStyle: "italic" }}
      >
        {currentIndex}
      </Text>
    </Flex>
  );
};

export default ImageCount;
