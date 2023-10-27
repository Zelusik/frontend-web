import { useState } from "react";
import { Box, ScrollArea, Space } from "components/core";
import { onScrollProps } from "components/core/ScrollArea/ScrollArea";
import LoadingCircle from "components/Loading/LoadingCircle";
import { globalValue } from "constants/globalValue";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppSelector } from "hooks/useReduxHooks";
import ReviewList from "./ReviewList";
import { InnerTopNavigation } from "components/TopNavigation";
import NothingButton from "components/Button/NothingButton";
import { Route } from "constants/Route";
import { useRouter } from "next/router";

interface ReviewCardContainerProps {
  refs?: any;
  mine?: boolean;
  direction?: string;
}

const ReviewCardContainer = ({
  refs,
  mine,
  direction,
}: ReviewCardContainerProps) => {
  const router = useRouter();
  const { reviewDatas, isLoadingReview, fetchNextPage, hasNextPage } =
    useGetReviews();
  const { display } = useAppSelector((state) => state.global);

  const handleClickButton = () => {
    router.push(Route.REVIEW());
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
      {reviewDatas &&
      reviewDatas?.[0]?.contents?.length > 0 &&
      reviewDatas?.[0]?.data?.code !== 1200 ? (
        <>
          <ReviewList
            reviewDatas={reviewDatas}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
          {hasNextPage && (
            <>
              <LoadingCircle height={30} />
              <Space h={24} />
            </>
          )}
        </>
      ) : (
        <NothingButton
          height={display.height - 525}
          text="내가 방문한 음식점의 리뷰를 남겨보세요"
          buttonText="첫 리뷰 남기기"
          buttonClick={handleClickButton}
        />
      )}
    </InnerTopNavigation>
  );
};

export default ReviewCardContainer;
