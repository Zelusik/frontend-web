import { ScrollArea, Box, Flex, Text, Space } from "@mantine/core";
import { globalValue } from "constants/globalValue";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppSelector } from "hooks/useReduxHooks";

const ReviewCardContainer = ({
  scrollRef,
  scrollRef1,
  scrollRef2,
  scroll2,
  setScroll2,
  mine,
  scrollHeight,
  profile,
}: any) => {
  const { display } = useAppSelector((state) => state.global);
  const { reviewDatas, isLoadingReview, fetchNextPage, hasNextPage } =
    useGetReviews();

  return (
    <ScrollArea
      type="never"
      viewportRef={scrollRef2}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      onScrollPositionChange={(position: { x: number; y: number }) => {
        // setTest(position.y);
        // console.log(position.y - scroll1);
        if (scroll2 < 332) {
          scrollRef1.current!.scrollTo({ top: position.y });
          setScroll2(position.y);
        } else if (position.y - scroll2 < 0) {
          setScroll2(position.y);
        }
      }}
    >
      <Box h={367} />
      {[
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ].map((data: any, idx: any) => {
        return (
          <Box key={idx} h={100}>
            Hi{idx}
          </Box>
        );
      })}
    </ScrollArea>
  );
};

export default ReviewCardContainer;
