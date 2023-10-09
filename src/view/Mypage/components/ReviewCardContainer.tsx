import { useState } from "react";
import { Box, ScrollArea, Space } from "components/core";
import { onScrollProps } from "components/core/ScrollArea/ScrollArea";
import LoadingCircle from "components/Loading/LoadingCircle";
import { globalValue } from "constants/globalValue";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppSelector } from "hooks/useReduxHooks";
import ReviewList from "./ReviewList";

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
  const { display } = useAppSelector((state) => state.global);
  const { reviewDatas, isLoadingReview, fetchNextPage, hasNextPage } =
    useGetReviews();

  return (
    <ScrollArea
      veiwportRef={refs?.scrollRef2}
      ph={20}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      style={{ overflow: "hidden" }}
      onTouchMove={() => {
        if (
          direction === "up" &&
          refs?.scrollRef?.current?.scrollTop >= 332 &&
          refs?.scrollRef2?.current?.scrollTop === 0
        ) {
          refs?.scrollRef.current!.scrollTo({ top: 332 });
        }
      }}
      onScroll={({ scrollY }: onScrollProps) => {
        // console.log(scrollY);
        // if (refs?.scrollRef?.current?.scrollTop < 332 && scrollY !== 0) {
        //   refs?.scrollRef2.current!.style.setProperty("overflow", `hidden`);
        //   if (direction === "down") {
        //     // refs?.scrollRef.current!.scrollTo({
        //     //   top: scrollY,
        //     // });
        //   }
        // }
      }}
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
    </ScrollArea>
  );
};

export default ReviewCardContainer;
