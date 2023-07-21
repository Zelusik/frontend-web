import { useRouter } from "next/router";
import styled from "@emotion/styled";
import BottomSheet from "components/BottomSheet";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Input from "components/Input";
import Selections from "./components/Selections";
import KakaoMap from "./components/KakaoMap";
import FindLocationButton from "./components/FindLocationButton";
import { colors } from "constants/colors";
import { keyframes } from "@emotion/react";

export default function Map() {
  const router = useRouter();

  return (
    <>
      <KakaoMap />
      <FindLocationButton />

      <BottomSheet>
        {["", "", "", "", ""].map((data: any, idx: number) => {
          return <Box key={idx}>Hi</Box>;
        })}
      </BottomSheet>

      <HeaderWrapper>
        <Spacing size={15} />
        <InputWrapper>
          <Input placeholder="지역, 음식점, 닉네임 검색" />
        </InputWrapper>
        <Spacing size={8} />

        <Selections />
      </HeaderWrapper>

      <BottomNavigation />
    </>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InputWrapper = styled.div`
  height: 52px;
  padding: 0 15px;
  display: flex;
`;

const Box = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 30px;
`;

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible ? 0 : 0.7};
  }
  to {
    opacity: ${visible ? 0.7 : 0};
  }
`;

const Background = styled.div<{ visible: boolean }>`
  width: 100%;
  max-width: 820px;
  height: 100%;

  position: absolute;
  top: 0;

  opacity: 0;
  background-color: ${colors.Shadow};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;
