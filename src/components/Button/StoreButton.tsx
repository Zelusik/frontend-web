import { useRouter } from "next/router";
import { Center, Box, Flex, Text, Space, Image } from "@mantine/core";
import { Route } from "constants/Route";
import { colors } from "constants/colors";
import { typo } from "constants/typo";

interface StoreButtonProps {
  id: number;
  name: string;
  category: string;

  color?: string;
  nameColor?: string;
  categoryColor?: string;
  nameTypo?: string;
  categoryTypo?: string;
}

const StoreButton = ({
  id,
  name,
  category,

  color = "N100",
  nameColor,
  categoryColor,
  nameTypo = "Headline6",
  categoryTypo = "Paragraph4",
}: StoreButtonProps) => {
  const router = useRouter();
  const handleClickStore = () => {
    router.push({
      pathname: Route.REVIEW_DETAIL(),
      query: { id },
    });
  };

  return (
    <Flex onClick={handleClickStore}>
      <Box>
        <Text c={colors[nameColor ? nameColor : color]} style={typo[nameTypo]}>
          {name}
        </Text>
        <Text
          c={colors[categoryColor ? categoryColor : color]}
          style={typo[categoryTypo]}
        >
          {category}
        </Text>
      </Box>
    </Flex>
  );
};

export default StoreButton;
