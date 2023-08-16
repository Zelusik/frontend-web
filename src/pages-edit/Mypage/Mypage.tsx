import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import useAlert from "hooks/useAlert";
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
import useGetMyReviews from "hooks/queries/user/useGetMyReviews";

const RecommandDatas = [
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
];

const ReviewDatas = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

// 392 + 35 = 427

export default function Mypage() {
  const router = useRouter();
  const [mine, setMine] = useState<boolean>(true);
  const { width, height } = useDisplaySize();
  const { data: myreview } = useGetMyReviews({ page: 0 });

  const scrollRef = useRef<any>(null);

  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { openAlert } = useAlert();

  const clickRecommand = () => {
    if (myreview && myreview.contents.length === 0) openAlert("write-review");
    else router.push(Route.RECOMMEND_BEST());
  };

  function onScroll() {
    const scrollTop = 10 + 88 + 22 + 182 + 40;
    setScrollHeight(scrollRef.current?.scrollTop);

    if (
      (currentIndex === 0 ||
        (currentIndex === 1 && myreview && myreview.contents.length === 0)) &&
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
    setMine(query ? query === "1" : true);
    setScrollHeight(scrollRef.current?.scrollTop);
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex]);

  return (
    <>
      <TitleWrapper>
        {mine ? (
          <TitleInner visible={titleChange}>
            <Text typo="Headline5">{titleChange ? "강남작가" : null}</Text>
            <Setting />
          </TitleInner>
        ) : (
          <BackTitle
            type={titleChange ? "black-left-text" : "black-dots"}
            title={titleChange ? "강남작가" : null}
          />
        )}
      </TitleWrapper>

      <Wrapper
        ref={scrollRef}
        height={mine ? height - globalValue.BOTTOM_NAVIGATION_HEIGHT : height}
      >
        <Spacing size={60} />

        <div style={{ position: "relative" }}>
          <div style={{ padding: "0 20px" }}>
            <ProfileInfo mine={mine} />
            <Spacing size={22} />

            <TasteBox />
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
                height -
                (mine ? globalValue.BOTTOM_NAVIGATION_HEIGHT : 0) -
                104.5 +
                "px"
              }
            >
              <Spacing
                size={
                  RecommandDatas.length === 0
                    ? (height - 288 - (390 - scrollHeight)) * 0.5
                    : height - (550 - scrollHeight) > ((width - 60) * 9) / 8 + 108
                    ? (height -
                        (550 - scrollHeight) -
                        (((width - 60) * 9) / 8 + 108)) *
                      0.5
                    : 0
                }
              />
              {RecommandDatas.length === 0 ? (
                <NewButton
                  onClick={clickRecommand}
                  marginTop={0}
                  text="나만의 추천 음식점을 골라주세요"
                  buttonText="추천 베스트 선택하기"
                />
              ) : (
                <RecommandSwiper
                  datas={RecommandDatas}
                  mine={mine}
                  onClick={clickRecommand}
                />
              )}
            </TopNavigationInner>
            <TopNavigationInner
              height={
                (myreview && myreview.contents.length === 0) || currentIndex === 0
                  ? height -
                    (mine ? globalValue.BOTTOM_NAVIGATION_HEIGHT : 0) -
                    104.5 +
                    "px"
                  : "auto"
              }
            >
              <Spacing
                size={
                  myreview && myreview.contents.length === 0
                    ? (height - 288 - (390 - scrollHeight)) * 0.5
                    : 0
                }
              />
              {myreview && myreview.contents.length === 0 ? (
                <NewButton
                  onClick={() => {}}
                  marginTop={0}
                  text="내가 방문한 음식점의 리뷰를 남겨보세요"
                  buttonText="첫 리뷰 남기기"
                />
              ) : (
                <ReviewList datas={myreview && myreview.contents} />
              )}
              <Spacing size={30} />
            </TopNavigationInner>
          </TopNavigation>
        </div>
      </Wrapper>

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
  justify-contents: space-between;
  align-items: center;

  position: absolute;
  left: 0;

  // animation: ${({ visible }) => fade(visible)} 220ms forwards;
`;

const TopNavigationInner = styled.div<{ height?: any }>`
  height: ${({ height }) => height};
  padding: 0 20px;
`;
