import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";

import Hashtags from "components/Hashtags";
import TopNavigation from "components/TopNavigation";
import Info from "components/Share/Info";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import BackTitle from "components/Title/BackTitle";
import StoreTitle from "components/Title/StoreTitle";

import ReviewCard from "./components/ReviewCard";
import ImageBox from "./components/ImageBox";
import { globalValue } from "constants/globalValue";

const images = [
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "",
  // "",
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
  "",
];

export default function ReviewDetail() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);

  const imageRef = useRef<any>(null);
  const { width, height } = useDisplaySize();

  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function onScroll() {
    const scrollTop = (window.innerWidth * 281) / 360 + 20 + 49 + 16 + 40 - 10;

    if (
      images.length === 0 &&
      scrollRef.current?.scrollTop >= 165 &&
      currentIndex === 1
    ) {
      scrollRef.current!.scrollTop = 165;
    } else if (
      scrollRef.current?.scrollTop >= scrollTop &&
      currentIndex === 1
    ) {
      scrollRef.current!.scrollTop = scrollTop;
      return;
    }

    if (images.length === 0 && scrollRef.current?.scrollTop >= 25) {
      setTitleChange(true);
    } else if (
      scrollRef.current?.scrollTop >=
      imageRef.current?.clientHeight - 20
    ) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }

    if (images.length === 0 && scrollRef.current?.scrollTop >= 165) {
      setTopFixed(true);
    } else if (scrollRef.current?.scrollTop >= scrollTop - 1) {
      setTopFixed(true);
    } else {
      setTopFixed(false);
    }
  }

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex]);

  return (
    <>
      <ImageBox ref={imageRef} images={images} />
      <TitleWrapper visible={titleChange}>
        <BackTitle
          type={
            titleChange
              ? "black-left-text"
              : images.length > 0
              ? "white-dots-store"
              : "black-left-text"
          }
          title={titleChange ? "소이연남" : undefined}
        />
      </TitleWrapper>

      <Wrapper ref={scrollRef} height={height}>
        <Spacing size={images.length > 0 ? (width * 281) / 360 : 50} />

        <HomeDetailInner>
          <Spacing size={20} />
          <StoreTitle
            type="detail"
            title="소이연남"
            subTitle="음식 카테고리 지역"
          />

          <Spacing size={16} />
          <Hashtags
            hashtags={[
              "단체모임에 딱",
              "데이트에 최고",
              "웨이팅 있음",
              "웨이팅 있음",
            ]}
          />
          <Spacing size={40} />

          <TopNavigation
            type="review-detail"
            scrollRef={scrollRef}
            scrollTop={
              images.length === 0
                ? 165
                : (width * 281) / 360 + 20 + 49 + 16 + 40
            }
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            topFixed={topFixed}
            titleList={["리뷰", "매장정보"]}
          >
            <div
              style={{
                height:
                  currentIndex === 0
                    ? "auto"
                    : height - globalValue.BOTTOM_NAVIGATION_HEIGHT - 29.8,
              }}
            >
              {ReviewDatas.map((data: any, idx: number) => {
                return <ReviewCard key={idx} />;
              })}
            </div>
            <StoreInfo
              height={
                height - globalValue.BOTTOM_NAVIGATION_HEIGHT - 29.8 + "px"
              }
            >
              {["", ""].map((data: any, idx: number) => {
                return <Info key={idx} />;
              })}
            </StoreInfo>
          </TopNavigation>
        </HomeDetailInner>
      </Wrapper>
    </>
  );
}

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible && 0};
    background-color: ${visible ? `transparent` : `${colors.N0}`};
  }
  to {
    opacity: ${visible && 1};
    background-color: ${visible ? `${colors.N0}` : `transparent`};
  }
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const HomeDetailInner = styled.div`
  position: relative;
  background-color: ${colors.N0};
`;

const TitleWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: 0 20px;

  position: fixed;
  top: 0;
  z-index: 900;

  background-color: ${({ visible }) =>
    visible ? `${colors.N0}` : `transparents`};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;

const StoreInfo = styled.div<{ height: any }>`
  height: ${({ height }) => height};
  padding: 0 20px;
`;
