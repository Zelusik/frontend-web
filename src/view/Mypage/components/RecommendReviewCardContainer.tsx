import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import RecommandSwiper from "./RecommandSwiper";
import { ScrollArea } from "components/core";
import { onScrollProps } from "components/core/ScrollArea/ScrollArea";

interface RecommendReviewCardContainerProps {
  refs?: any;
  mine?: boolean;
  direction?: string;
  touch?: any;
}

const RecommendReviewCardContainer = ({
  refs,
  mine,
  direction,
  touch,
}: RecommendReviewCardContainerProps) => {
  const { display } = useAppSelector((state) => state.global);
  const { recommendReviewDatas } = useGetRecommendReviews();

  return (
    <ScrollArea
      veiwportRef={refs?.scrollRef1}
      ph={20}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      style={{ overflow: "hidden" }}
      onTouchMove={() => {
        if (
          direction === "up" &&
          refs?.scrollRef?.current?.scrollTop >= 332 &&
          refs?.scrollRef1?.current?.scrollTop === 0
        ) {
          refs?.scrollRef.current!.scrollTo({ top: 332 });
        }
      }}
      // onScroll={({ scrollY }: onScrollProps) => {
      //   // e.target.scrollTop
      // }}
    >
      <RecommandSwiper
        recommendReviewDatas={recommendReviewDatas}
        mine={mine}
        touch={touch}
      />
    </ScrollArea>
  );
};

export default RecommendReviewCardContainer;
