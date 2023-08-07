import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";

import Hashtags from "components/Hashtags";
import TopNavigation from "components/TopNavigation";
import Info from "components/Share/Info";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import BackTitle from "components/Title/BackTitle";
import StoreTitle from "components/Title/StoreTitle";

import ReivewBox from "./components/ReviewBox";
import ImageBox from "./components/ImageBox";

const images = [
  "https://i.ibb.co/0Z6FNN7/60pt.png",
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
  // "https://i.ibb.co/0Z6FNN7/60pt.png",
  // "",
  // "",
];

export default function StoreDetail() {
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
      scrollRef.current?.scrollTop > 165 &&
      currentIndex === 1
    ) {
      scrollRef.current!.scrollTop = 165;
    } else if (scrollRef.current?.scrollTop > scrollTop && currentIndex === 1) {
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
      <BackTitleWrapper visible={titleChange}>
        <BackTitle
          type={
            titleChange
              ? "black-left-text"
              : images.length > 0
              ? "white"
              : "black-left-text"
          }
          titleText={titleChange && "소이연남"}
        />
      </BackTitleWrapper>

      <StoreDetailWrapper ref={scrollRef}>
        <Spacing size={images.length > 0 ? (width * 281) / 360 : 50} />

        <HomeDetailInner>
          <Spacing size={20} />
          <div style={{ padding: "0 20px" }}>
            <StoreTitle
              type="primary"
              title="소이연남"
              subTitle="음식 카테고리 지역"
            />
          </div>

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
            type="store-detail"
            scrollRef={scrollRef}
            scrollTop={(width * 281) / 360 + 20 + 49 + 16 + 40}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            topFixed={topFixed}
            titleList={["리뷰", "매장정보"]}
          >
            <>
              {["", "", "", "", ""].map((data: any, idx: number) => {
                return <ReivewBox key={idx} />;
              })}
            </>
            <StoreInfo height={height} scrollTop={20 + 49 + 16}>
              {["", ""].map((data: any, idx: number) => {
                return <Info key={idx} />;
              })}
            </StoreInfo>
          </TopNavigation>
        </HomeDetailInner>
      </StoreDetailWrapper>
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

const StoreDetailWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const HomeDetailInner = styled.div`
  position: relative;
  background-color: ${colors.N0};
`;

const BackTitleWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: 0 20px;

  position: fixed;
  top: 0;
  z-index: 900;

  background-color: ${({ visible }) =>
    visible ? `${colors.N0}` : `transparents`};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;

const StoreInfo = styled.div<{ height: number; scrollTop: number }>`
  height: ${({ height, scrollTop }) => `calc(${height - scrollTop}px)`};
  padding: 0 20px;
  position: relative;
`;
