import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import BottomSheet from "components/BottomSheet";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Input from "components/Input";
import Selections from "./components/Selections";
import KakaoMap from "./components/KakaoMap";
import FindLocationButton from "./components/FindLocationButton";
import { useAppDispatch } from "hooks/useReduxHooks";
import { changeDisplayState } from "reducer/slices/global/globalSlice";
import StoreBox from "./components/StoreBox/StoreBox";
import LocationTitle from "./components/LocationTitle";

export default function Map() {
  const router = useRouter();
  const [action, setAction] = useState<boolean>(false);
  const bottomSheetMove = (newAction: boolean) => {
    setAction(newAction);
  };

  return (
    <>
      <KakaoMap />
      <FindLocationButton />

      <BottomSheet type="map" state={{ action, bottomSheetMove }}>
        <LocationTitle />
        <Spacing size={14} />
        {["", "", "", "", ""].map((data: any, idx: number) => {
          return <StoreBox key={idx} />;
        })}
      </BottomSheet>

      <HeaderWrapper>
        <Spacing size={15} />
        <InputWrapper>
          <Input placeholder="지역, 음식점, 닉네임 검색" />
        </InputWrapper>
        <Spacing size={8} />

        <Selections state={{ action, bottomSheetMove }} />
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
