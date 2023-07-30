import { useRouter } from "next/router";
import styled from "@emotion/styled";

import MapBottomSheet from "components/BottomSheet/MapBottomSheet";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Input from "components/Input";

import Selections from "./components/Selections";
import FindLocationButton from "./components/FindLocationButton";
import StoreBox from "./components/StoreBox";
import LocationTitle from "./components/LocationTitle";
import KakaoMap from "components/KakaoMap";

export default function Map() {
  const router = useRouter();

  return (
    <>
      <KakaoMapWrapper>
        <KakaoMap />
      </KakaoMapWrapper>
      <FindLocationButton />

      <MapBottomSheet>
        <LocationTitle />
        <Spacing size={14} />
        {["", "", "", "", ""].map((data: any, idx: number) => {
          return <StoreBox key={idx} />;
        })}
      </MapBottomSheet>

      <HeaderWrapper>
        <Spacing size={16} />
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

const KakaoMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InputWrapper = styled.div`
  height: 52px;
  padding: 0 15px;
  display: flex;
`;
