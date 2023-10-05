/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { ScrollArea, Box, Flex, Text, Space, Divider } from "@mantine/core";
import { motion } from "framer-motion";

import useDisplaySize from "hooks/useDisplaySize";
import useGetProfile from "hooks/queries/user/useGetProfile";
import useGetRecommendReviews from "hooks/queries/mypage/useGetRecommendReviews";
import useGetReviews from "hooks/queries/user/useGetReviews";
import { useAppDispatch } from "hooks/useReduxHooks";
import { editDisplaySize } from "reducer/slices/global/globalSlice";

import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import { Route } from "constants/Route";

import BottomNavigation from "components/BottomNavigation";
import BackTitle from "components/Title/BackTitle";
import Spacing from "components/Spacing";
import Setting from "components/Button/IconButton/Setting";

import TasteBox from "./components/TasteBox";
import ProfileInfo from "./components/ProfileInfo";
import RecommandSwiper from "./components/RecommandSwiper";
import ReviewList from "./components/ReviewList";
import NewButton from "./components/NewButton";
import LoadingCircle from "components/Loading/LoadingCircle";
import Title from "components/Title";
import Dots from "components/Button/IconButton/Dots";
import { typography } from "constants/typography";
import BackArrow from "components/Button/IconButton/BackArrow";
import RecommendReviewCardContainer from "./components/RecommendReviewCardContainer";
import ReviewCardContainer from "./components/ReviewCardContainer";

