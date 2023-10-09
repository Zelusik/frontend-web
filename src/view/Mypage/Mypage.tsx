/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import useDisplaySize from "hooks/useDisplaySize";
import useGetProfile from "hooks/queries/user/useGetProfile";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import { useAppDispatch } from "hooks/useReduxHooks";
import { editDisplaySize } from "reducer/slices/global/globalSlice";

import { globalValue } from "constants/globalValue";

import { Box, Space, ScrollArea } from "components/core";
import BottomNavigation from "components/BottomNavigation";
import Setting from "components/Button/IconButton/Setting";
import LoadingCircle from "components/Loading/LoadingCircle";
import Title from "components/Title";
import Dots from "components/Button/IconButton/Dots";
import BackArrow from "components/Button/IconButton/BackArrow";

import TasteBox from "./components/TasteBox";
import ProfileInfo from "./components/ProfileInfo";
import RecommendReviewCardContainer from "./components/RecommendReviewCardContainer";
import ReviewCardContainer from "./components/ReviewCardContainer";
import { ScrollTopNavigation, TopNavigation } from "components/TopNavigation";

// 392 + 35 = 427

export default function Mypage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { width, height } = useDisplaySize();
  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  const scrollRef = useRef<any>(null);
  const scrollRef1 = useRef<any>(null);
  const scrollRef2 = useRef<any>(null);

  const [mine, setMine] = useState<any>(null);
  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [touch, setTouch] = useState(false);
  const [startY, setStartY] = useState(0);
  const [direction, setDirection] = useState("none");

  const [startY1, setStartY1] = useState(0);
  const [startY2, setStartY2] = useState(0);
  const handleTouchStart = (e: any) => {
    setStartY(e?.changedTouches[0].clientY);
    setStartY1(scrollRef1?.current?.scrollTop);
    setStartY2(scrollRef2?.current?.scrollTop);
  };
  const handleTouchMove = (e: any) => {
    const newMoveY = e?.changedTouches?.[0]?.clientY;
    if (newMoveY - startY < 0) setDirection("down");
    else setDirection("up");
  };

  const handleScroll = ({ scrollY }: { scrollX: number; scrollY: number }) => {
    if (scrollY < 332) {
      scrollRef1.current!.style.setProperty("overflow-y", `hidden`);
      scrollRef2.current!.style.setProperty("overflow-y", `hidden`);
    } else if (scrollY >= 332) {
      scrollRef1.current!.style.setProperty("overflow-y", `scroll`);
      scrollRef2.current!.style.setProperty("overflow-y", `scroll`);

      if (direction === "down") {
        if (currentIndex === 0 && startY1 === 0) {
          scrollRef1.current!.scrollTo({
            top: scrollY - 332,
          });
        } else if (startY2 === 0) {
          scrollRef2.current!.scrollTo({
            top: scrollY - 332,
          });
        }
      }
    }

    if (scrollY > 10) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }
  };

  const { profileData, isLoadingProfile } = useGetProfile();
  const { recommendReviewDatas } = useGetRecommendReviews();

  useEffect(() => {
    const query = router.query.id;
    setMine(query ? profileData?.isEqualLoginMember : true);
  }, [currentIndex, profileData, recommendReviewDatas]);

  useEffect(() => {
    if (profileData && recommendReviewDatas) {
      setCurrentIndex(
        profileData?.isEqualLoginMember || recommendReviewDatas?.length !== 0
          ? 0
          : 1
      );
    }
  }, [profileData, recommendReviewDatas]);

  return (
    <>
      {isLoadingProfile ? (
        <LoadingCircle
          height={mine ? height - globalValue.BOTTOM_NAVIGATION_HEIGHT : height}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ScrollTopNavigation>
            {/* 332 */}
            <Box w={width} ph={20} bg="N0">
              <ProfileInfo mine={mine} profileData={profileData} />
              <Space h={22} />
              <TasteBox profileData={profileData?.tasteStatistics} />
              <Space h={40} />
            </Box>

            <TopNavigation
              height={34}
              padding={20}
              gap={24}
              color="N100"
              index={{
                currentIndex,
                setCurrentIndex,
              }}
              touch={{ touch, setTouch }}
              keywordDatas={["추천 베스트", "리뷰"]}
            >
              <RecommendReviewCardContainer
                refs={{ scrollRef, scrollRef1, scrollRef2 }}
                mine={mine}
                direction={direction}
                touch={{ touch, setTouch }}
              />
              <ReviewCardContainer
                refs={{ scrollRef, scrollRef1, scrollRef2 }}
                mine={mine}
                direction={direction}
              />
            </TopNavigation>
            <Box h={1000} />
          </ScrollTopNavigation>
        </motion.div>
      )}
      <Title
        height={50}
        padding={20}
        renderLeft={
          !mine && (
            <>
              <BackArrow size={24} color="N100" />
              <Space w={6} />
            </>
          )
        }
        textLeft={titleChange && profileData?.nickname}
        renderRight={
          mine ? <Setting size={24} /> : <Dots type="share-report" size={20} />
        }
      />
      {mine && <BottomNavigation />}
    </>
  );
}
