import { Box } from "@/components/core";
import Icon from "@/components/Icon";

export default function FoodTag({ onClick }: any) {
  return (
    <Box ph={20} pos="absolute" bottom={21} zIndex={900}>
      <Icon icon="FoodTag" width={24} height={24} onClick={onClick} />
    </Box>
  );
}
