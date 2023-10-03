import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ScrollArea, Box, Flex, Text, Space } from "@mantine/core";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";

const RecommendReviewCardContainer = ({
  scrollRef,
  scrollRef1,
  scrollRef2,
  scroll1,
  setScroll1,
  mine,
  scrollHeight,
  profile,
}: any) => {
  const { display } = useAppSelector((state) => state.global);
  const [test, setTest] = useState(0);

  //   useEffect(() => {
  //     // console.log(scrollRef);
  //     // console.log(test + " " + scrollHeight);
  //     if (scrollHeight < 332) {
  //       scrollRef.current?.style.setProperty("overflow-y", "hidden");
  //       //   scrollRef.current!.scrollTo({ top: 0 });
  //     } else {
  //       scrollRef.current?.style.setProperty("overflow-y", "auto");
  //     }
  //   }, [scrollHeight, test]);
  const [scroll, setScroll] = useState(scrollHeight);
  const [start, setStart] = useState(0);

  const { recommendReviewDatas, isLoadingRecommendReview } =
    useGetRecommendReviews();

  return (
    <ScrollArea
      type="never"
      viewportRef={scrollRef1}
      h={
        display.height - (mine ? 85 : 35) - globalValue.BOTTOM_NAVIGATION_HEIGHT
      }
      //   onScrollStart={() => {
      //     console.log("scrollStart");
      //   }}
      //   onTouchStart={(e: any) => {
      //     setStart(e?.changedTouches[0].clientY);
      //     setScroll(scrollHeight);
      //   }}
      //   onTouchMove={(e: any) => {
      //     const newMoveY = e?.changedTouches[0].clientY;
      //     // if (scrollHeight < 332) {
      //     //   console.log(scroll + (start - newMoveY));
      //     // scrollRef.current!.scrollTo({
      //     //   top: scroll + (start - newMoveY),
      //     // });
      //     //   scrollRef1.current!.scrollTo({ top: 0 });
      //     // }
      //   }}
      onScrollPositionChange={(position: { x: number; y: number }) => {
        // setTest(position.y);
        // console.log(position.y - scroll1);
        if (scroll1 < 332) {
          scrollRef2.current!.scrollTo({ top: position.y });
          setScroll1(position.y);
        } else if (position.y - scroll1 < 0) {
          setScroll1(position.y);
        }
      }}
    >
      <Box h={367} />
      {["", "", "", "", "", "", "", "", "", ""]?.map((data: any, idx: any) => {
        return (
          <Box key={idx} h={100} bg={"blue"}>
            {/* {data?.review?.images?.[0]?.imageUrl} */}
            Hi{idx}
          </Box>
        );
      })}
    </ScrollArea>
  );
};

export default RecommendReviewCardContainer;
