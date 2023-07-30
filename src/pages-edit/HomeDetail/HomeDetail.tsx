import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import useDisplaySize from "hooks/useDisplaySize";
import Spacing from "components/Spacing";
import Info from "components/Share/Info";
import Description from "components/Description";
import Hr from "components/Hr";
import { colors } from "constants/colors";
import BackTitle from "components/Title/BackTitle";
import StoreTitle from "components/Title/StoreTitle";
import Hashtags from "components/Hashtags";

import Profile from "./components/Profile";
import ImageBox from "./components/ImageBox";
import KakaoMap from "components/KakaoMap";

export default function HomeDetail() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const { width } = useDisplaySize();
  const [titleChange, setTitleChange] = useState<boolean>(false);

  function onScroll() {
    if (scrollRef.current?.scrollTop >= window.innerWidth + 4 - 20) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }
  }

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <ImageBox ref={imageRef} />
      <BackTitleWrapper visible={titleChange}>
        <BackTitle
          type={titleChange ? "secondary" : "primary"}
          titleText={titleChange && "소이연남"}
        />
      </BackTitleWrapper>

      <HomeDetailWrapper ref={scrollRef}>
        <Spacing size={width + 4} />
        <HomeDetailInner position="relative">
          <Spacing size={20} />
          <div style={{ padding: "0 20px" }}>
            <StoreTitle
              type="primary"
              title="소이연남"
              subTitle="음식 카테고리 지역"
            />
            <Spacing size={16} />
          </div>

          <Hashtags
            hashtags={["단체모임에 딱", "데이트에 최고", "웨이팅 있음"]}
          />

          <div style={{ padding: "0 20px" }}>
            <Spacing size={16} />
            <Description
              text={`그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를
          그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를`}
            />
            <Spacing size={15} />
            <Hr />
            <Spacing size={16} />
            <Profile />
            <Spacing size={16} />
          </div>

          <KakaoMapWrapper height={(width * 23) / 36}>
            <KakaoMap />
          </KakaoMapWrapper>

          <div style={{ padding: "0 20px" }}>
            <Spacing size={40} />
            {["", ""].map((data: any, idx: number) => {
              return <Info key={idx} />;
            })}
          </div>
        </HomeDetailInner>
      </HomeDetailWrapper>
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

const HomeDetailWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const HomeDetailInner = styled.div<{ position: any }>`
  position: ${({ position }) => position};
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

const KakaoMapWrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  overflow: hidden;
`;
