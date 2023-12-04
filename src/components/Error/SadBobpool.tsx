import { useRouter } from "next/router";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import BobpoolSvg from "assets/bobpool_error.svg";
import { Box, Space, Text, Button, Flex } from "components/core";

interface SadBobpoolProps {
  height?: string | number;
  text?: string;
  buttonText?: string;
  buttonClick?: () => void;
}

const SadBobpool = ({
  height = "auto",
  text = "sad bobpool",
  buttonText = "sad bobpool",
  buttonClick,
}: SadBobpoolProps) => {
  const router = useRouter();

  return (
    <Flex h={height} justify="center" align="center">
      <Box text="center">
        <Box w="auto" h={118} text="center">
          <BobpoolSvg />
        </Box>
        <Space h={20} />
        <Text p={0} c="N100" typo="Paragraph4">
          {text}
        </Text>
        <Space h={14} />
        <Button
          w="auto"
          h={38}
          pl={20.5}
          pr={20.5}
          radius={38}
          bg="Orange200"
          onClick={buttonClick}
        >
          <Text c="N100" typo="Paragraph1">
            {buttonText}
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default SadBobpool;
