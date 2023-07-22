import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import Image from "components/Image";
import Hashtags from "./components/Hashtags";
import Info from "./components/Info";
import Description from "components/Description";
import Hr from "components/Hr";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import BackTitle from "components/Title/BackTitle";
import StoreTitle from "components/Title/StoreTitle";
import Profile from "./components/Profile";
import FoodTagImages from "components/FoodTagImages";
import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";

export default function HomeDetail() {
  const router = useRouter();
  const [WINDOW_WIDTH, setWindow] = useState<number>(0);
  const [titleChange, setTitleChange] = useState<boolean>(false);

  function onScroll(width: number) {
    if (window.scrollY >= width + 6 - 20) {
      setTitleChange(true);
    } else {
      setTitleChange(false);
    }
  }

  useEffect(() => {
    setWindow(window.innerWidth);
    window.addEventListener("scroll", () => onScroll(window.innerWidth));
    return () => {
      window.removeEventListener("scroll", () => onScroll(window.innerWidth));
    };
  }, []);

  return (
    <>
      <Spacing size={WINDOW_WIDTH + 6} />
      <FoodTagImages />

      <BackTitleWrapper visible={titleChange}>
        <BackTitle
          type={titleChange ? "secondary" : "primary"}
          titleText={titleChange && "소이연남"}
        />
      </BackTitleWrapper>

      <div style={{ position: "relative", backgroundColor: "white" }}>
        <HomeDetailWrapper position="relative">
          <Spacing size={14} />
          <StoreTitle
            type="primary"
            title="소이연남"
            subtitle="음식 카테고리 지역"
          />
        </HomeDetailWrapper>

        <div style={{ background: "white" }}>
          <Spacing size={30} />
          <Hashtags
            typo={typography.Paragraph4}
            hashtags={["단체모임에 딱", "데이트에 최고", "웨이팅 있음"]}
          />
          <Spacing size={16} />
        </div>

        <HomeDetailWrapper position="relative">
          <Description
            text={`그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를
          그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를`}
            typo={typography.Paragraph2}
          />
          <Spacing size={15} />
          <Hr height={1} color={colors.N20} />
          <Spacing size={16} />
          <Profile />
        </HomeDetailWrapper>

        <Spacing size={16} />
        <Image src="https://i.ibb.co/0Z6FNN7/60pt.png" ratio={36 / 23} />
        <Spacing size={40} />

        <HomeDetailWrapper position="relative">
          {["", ""].map((data: any, idx: number) => {
            return <Info key={idx} />;
          })}
        </HomeDetailWrapper>
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