import TopNavigation from "components/TopNavigation/TopNavigation";

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

  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mine, setMine] = useState<any>(null);

  const { profileData, isLoadingProfile } = useGetProfile();
  const { recommendReviewDatas, isLoadingRecommendReview } =
    useGetRecommendReviews();

  const clickRecommand = () => {
    if (recommendReviewDatas?.length === 0) {
      localStorage.setItem("state", "postRecommendReview");
    } else {
      localStorage.setItem("state", "updatetRecommendReview");
    }
    router.push(Route.RECOMMEND_BEST());
  };

  useEffect(() => {
    const query = router.query.id;
    setMine(query ? profileData?.isEqualLoginMember : true);
    // setScrollHeight(scrollRef.current?.scrollTop);
    // scrollRef.current?.addEventListener("scroll", onScroll);
    // return () => {
    //   scrollRef.current?.removeEventListener("scroll", onScroll);
    // };
  }, [currentIndex, profileData, recommendReviewDatas]);

  useEffect(() => {
    if (profileData && recommendReviewDatas) {
      setCurrentIndex(
        profileData.isEqualLoginMember || recommendReviewDatas?.length !== 0
          ? 0
          : 1
      );
    }
  }, [profileData, recommendReviewDatas]);

  const scrollRef1 = useRef<any>(null);
  const [scroll1, setScroll1] = useState(0);
  const scrollRef2 = useRef<any>(null);
  const [scroll2, setScroll2] = useState(0);

  const [touch, setTouch] = useState(false);
  const [startY, setStartY] = useState(0);
  const [direction, setDirection] = useState("none");
  const handleTouchStart = (e: any) => {
    setStartY(e?.changedTouches[0].clientY);
  };
  const handleTouchMove = (e: any) => {
    const newMoveY = e?.changedTouches[0].clientY;
    if (newMoveY - startY < 0) setDirection("down");
    else setDirection("up");
  };

  const handleScroll = (position: { x: number; y: number }) => {
    if (
      direction === "up" &&
      currentIndex === 0 &&
      scrollRef1?.current?.scrollTop <= 0
    ) {
      // scrollRef2.current!.scrollTo({ top: 0 });
      scrollRef1.current!.style.setProperty("overflow", `hidden`);
      scrollRef2.current!.style.setProperty("overflow", `hidden`);
    } else if (
      direction === "up" &&
      currentIndex === 1 &&
      scrollRef2?.current?.scrollTop <= 0
    ) {
      // scrollRef1.current!.scrollTo({ top: 0 });
      scrollRef1.current!.style.setProperty("overflow", `hidden`);
      scrollRef2.current!.style.setProperty("overflow", `hidden`);
    }
    //아래로 내리는 경우
    else if (direction === "down") {
      if (position.y < 332) {
        scrollRef1.current!.style.setProperty("overflow", `hidden`);
        scrollRef2.current!.style.setProperty("overflow", `hidden`);
      } else {
        scrollRef1.current!.style.setProperty("overflow", `auto`);
        scrollRef2.current!.style.setProperty("overflow", `auto`);

        if (currentIndex === 0) {
          scrollRef1.current!.scrollTo({
            top: position.y - 332,
          });
        } else {
          scrollRef2.current!.scrollTo({
            top: position.y - 332,
          });
        }
      }
    }

    if (position.y > 10) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }
  };

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
          <ScrollArea
            viewportRef={scrollRef}
            type="never"
            h={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
            pos="absolute"
            top={50}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onScrollPositionChange={handleScroll}
          >
            {/* 332 */}
            <Box
              pl={20}
              pr={20}
              bg={colors["N0"]}
              pos="sticky"
              top={-332}
              style={{ width: width }}
            >
              <ProfileInfo mine={mine} profile={profileData && profileData} />
              <Space h={22} />

              <TasteBox tasteStatistics={profileData?.tasteStatistics} />
              <Space h={40} />
            </Box>

            <TopNavigation
              height={34}
              padding={20}
              index={{
                currentIndex,
                setCurrentIndex,
              }}
              touch={{ touch, setTouch }}
              keywordDatas={["추천 베스트", "리뷰"]}
            >
              <RecommendReviewCardContainer
                scrollRef={scrollRef}
                scrollRef1={scrollRef1}
                scrollRef2={scrollRef2}
                scroll1={scroll1}
                setScroll1={setScroll1}
                setTitleChange={setTitleChange}
                mine={mine}
                scrollHeight={scrollHeight}
                direction={direction}
                recommendReviewDatas={recommendReviewDatas}
                touch={{ touch, setTouch }}
              />
              <ReviewCardContainer
                mine={mine}
                scrollRef={scrollRef}
                scrollRef1={scrollRef1}
                scrollRef2={scrollRef2}
                scroll2={scroll2}
                setScroll2={setScroll2}
                scrollHeight={scrollHeight}
                direction={direction}
              />
            </TopNavigation>
            <Box h={1000} />
            {/* <Flex
              // ref={keywordsScrollRef}
              h={34}
              pl={20}
              pr={20}
              gap={20}
              pos="sticky"
              top={0}
              bg={colors["N0"]}
              style={{ whiteSpace: "nowrap", overflowX: "auto" }}
            >
              {["추천 맛집", "리뷰"]?.map((title: string, idx: number) => {
                return (
                  <Flex
                    key={idx}
                    ref={(ref: any) => {
                      // if (index.wrapperIndex === idx) setKeywordTextRef(ref);
                    }}
                    h={34}
                    direction="column"
                    justify="space-between"
                    // onClick={(ref: any) => handleClickKeyword(ref, idx)}
                  >
                    <Text
                      c={colors["Orange600"]}
                      style={typography["Headline3"]}
                    >
                      {title}
                    </Text>
                    {wrapperIndex === idx && (
                      <Divider size={2} color={colors["Orange600"]} />
                    )}
                  </Flex>
                );
              })}
            </Flex>
            <Divider ml={20} mr={20} color={colors["N20"]} /> */}
            {/* <TopNavigation
              height={height - 85 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
              index={{ wrapperIndex, setWrapperIndex }}
              touch={{ touch, setTouch }}
              keywordDatas={["추천 베스트", "리뷰"]}
            >
              <RecommendReviewCardContainer
                scrollRef={scrollRef}
                scrollRef1={scrollRef1}
                scrollRef2={scrollRef2}
                scroll1={scroll1}
                setScroll1={setScroll1}
                setTitleChange={setTitleChange}
                mine={mine}
                scrollHeight={scrollHeight}
              />
              <ReviewCardContainer
                mine={mine}
                scrollRef1={scrollRef1}
                scrollRef2={scrollRef2}
                scroll2={scroll2}
                setScroll2={setScroll2}
                scrollHeight={scrollHeight}
              />
            </TopNavigation> */}
          </ScrollArea>
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

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible ? 0 : 1};
    background-color: ${visible ? `transparent` : `${colors.N0}`};
  }
  to {
    opacity: ${visible ? 1 : 0};
    background-color: ${visible ? `${colors.N0}` : `transparent`};
  }
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 20px;

  position: fixed;
  top: 0;

  background-color: ${colors.N0};
  // background: linear-gradient(${colors.N0} 50%, transparent);
  z-index: 997;
`;

const TitleInner = styled.div<{ visible: boolean }>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: 50px;
  padding: 0 20px;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  left: 0;

  // animation: ${({ visible }) => fade(visible)} 220ms forwards;
`;

const TopNavigationInner = styled.div<{ height?: any }>`
  height: ${({ height }) => height};
  padding: 0 20px;
`;
