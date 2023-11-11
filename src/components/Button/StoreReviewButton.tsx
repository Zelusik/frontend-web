import { useRouter } from "next/router";
import { Route } from "constants/Route";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { Box, Flex, Space, Text } from "components/core";

interface StoreReviewButtonProps {
  type: "none" | "store" | "review";
  id: number;
  name: string;
  category: string;

  color?: string;

  nameColor?: string;
  nameTypo?: string;

  categoryColor?: string;
  categoryTypo?: string;

  disabled?: boolean;
}

const StoreReviewButton = ({
  type = "none",
  id,
  name,
  category,

  color = "N100",
  nameColor,
  nameTypo = "Headline6",

  categoryColor,
  categoryTypo = "Paragraph4",

  disabled = false,
}: StoreReviewButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    if (type === "none" || disabled) return;
    router.push({
      pathname: type === "store" ? Route.STORE_DETAIL() : Route.REVIEW_DETAIL(),
      query: { id },
    });
  };

  return (
    <Box onClick={handleClick}>
      <Text c={nameColor ? nameColor : color} typo={nameTypo}>
        {name && name}
      </Text>
      <Space h={4} />
      <Text c={categoryColor ? categoryColor : color} typo={categoryTypo}>
        {category && category}
      </Text>
    </Box>
  );
};

export default StoreReviewButton;
