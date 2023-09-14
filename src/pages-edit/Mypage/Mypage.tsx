/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";

import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import { Route } from "constants/Route";

import Text from "components/Text";
import TopNavigation from "components/TopNavigation";
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
import useGetMembersProfile from "hooks/queries/user/useGetMembersProfile";
import useGetRecommendReviews from "hooks/queries/recommend-reviews/useGetRecommendReviews";
import useGetMembersReviews from "hooks/queries/user/useGetMembersReviews";

// 392 + 35 = 427

export default function Mypage() {
  const router = useRouter();
  const { width, height } = useDisplaySize();
  const { data: membersProfile, isLoading: isMembersProfileLoading } =
    useGetMembersProfile();
  const { data: recommendedReviews, isLoading: isRecommendLoading } =
    useGetRecommendReviews();
  const {
    data: membersReviews,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetMembersReviews();

  const scrollRef = useRef<any>(null);

  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mine, setMine] = useState<any>(null);

  const clickRecommand = () => {
    if (recommendedReviews?.length === 0) {
      localStorage.setItem("state", "postRecommendReview");
    } else {
      localStorage.setItem("state", "updatetRecommendReview");
    }
    router.push(Route.RECOMMEND_BEST());
  };

  function onScroll() {
    const scrollTop = 10 + 88 + 22 + 182 + 40;
    setScrollHeight(scrollRef.current?.scrollTop);

    if (
      (currentIndex === 0 ||
        (currentIndex === 1 &&
          membersReviews &&
          membersReviews[0].contents?.length === 0)) &&
      scrollRef.current?.scrollTop >= scrollTop
    ) {
      scrollRef.current!.scrollTop = scrollTop;
      return;
    }

    if (scrollRef.current?.scrollTop >= 10) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }

    if (scrollRef.current?.scrollTop > scrollTop - 1) {
      setTopFixed(true);
    } else {
      setTopFixed(false);
    }
  }

  useEffect(() => {
    const query = router.query.id;
    setMine(query ? membersProfile?.isEqualLoginMember : true);
    setScrollHeight(scrollRef.current?.scrollTop);
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex, membersProfile, recommendedReviews, membersReviews]);

  useEffect(() => {
    if (membersProfile && recommendedReviews) {
      setCurrentIndex(
        membersProfile.isEqualLoginMember || recommendedReviews?.length !== 0
          ? 0
          : 1
      );
    }
  }, [membersProfile, recommendedReviews]);

  return (
    <>
      {isLoading || isMembersProfileLoading || isRecommendLoading ? (
        <LoadingCircle />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TitleWrapper>
            {mine ? (
              <TitleInner visible={titleChange}>
                {router.query.id ? (
                  <BackTitle
                    type="black-left-text"
                    title={titleChange ? membersProfile.nickname : null}
                  />
                ) : (
                  <Text typo="Headline5">
                    {titleChange ? membersProfile.nickname : null}
                  </Text>
                )}
                <Setting />
              </TitleInner>
            ) : (
              <BackTitle
                type={titleChange ? "black-left-text" : "black-dots"}
                title={titleChange ? membersProfile.nickname : null}
              />
            )}
          </TitleWrapper>

          <Wrapper
            ref={scrollRef}
            height={
              mine ? height - globalValue.BOTTOM_NAVIGATION_HEIGHT : height
            }
          >
            <Spacing size={60} />

            <div style={{ position: "relative" }}>
              <div style={{ padding: "0 20px" }}>
                <ProfileInfo
                  mine={mine}
                  profile={membersProfile && membersProfile}
                />
                <Spacing size={22} />

                <TasteBox tasteStatistics={membersProfile?.tasteStatistics} />
                <Spacing size={40} />
              </div>

              <TopNavigation
                type="mypage"
                scrollRef={scrollRef}
                scrollTop={342}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                topFixed={topFixed}
                titleList={["추천 베스트", "리뷰"]}
              >
                <TopNavigationInner
                  height={
                    recommendedReviews?.length === 0 &&
                    mine &&
                    membersReviews?.[0].numOfElements >= 3
                      ? 50 + "px"
                      : height -
                        (mine ? globalValue.BOTTOM_NAVIGATION_HEIGHT : 0) -
                        104.5 +
                        "px"
                  }
                >
                  {/* <Spacing
                size={
                  recommendedReviews?.length === 0
                    ? (height - 288 - (390 - scrollHeight)) * 0.5
                    : height - (550 - scrollHeight) >
                      ((width - 60) * 9) / 8 + 108
                    ? (height -
                        (550 - scrollHeight) -
                        (((width - 60) * 9) / 8 + 108)) *
                      0.5
                    : 0
                }
              /> */}
                  {mine &&
                  recommendedReviews?.length === 0 &&
                  membersReviews?.[0].numOfElements >= 3 ? (
                    <NewButton
                      onClick={clickRecommand}
                      marginTop={0}
                      text="나만의 추천 음식점을 골라주세요"
                      buttonText="추천 베스트 선택하기"
                    />
                  ) : mine && membersReviews?.[0].numOfElements < 3 ? (
                    <NewButton
                      onClick={() => {
                        router.push(Route.REVIEW());
                      }}
                      marginTop={0}
                      text={
                        "리뷰가 3개 이상일 때 \n 베스트 음식점 선택이 가능합니다"
                      }
                      buttonText="리뷰 작성하러 가기"
                    />
                  ) : (
                    <RecommandSwiper
                      datas={recommendedReviews && recommendedReviews}
                      mine={mine}
                      onClick={clickRecommand}
                    />
                  )}
                </TopNavigationInner>
                <TopNavigationInner
                  height={
                    membersReviews?.[0].contents?.length === 0
                      ? height -
                        (mine ? globalValue.BOTTOM_NAVIGATION_HEIGHT : 0) -
                        104.5 +
                        "px"
                      : "auto"
                  }
                >
                  <Spacing
                    size={
                      membersReviews?.[0].contents?.length === 0
                        ? (height - 288 - (390 - scrollHeight)) * 0.5
                        : 0
                    }
                  />
                  {membersReviews?.[0].contents?.length === 0 && mine ? (
                    <NewButton
                      onClick={() => {
                        router.push(Route.REVIEW());
                      }}
                      marginTop={0}
                      text="내가 방문한 음식점의 리뷰를 남겨보세요"
                      buttonText="첫 리뷰 남기기"
                    />
                  ) : (
                    <>
                      <ReviewList
                        membersReviews={membersReviews && membersReviews}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                      />
                      {hasNextPage ? (
                        <>
                          <Spacing size={24} />
                          <LoadingCircle size={30} />
                        </>
                      ) : null}
                    </>
                  )}
                  <Spacing size={30} />
                </TopNavigationInner>
              </TopNavigation>
            </div>
          </Wrapper>
        </motion.div>
      )}
      {mine ? <BottomNavigation /> : null}
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
