import { useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useAppSelector } from "hooks/useReduxHooks";
import useDisplaySize from "hooks/useDisplaySize";
import useGeolocation from "hooks/useGeolocation";
import useSearch from "hooks/useSearch";
import useGetPlacesNear from "hooks/queries/map/useGetPlacesNear";

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
import StoreSort from "../Mark/components/StoreSort";
import LoadingCircle from "components/Loading/LoadingCircle";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LocationError from "./components/LocationError";

export default function Map() {
  const router = useRouter();
  const infinityScrollRef = useRef(null);
  const location: any = useGeolocation();

  const { height } = useDisplaySize();
  const {
    newFoodTypeSetting,
    newDayOfWeekSetting,
    newMoodSetting,
    typeSetting,
  } = useSearch();
  const {
    value,
    type,
    filterAction,

    foodType,
    newFoodType,
    dayOfWeek,
    newDayOfWeek,
    mood,
    newMood,
  } = useAppSelector((state) => state.search);

  const [isMarkShow, setIsMarkShow] = useState<boolean>(false);
  const clickMarkShow = () => {
    setIsMarkShow(!isMarkShow);
  };

  const filterData = [
    {
      type: "full",
      text: "음식종류",
      textList: tasteData,
      original: foodType,
      new: newFoodType,
      Fn: (val: any) => newFoodTypeSetting(val),
    },
    {
      type: "full-radius",
      text: "약속요일",
      textList: dayOfWeekData,
      original: dayOfWeek,
      new: newDayOfWeek,
      Fn: (val: any) => newDayOfWeekSetting(val),
    },
    {
      type: "full",
      text: "선호하는 분위기",
      textList: atmosphereKeyword,
      original: mood,
      new: newMood,
      Fn: (val: any) => newMoodSetting(val),
    },
  ];

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetPlacesNear();
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      <KakaoMapWrapper height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
        {location?.error?.code === 1 ? (
          <LocationError />
        ) : location?.coordinates?.lat === 0 &&
          location?.coordinates?.lng === 0 ? (
          <LoadingCircle size={height - globalValue.BOTTOM_NAVIGATION_HEIGHT} />
        ) : (
          <KakaoMap
            lat={location?.coordinates?.lat}
            lng={location?.coordinates?.lng}
            data={data?.[0]?.contents}
            isMarkShow={isMarkShow}
          />
        )}
      </KakaoMapWrapper>

      <FindLocationButton />
      <MapBottomSheet>
        {filterAction ? (
          <>
            {filterData?.map((data: any, idx: number) => {
              return <Filter key={idx} type={data.type} data={data} />;
            })}
          </>
        ) : (
          <>
            {type === "store" ? (
              <StoreSort />
            ) : (
              <LocationTitle type={type} data={data?.contents} />
            )}
            <Spacing size={14} />
            {type === "location" ? <FilterSelection /> : null}
            {isLoading ||
            (location?.coordinates?.lat === 0 &&
              location?.coordinates?.lng === 0) ? (
              <LoadingCircle
                size={
                  (height - 136 - globalValue.BOTTOM_NAVIGATION_HEIGHT) * 0.2
                }
              />
            ) : (
              <>
                {data
                  ?.flatMap((page_data: any) => page_data?.contents)
                  ?.map((data: any, idx: number) => {
                    return (
                      ((isMarkShow && data?.isMarked) || !isMarkShow) && (
                        <StoreCard key={idx} data={data} />
                      )
                    );
                  })}
                <div ref={infinityScrollRef} />
                {hasNextPage ? (
                  <>
                    <LoadingCircle size={30} />
                    <Spacing size={30} />
                  </>
                ) : null}
              </>
            )}
          </>
        )}
      </MapBottomSheet>

      <TopWrapper>
        <Spacing size={15} />
        <InputWrapper>
          <Input
            type="shadow"
            placeholder="지역, 음식점, 닉네임 검색"
            value={value}
          />
        </InputWrapper>

        {type !== "default" ? (
          <IconWrapper>
            <Icon
              icon="CircleXButton"
              width={24}
              height={24}
              onClick={() => typeSetting("default")}
            />
          </IconWrapper>
        ) : undefined}
        <Spacing size={8} />

        <FoodSelection clickMarkShow={clickMarkShow} />
      </TopWrapper>

      {filterAction ? <FilterButton /> : <BottomNavigation />}
    </>
  );
}

const KakaoMapWrapper = styled.div<{ height: number }>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
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
