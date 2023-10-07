import { Box, ScrollArea, Space } from "components/core";
import LoadingCircle from "components/Loading/LoadingCircle";
import { globalValue } from "constants/globalValue";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppSelector } from "hooks/useReduxHooks";
import ReviewList from "./ReviewList";

const ReviewCardContainer = ({ refs, mine, direction }: any) => {
  const { display } = useAppSelector((state) => state.global);
  const { reviewDatas, isLoadingReview, fetchNextPage, hasNextPage } =
    useGetReviews();

  return (
    <ScrollArea
      viewportRef={refs?.scrollRef2}
      ph={20}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      style={{ overflow: "hidden" }}
      onTouchMove={() => {
        if (
          direction === "up" &&
          refs?.scrollRef2?.current?.scrollTop >= 0 &&
          refs?.scrollRef?.current?.scrollTop > 332
        ) {
          refs?.scrollRef.current!.scrollTo({ top: 332 });
        }
      }}
      // onScroll={(e: any) => {
      //   // e.target.scrollTop
      // }}
    >
      <ReviewList
        reviewDatas={reviewDatas}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
      {hasNextPage && (
        <>
          <Space h={24} />
          <LoadingCircle height={30} />
        </>
      )}
    </ScrollArea>
  );
};

export default ReviewCardContainer;
