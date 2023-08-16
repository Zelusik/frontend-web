import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useAppSelector } from "hooks/useReduxHooks";
import useDisplaySize from "hooks/useDisplaySize";
import useGeolocation from "hooks/useGeolocation";
import useSearch from "hooks/useSearch";
import useGetPlacesSearch from "hooks/queries/map/useGetPlacesSearch";

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

import FoodSelection from "./components/FoodSelection";
import FindLocationButton from "./components/FindLocationButton";
import StoreCard from "./components/StoreCard";
import LocationTitle from "./components/LocationTitle";

import FilterSelection from "./components/filter/FilterSelection";
import Filter from "./components/filter/Filter";
import FilterButton from "./components/filter/FilterButton";
import StoreSort from "./components/StoreSort";

const filterData = [
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
  const location = useGeolocation();
  const { height } = useDisplaySize();
  const { defaultSearch } = useSearch();
  const { type, filterAction } = useAppSelector((state) => state.search);

  const { data, isLoading } = useGetPlacesSearch();

  return isLoading ? (
    <></>
  ) : (
    <>
      <KakaoMapWrapper height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
        <KakaoMap
          lat={location.coordinates.lat}
          lng={location.coordinates.lng}
        />
      </KakaoMapWrapper>

      <FindLocationButton />
      <MapBottomSheet>
        {filterAction ? (
          <>
            {filterData.map((data: any, idx: number) => {
              return <Filter key={idx} type={data.type} data={data} />;
            })}
          </>
        ) : (
          <>
            {type === "store" ? <StoreSort /> : <LocationTitle />}
            <Spacing size={14} />
            {type === "location" ? <FilterSelection /> : null}
            {data.contents.map((data: any, idx: number) => {
              return <StoreCard key={idx} data={data} />;
            })}
          </>
        )}
      </MapBottomSheet>

      <TopWrapper>
        <Spacing size={15} />
        <InputWrapper>
          <Input type="shadow" placeholder="지역, 음식점, 닉네임 검색" />
        </InputWrapper>

        {type !== "default" ? (
          <IconWrapper>
            <Icon
              icon="CircleXButton"
              width={24}
              height={24}
              onClick={defaultSearch}
            />
          </IconWrapper>
        ) : undefined}
        <Spacing size={8} />

        <FoodSelection />
      </TopWrapper>

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

const TopWrapper = styled.div`
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
