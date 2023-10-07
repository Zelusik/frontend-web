import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Space } from "@mantine/core";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import RecommandSwiper from "./RecommandSwiper";

const RecommendReviewCardContainer = ({
  refs,
  mine,
  direction,
  touch,
}: any) => {
  const { display } = useAppSelector((state) => state.global);
  const { recommendReviewDatas } = useGetRecommendReviews();

  return (
    <Box
      ref={refs?.scrollRef1}
      pl={20}
      pr={20}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      style={{ overflow: "hidden" }}
      onTouchMove={() => {
        if (
          direction === "up" &&
          refs?.scrollRef1?.current?.scrollTop >= 0 &&
          refs?.scrollRef?.current?.scrollTop > 332
        ) {
          refs?.scrollRef.current!.scrollTo({ top: 332 });
        }
      }}
      // onScroll={(e: any) => {
      //   e.target.scrollTop
      // }}
    >
      <RecommandSwiper
        recommendReviewDatas={recommendReviewDatas}
        mine={mine}
        touch={touch}
      />
    </Box>
  );
};

export default RecommendReviewCardContainer;
