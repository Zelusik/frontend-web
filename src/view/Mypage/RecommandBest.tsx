import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import useDisplaySize from "@/hooks/useDisplaySize";
import { initializeRecommendReview } from "@/reducer/slices/review/recommendReviewSlice";
import useGetReviews from "@/hooks/queries/user/useGetReviews";
import {
  postRecommendReviews,
  updateRecommendReviews,
} from "@/api/recommend-reviews";

import { Box, Button, Flex, ScrollArea, Space } from "@/components/core";
import Title from "@/components/Title";
import Icon from "@/components/Icon";
import Gradient from "@/components/Common/Gradient";
import Text from "@/components/core/Text";
import ReviewList from "./components/ReviewList";
import BackArrow from "@/components/Button/IconButton/BackArrow";

export default function RecommandBest() {
  const router = useRouter();
  const { height } = useDisplaySize();
  const dispatch = useAppDispatch();
  const recommendReview = useAppSelector((state) => state.recommendReview);
  const { reviewDatas, fetchNextPage, hasNextPage } = useGetReviews();

  const handleClickStore = async () => {
    const recommendReviews = recommendReview.map(
      (reviewId: any, index: any) => ({
        reviewId: reviewId,
        ranking: index + 1,
      })
    );

    if (localStorage.getItem("state") === "postRecommendReview") {
      // 등록
      for (const reviewData of recommendReviews) {
        await postRecommendReviews(reviewData);
      }
    } else {
      // 수정
      await updateRecommendReviews(recommendReviews);
    }
    dispatch(initializeRecommendReview());
    localStorage.removeItem("state");
    router.back();
  };

  return (
    <>
      <Box w="100%" ph={20} pos="fixed" bg="N0">
        <Title
          height={50}
          renderLeft={<Box w={24} h={24} />}
          textCenter="추천 베스트 수정하기"
          renderRight={<BackArrow icon="XButton" />}
        />
        <Space h={20} />
        <Text typo="Headline5">
          추천 베스트 3를
          <br />
          선택해주세요!
        </Text>
      </Box>
      <Space h={146} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollArea scroll="y" h={height - 240} ph={20} bg="N0">
          <ReviewList
            type="recommand-best"
            reviewDatas={reviewDatas}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </ScrollArea>
      </motion.div>
      <Gradient size={30} />

      <Flex w="100%" h={94} ph={17.5} gap={8} pos="fixed" bottom={0} bg="N0">
        <Button
          w="100%"
          h={54}
          radius={8}
          onClick={() => dispatch(initializeRecommendReview())}
          style={{ border: "1px solid #DBDCE2" }}
        >
          <Text c="N100" typo="Headline3">
            초기화
          </Text>
        </Button>
        <Button
          w="100%"
          h={54}
          radius={8}
          disabled={recommendReview.length !== 3}
          onClick={handleClickStore}
          bg="Orange600"
        >
          <Text c="N0" typo="Headline3">
            저장하기
          </Text>
        </Button>
      </Flex>
    </>
  );
}
