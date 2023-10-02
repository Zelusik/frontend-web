import { Flex, Box } from "@mantine/core";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import Icon from "components/Icon";

interface FindLocationButtonProps {
  handleClick: () => void;
}

export default function FindLocationButton({
  handleClick,
}: FindLocationButtonProps) {
  return (
    <Flex
      pos="fixed"
      bottom={`calc(${globalValue.BOTTOM_NAVIGATION_HEIGHT}px + 20px + 30%)`}
      style={{ width: "100%", maxWidth: globalValue.MAX_WIDTH }}
      onClick={handleClick}
    >
      <Box
        w={40}
        h={40}
        pt={11}
        pos="absolute"
        right={20}
        bg={colors["N0"]}
        style={{
          borderRadius: "50%",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Icon icon="FindLocation" />
      </Box>
    </Flex>
  );
}
