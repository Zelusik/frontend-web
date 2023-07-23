import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import BackTitle from "components/Title/BackTitle";
import StoreTitle from "components/Title/StoreTitle";
import FoodTagImages from "components/FoodTagImages";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import Hashtags from "components/Hashtags";
import TopNavigation from "components/TopNavigation";
import ReivewBox from "./components/ReviewBox";
import Info from "components/Share/Info";

export default function StoreDetail() {
  const router = useRouter();
  const imageRef = useRef<any>(null);

  const [WINDOW_WIDTH, setWindow] = useState<number>(0);
  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function onScroll() {
    if (window.scrollY >= imageRef.current?.clientHeight - 20) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }

    if (window.scrollY >= imageRef.current?.clientHeight + 20 + 49 + 96 - 50) {
      setTopFixed(true);
    } else {
      setTopFixed(false);
    }
  }

  useEffect(() => {
    setWindow(window.innerWidth);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Spacing size={imageRef.current?.clientHeight} />
      <FoodTagImages ref={imageRef} />

      <BackTitleWrapper visible={titleChange}>
        <BackTitle
          type={titleChange ? "secondary" : "primary"}
          titleText={titleChange && "소이연남"}
        />
      </BackTitleWrapper>

      <div
        style={{
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <HomeDetailWrapper position="relative">
          <Spacing size={20} />
          <StoreTitle
            type="primary"
            title="소이연남"
            subtitle="음식 카테고리 지역"
          />
        </HomeDetailWrapper>

        <div style={{ background: "white" }}>
          <Spacing size={16} />
          <Hashtags
            hashtags={["단체모임에 딱", "데이트에 최고", "웨이팅 있음"]}
          />
          <Spacing size={40} />
        </div>

        <TopNavigation
          state={{ currentIndex, setCurrentIndex, topFixed }}
          titleList={["리뷰", "매장정보"]}
        >
          <div>
            {["", "", "", "", ""].map((data: any, idx: number) => {
              return <ReivewBox key={idx} />;
            })}
          </div>
          <HomeDetailWrapper position="relative" style={{ height: 844 }}>
            {["", ""].map((data: any, idx: number) => {
              return <Info key={idx} />;
            })}
          </HomeDetailWrapper>
        </TopNavigation>
      </div>
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

const HomeDetailWrapper = styled.div<{ position: any }>`
  padding: 0 20px;
  position: ${({ position }) => position};
  background-color: ${colors.N0};
`;

const BackTitleWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: 0 20px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: ${({ visible }) =>
    visible ? `${colors.N0}` : `transparents`};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;
