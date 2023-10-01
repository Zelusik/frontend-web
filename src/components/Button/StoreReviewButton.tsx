import { useRouter } from "next/router";
import { Center, Box, Flex, Text, Space, Image } from "@mantine/core";
import { Route } from "constants/Route";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

interface StoreReviewButtonProps {
  type: "store" | "review";
  id: number;
  name: string;
  category: string;

  color?: string;
  nameColor?: string;
  categoryColor?: string;
  nameTypo?: string;
  categoryTypo?: string;
}

const StoreReviewButton = ({
  type = "store",
  id,
  name,
  category,

  color = "N100",
  nameColor,
  categoryColor,
  nameTypo = "Headline6",
  categoryTypo = "Paragraph4",
}: StoreReviewButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: type === "store" ? Route.STORE_DETAIL() : Route.REVIEW_DETAIL(),
      query: { id },
    });
  };

  return (
    <Flex onClick={handleClick}>
      <Box>
        <Text
          c={colors[nameColor ? nameColor : color]}
          style={typography[nameTypo]}
        >
          {name}
        </Text>
        <Space h={4} />
        <Text
          c={colors[categoryColor ? categoryColor : color]}
          style={typography[categoryTypo]}
        >
          {category}
        </Text>
      </Box>
    </Flex>
  );
};

export default StoreReviewButton;
