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
import ReviewStore from "./components/ReveiwStore";
import { typography } from "constants/typography";
import { css, keyframes } from "@emotion/react";
import { globalValue } from "constants/globalValue";
import RecommandButton from "./components/RecommandButton";
import useAlert from "hooks/useAlert";

const RecommandDatas = [
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
];

const ReviewDatas = [
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
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
                <Name visible={titleChange}>{titleChange && "강남작가"}</Name>
                <Setting />
              </TitleInner>
            </>
          ) : (
            <BackTitle type="secondary" titleText={titleChange && "강남작가"} />
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
          <NavigationWrapper height={height - 108}>
            {RecommandDatas.length !== 0 ? (
              <RecommandSwiper datas={RecommandDatas} />
            ) : (
              <ButtonWrapper
                marginTop={scrollHeight}
                onClick={() => openAlert("write-review")}
              >
                <ButtonTitle>나만의 추천 음식점을 골라주세요</ButtonTitle>
                <RecommandButton text="선택" />
              </ButtonWrapper>
            )}
          </NavigationWrapper>
          <NavigationWrapper>
            {ReviewDatas.length !== 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ReviewDatas.map((data: any, idx: number) => {
                  return <ReviewStore key={idx} />;
                })}
              </div>
            ) : (
              <ButtonWrapper marginTop={scrollHeight}>
                <ButtonTitle>나만의 추천 음식점을 골라주세요</ButtonTitle>
                <RecommandButton text="선택" />
              </ButtonWrapper>
            )}
            <Spacing
              size={mypage ? globalValue.BOTTOM_NAVIGATION_HEIGHT + 6 : 6}
            />
          </NavigationWrapper>
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

  display: flex;
  justify-content: space-between;

  position: absolute;
  left: 0;
`;

const Name = styled.div<{ visible: boolean }>`
  margin: auto 0;
  ${css`
    ${typography.Headline5}
  `}

  background-color: ${({ visible }) =>
    visible ? `${colors.N0}` : `transparents`};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;

const NavigationWrapper = styled.div<{ height?: number }>`
  height: ${({ height }) => height}px;
  padding: 0 20px;
`;

const ButtonWrapper = styled.div<{ marginTop: number }>`
  padding-top: ${({ marginTop }) => marginTop}px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonTitle = styled.div`
  text-align: center;
  ${css`
    ${typography.Paragraph5}
  `}
  color: ${colors.N80};
`;
