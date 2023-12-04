import { globalValue } from "constants/globalValue";
import Icon from "components/Icon";
import { Box, Flex } from "components/core";

interface FindLocationButtonProps {
  handleClick: () => void;
}

export default function FindLocationButton({
  handleClick,
}: FindLocationButtonProps) {
  return (
    <Box
      w={40}
      h={40}
      pt={11}
      pos="fixed"
      right={20}
      bg="N0"
      radius="50%"
      shadow="0px 0px 4px rgba(0, 0, 0, 0.12)"
      bottom={`calc(${globalValue.BOTTOM_NAVIGATION_HEIGHT}px + 20px + 24%)`}
      onClick={handleClick}
    >
      <Icon icon="FindLocation" />
    </Box>
  );
}
