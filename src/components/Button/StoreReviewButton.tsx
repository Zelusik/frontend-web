import { useRouter } from "next/router";
import { Route } from "constants/Route";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Box, Flex, Space, Text } from "components/core";

interface StoreReviewButtonProps {
  type: "store" | "review";
  id: number;
  name: string;
  category: string;

  color?: string;

  nameColor?: string;
  nameTypo?: string;

  categoryColor?: string;
  categoryTypo?: string;
}

const StoreReviewButton = ({
  type = "store",
  id,
  name,
  category,

  color = "N100",
  nameColor,
  nameTypo = "Headline6",

  categoryColor,
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
