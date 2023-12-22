import { useRouter } from "next/router";
import { Box, Flex, Space, Text, Button } from "@/components/core";

interface NothingButtonProps {
  height?: string | number;
  text?: string;
  buttonText?: string;
  buttonClick?: () => void;
}

const NothingButton = ({
  height = "auto",
  text,
  buttonText = "nothing here",
  buttonClick,
}: NothingButtonProps) => {
  const router = useRouter();

  return (
    <Flex h={height} justify="center" align="center">
      <Box text="center">
        {text && (
          <Text p={0} typo="Paragraph5" c="N80">
            {text}
          </Text>
        )}
        <Space h={20} />
        <Button
          w="auto"
          h={48}
          ph={18.5}
          radius={48}
          bg="Orange600"
          onClick={buttonClick}
        >
          <Text typo="Paragraph5" c="N0">
            {buttonText}
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default NothingButton;
