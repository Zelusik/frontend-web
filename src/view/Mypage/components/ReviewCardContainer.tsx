import { Box, Flex, Text, Space } from "@mantine/core";
import LoadingCircle from "components/Loading/LoadingCircle";
import { globalValue } from "constants/globalValue";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppSelector } from "hooks/useReduxHooks";
import ReviewList from "./ReviewList";

const ReviewCardContainer = ({
  scrollRef,
  scrollRef1,
  scrollRef2,
  scroll2,
  setScroll2,
  mine,
  scrollHeight,
  profile,
  direction,
}: any) => {
  const { display } = useAppSelector((state) => state.global);
  const { reviewDatas, isLoadingReview, fetchNextPage, hasNextPage } =
    useGetReviews();

  return (
    <Box
      ref={scrollRef2}
      pl={20}
      pr={20}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      style={{ overflow: "hidden" }}
      onTouchMove={() => {
        if (
          direction === "up" &&
          scrollRef2?.current?.scrollTop >= 0 &&
          scrollRef?.current?.scrollTop > 332
        ) {
          scrollRef.current!.scrollTo({ top: 332 });
        }
      }}
      // onScroll={(e: any) => {
      //   e.target.scrollTop
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
    </Box>
  );
};

export default ReviewCardContainer;
