import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import ProfileInfo from "./components/ProfileInfo";

import Spacing from "components/Spacing";
import Setting from "components/Button/IconButton/Setting";
import TasteBox from "./components/TasteBox";
import TopNavigation from "components/TopNavigation";
import { useEffect, useRef, useState } from "react";
import useDisplaySize from "hooks/useDisplaySize";
import { colors } from "constants/colors";
import RecommandSwiper from "./components/RecommandSwiper";
import { css, keyframes } from "@emotion/react";
import { globalValue } from "constants/globalValue";
import useAlert from "hooks/useAlert";
import NewButton from "./components/NewButton";
import Text from "components/Text";
import { Route } from "constants/Route";
import ReviewList from "./components/ReviewList";

const RecommandDatas = [
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
];

const ReviewDatas = [
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
];

export default function Mypage() {
  const router = useRouter();
  // console.log(router.query);
  const mypage = true;
  const scrollRef = useRef<any>(null);

  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { height } = useDisplaySize();

  const { openAlert } = useAlert();

  const clickRecommand = () => {
    if (ReviewDatas.length === 0) openAlert("write-review");
    else router.push(Route.RECOMMEND_BEST());
  };

  function onScroll() {
    setScrollHeight(
      (window.innerHeight - 280 - (392 - scrollRef.current?.scrollTop)) * 0.5
    );

    if (currentIndex === 0 && scrollRef.current?.scrollTop >= 332) {
      scrollRef.current!.scrollTop = 332;
      return;
    }

    if (scrollRef.current?.scrollTop >= 10) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }

    if (scrollRef.current?.scrollTop >= 392 - 59) {
      setTopFixed(true);
    } else {
      setTopFixed(false);
    }
  }

  useEffect(() => {
    setScrollHeight(
      (window.innerHeight - 280 - (392 - scrollRef.current?.scrollTop)) * 0.5
    );
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex]);

  return (
    <>
      <HomeWrapper ref={scrollRef}>
        <Spacing size={50} />
        <TitleWrapper>
          {mypage ? (
            <>
              <TitleInner visible={titleChange}>
                <Text typo="Headline5">{titleChange && "강남작가"}</Text>
                <Setting />
              </TitleInner>
            </>
          ) : (
            <BackTitle
              type="black-left-text"
              titleText={titleChange && "강남작가"}
            />
          )}
        </TitleWrapper>

        <MypageInner>
          <ProfileInfo mypage={mypage} />
          <Spacing size={30} />

          <TasteBox />
          <Spacing size={40} />
        </MypageInner>

        <TopNavigation
          type="mypage"
          scrollRef={scrollRef}
          scrollTop={392 - 50}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          topFixed={topFixed}
          titleList={["추천 베스트", "리뷰"]}
        >
          <TopNavigationInner height={height - 108}>
            {RecommandDatas.length !== 0 ? (
              <RecommandSwiper datas={RecommandDatas} />
            ) : (
              <NewButton
                onClick={clickRecommand}
                marginTop={scrollHeight}
                text="나만의 추천 음식점을 골라주세요"
                buttonText="추천 베스트 선택하기"
              />
            )}
          </TopNavigationInner>
          <TopNavigationInner>
            {ReviewDatas.length !== 0 ? (
              <ReviewList datas={ReviewDatas} />
            ) : (
              <NewButton
                onClick={() => {}}
                marginTop={scrollHeight}
                text="내가 방문한 음식점의 리뷰를 남겨보세요"
                buttonText="첫 리뷰 남기기"
              />
            )}
            <Spacing
              size={mypage ? globalValue.BOTTOM_NAVIGATION_HEIGHT + 6 : 6}
            />
          </TopNavigationInner>
        </TopNavigation>
      </HomeWrapper>

      {mypage ? <BottomNavigation /> : null}
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

const HomeWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const MypageInner = styled.div`
  padding: 0 20px;
`;

const TitleInner = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  left: 0;
`;

const TopNavigationInner = styled.div<{ height?: number }>`
  height: ${({ height }) => height}px;
  padding: 0 20px;
`;
