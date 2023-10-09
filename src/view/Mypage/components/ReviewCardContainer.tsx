import { useState } from "react";
import { Box, ScrollArea, Space } from "components/core";
import { onScrollProps } from "components/core/ScrollArea/ScrollArea";
import LoadingCircle from "components/Loading/LoadingCircle";
import { globalValue } from "constants/globalValue";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppSelector } from "hooks/useReduxHooks";
import ReviewList from "./ReviewList";
import { InnerTopNavigation } from "components/TopNavigation";

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
  const { reviewDatas, isLoadingReview, fetchNextPage, hasNextPage } =
    useGetReviews();

  return (
    <InnerTopNavigation
      scrollRef={refs?.[0]}
      innerScrollRef={refs?.[1]}
      padding={20}
      bottomHeight={mine ? 85 : 35}
      direction={direction}
    >
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
    </InnerTopNavigation>
  );
};

export default ReviewCardContainer;
