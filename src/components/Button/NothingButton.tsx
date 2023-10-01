import { useRouter } from "next/router";
import { Space, Center, Box, Text, Button } from "@mantine/core";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

interface NothingButtonProps {
  height?: string | number;
  text?: string;
  buttonText?: string;
  buttonClick?: () => void;
}

const NothingButton = ({
  height = "auto",
  text = "sad bobpool",
  buttonText = "sad bobpool",
  buttonClick,
}: NothingButtonProps) => {
  const router = useRouter();

  return (
    <Center h={height}>
      <Box ta="center">
        <Text p={0} c={colors["N80"]} style={typography["Paragraph5"]}>
          {text}
        </Text>
        <Space h={20} />
        <Button
          variant="filled"
          w="auto"
          h={48}
          pl={18.5}
          pr={18.5}
          radius={48}
          bg={colors["Orange600"]}
          onClick={buttonClick}
        >
          <Text c={colors["N0"]} style={typography["Paragraph5"]}>
            {buttonText}
          </Text>
        </Button>
      </Box>
    </Center>
  );
};

export default NothingButton;
