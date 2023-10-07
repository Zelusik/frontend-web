import { Box, Flex, Space, Text } from "components/core";
import Hashtag from "components/Hashtags/Hashtag";

export default function TasteBox({ profileData }: any) {
  return (
    <Flex
      w="100%"
      h={182}
      radius={12}
      bg="N0"
      shadow="0px 3px 18px 0px rgba(0, 0, 0, 0.08)"
    >
      <Box w="100%" m="auto" ph={20}>
        <Text typo="Headline5" c="N100">
          나의 취향은 🤤
        </Text>
        <Space h={14} />
        <Flex align="center" typo="Paragraph4" c="N80">
          <Hashtag
            hashtagText={
              profileData?.mostVisitedLocation
                ? profileData?.mostVisitedLocation
                : "_____"
            }
            typo="Headline2"
            color="Orange500"
          />
          <Flex ml={0} mr={10}>
            에서
          </Flex>
          <Hashtag
            hashtagText={
              profileData?.mostTaggedReviewKeyword
                ? profileData?.mostTaggedReviewKeyword
                : "_____"
            }
            typo="Headline2"
            color="Orange500"
          />
          <Flex ml={0} mr={10}>
            인
          </Flex>
        </Flex>
        <Space h={8} />
        <Flex align="center" typo="Paragraph4" c="N80">
          <Hashtag
            hashtagText={
              profileData?.mostEatenFoodCategory
                ? profileData?.mostEatenFoodCategory
                : "_____"
            }
            typo="Headline2"
            color="Orange500"
          />
          <Flex ml={0} mr={10}>
            음식점을 가장 많이 방문했어요
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
