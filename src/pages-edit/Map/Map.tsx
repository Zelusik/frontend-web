import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import MapBottomSheet from "components/BottomSheet/MapBottomSheet";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Input from "components/Input";
import Selections from "./components/Selections";
import KakaoMap from "./components/KakaoMap";
import FindLocationButton from "./components/FindLocationButton";
import StoreBox from "./components/StoreBox";
import LocationTitle from "./components/LocationTitle";

export default function Map() {
  const router = useRouter();

  return (
    <>
      <KakaoMap />
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

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InputWrapper = styled.div`
  height: 52px;
  padding: 0 15px;
  display: flex;
`;
