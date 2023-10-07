import { useRouter } from "next/router";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import BobpoolSvg from "assets/bobpool_error.svg";
import { Box, Space, Text, Button } from "components/core";

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
    // <Center h={height}>
    <Box text="center">
      <Box text="center" w="auto" h={118}>
        <BobpoolSvg />
      </Box>
      <Space h={20} />
      <Text p={0} c={colors["N100"]} style={typography["Paragraph4"]}>
        {text}
      </Text>
      <Space h={14} />
      <Button
        variant="filled"
        w="auto"
        h={38}
        pl={20.5}
        pr={20.5}
        radius={38}
        bg={colors["Orange200"]}
        onClick={buttonClick}
      >
        <Text c={colors["N100"]} style={typography["Paragraph1"]}>
          {buttonText}
        </Text>
      </Button>
    </Box>
    // </Center>
  );
};

export default SadBobpool;
