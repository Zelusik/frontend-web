import { useRouter } from "next/router";
import { colors } from "constants/colors";
import { Box, Text } from "components/core";
import Button from "components/core/Button";

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
    <Box text="center">
      {text && (
        <Text p={0} mb={20} typo="Paragraph5" c="N80">
          {text}
        </Text>
      )}
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
  );
};

export default NothingButton;
