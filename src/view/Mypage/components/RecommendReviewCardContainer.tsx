import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "hooks/useReduxHooks";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import { InnerTopNavigation } from "components/TopNavigation";
import NothingButton from "components/Button/NothingButton";
import RecommandSwiper from "./RecommandSwiper";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import { globalValue } from "constants/globalValue";

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
  const router = useRouter();
  const { recommendReviewDatas } = useGetRecommendReviews();
  const { display } = useAppSelector((state) => state.global);

  const handleClickButton = () => {
    if (recommendReviewDatas?.length === 0) {
      localStorage.setItem("state", "postRecommendReview");
    } else {
      localStorage.setItem("state", "updatetRecommendReview");
    }
    router.push(Route.RECOMMEND_BEST());
  };

  return (
    <InnerTopNavigation
      scrollRef={refs?.[0]}
      innerScrollRef={refs?.[1]}
      scroll={332}
      padding={20}
      bottomHeight={(mine ? 85 : 35) + globalValue.BOTTOM_NAVIGATION_HEIGHT}
      direction={direction}
    >
      {recommendReviewDatas && recommendReviewDatas?.length > 0 ? (
        <RecommandSwiper
          recommendReviewDatas={recommendReviewDatas}
          mine={mine}
          touch={touch}
        />
      ) : (
        mine && (
          <NothingButton
            height={display.height - 525}
            text="나만의 추천 음식점을 골라주세요"
            buttonText="추천 베스트 선택하기"
            buttonClick={handleClickButton}
          />
        )
      )}
    </InnerTopNavigation>
  );
};

export default RecommendReviewCardContainer;
