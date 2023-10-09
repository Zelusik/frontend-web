import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import RecommandSwiper from "./RecommandSwiper";
import { ScrollArea } from "components/core";
import { onScrollProps } from "components/core/ScrollArea/ScrollArea";
import { InnerTopNavigation } from "components/TopNavigation";

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
  const { recommendReviewDatas } = useGetRecommendReviews();

  return (
    <InnerTopNavigation
      scrollRef={refs?.[0]}
      innerScrollRef={refs?.[1]}
      scroll={332}
      padding={20}
      bottomHeight={mine ? 85 : 35}
      direction={direction}
    >
      <RecommandSwiper
        recommendReviewDatas={recommendReviewDatas}
        mine={mine}
        touch={touch}
      />
    </InnerTopNavigation>
  );
};

export default RecommendReviewCardContainer;
