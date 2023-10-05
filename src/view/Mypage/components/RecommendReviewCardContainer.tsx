import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Text, Space } from "@mantine/core";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import RecommandSwiper from "./RecommandSwiper";

const RecommendReviewCardContainer = ({
  scrollRef,
  scrollRef1,
  scrollRef2,
  scroll1,
  setScroll1,
  setTitleChange,
  mine,
  scrollHeight,
  profile,
  direction,
  touch,
}: any) => {
  const { display } = useAppSelector((state) => state.global);
  const { recommendReviewDatas } = useGetRecommendReviews();

  return (
    <Box
      ref={scrollRef1}
      pl={20}
      pr={20}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      style={{ overflow: "hidden" }}
      onTouchMove={() => {
        if (
          direction === "up" &&
          scrollRef1?.current?.scrollTop >= 0 &&
          scrollRef?.current?.scrollTop > 332
        ) {
          scrollRef.current!.scrollTo({ top: 332 });
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
