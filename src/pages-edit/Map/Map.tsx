import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import useDisplaySize from "hooks/useDisplaySize";
import { changeType } from "reducer/slices/search/searchSlice";

import { globalValue } from "constants/globalValue";
import {
  atmosphereKeyword,
  dayOfWeekData,
  tasteData,
} from "constants/globalData";

import KakaoMap from "components/Share/KakaoMap";
import MapBottomSheet from "components/BottomSheet/MapBottomSheet";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Input from "components/Input";
import Icon from "components/Icon";

import Selections from "./components/Selections";
import FindLocationButton from "./components/FindLocationButton";
import StoreBox from "./components/StoreBox";
import LocationTitle from "./components/LocationTitle";

import Filter from "./components/Filter";
import FilterSelection from "./components/FilterSelection";
import FilterButton from "./components/FilterButton";
import StoreFilter from "./components/StoreFilter";

const filterSelection = [
  {
    type: "full",
    text: "음식종류",
    textList: tasteData,
  },
  {
    type: "full-radius",
    text: "약속요일",
    textList: dayOfWeekData,
  },
  {
    type: "full",
    text: "선호하는 분위기",
    textList: atmosphereKeyword,
  },
];

export default function Map() {
  const router = useRouter();
  const { height } = useDisplaySize();

  const dispatch = useAppDispatch();
  const { type, filterAction } = useAppSelector((state) => state.search);
  const clickDelete = () => {
    dispatch(
      changeType({
        type: "search",
        value: "default",
      })
    );
  };

  return (
    <>
      <KakaoMapWrapper height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
        <KakaoMap lat={33.450701} lng={126.570667} />
      </KakaoMapWrapper>
      <FindLocationButton />

      <MapBottomSheet>
        {filterAction ? (
          <>
            {filterSelection.map((data: any, idx: number) => {
              return (
                <FilterSelection
                  key={idx}
                  type={data.type}
                  text={data.text}
                  textList={data.textList}
                />
              );
            })}
          </>
        ) : (
          <>
            {type === "store" ? <StoreFilter /> : <LocationTitle />}
            <Spacing size={14} />
            {type === "location" ? <Filter /> : null}
            {["", "", "", "", ""].map((data: any, idx: number) => {
              return <StoreBox key={idx} />;
            })}
          </>
        )}
      </MapBottomSheet>

      <HeaderWrapper>
        <Spacing size={16} />
        <InputWrapper>
          <Input placeholder="지역, 음식점, 닉네임 검색" />
        </InputWrapper>
        {type !== "default" ? (
          <IconWrapper>
            <Icon
              icon="CircleXButton"
              width={24}
              height={24}
              onClick={clickDelete}
            />
          </IconWrapper>
        ) : null}
        <Spacing size={8} />

        <Selections />
      </HeaderWrapper>

      {filterAction ? <FilterButton /> : <BottomNavigation />}
    </>
  );
}

const KakaoMapWrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
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

const IconWrapper = styled.div`
  position: absolute;
  top: 29px;
  right: 27px;
`;
