import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import useDisplaySize from "hooks/useDisplaySize";
import useGeolocation from "hooks/useGeolocation";
import useSearch from "hooks/useSearch";
import useGetPlacesNear from "hooks/queries/map/useGetPlacesNear";
import useToast from "hooks/useToast";

import { globalValue } from "constants/globalValue";
import {
  atmosphereKeyword,
  dayOfWeekData,
  tasteData,
} from "constants/globalData";

import KakaoMap from "components/Common/KakaoMap";
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
import Toast from "components/Toast";
import useMapBottomSheet from "hooks/useMapBottomSheet";
import { changeFilterAction } from "reducer/slices/search/searchSlice";

declare const window: any;

export default function Map() {
  const router = useRouter();
  const infinityScrollRef = useRef(null);
  const myLocation: any = useGeolocation();
  const { location } = useAppSelector((state) => state.search);
  const { locationSetting } = useSearch();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const onCurrentLocation = (lat: any, lng: any) => {
    setCurrentLocation({
      center: {
        lat,
        lng,
      },
    });
  };
  const { isShowToast, openToast, closeToast } = useToast();

  const { height } = useDisplaySize();
  const { typeSetting } = useSearch();
  const {
    value,
    type,
    filterAction,

    foodType,
    dayOfWeek,
    mood,
  } = useAppSelector((state) => state.search);

  // 내 주변
  const clickMyLocation = () => {
    typeSetting("default");
    locationSetting({
      lat: myLocation?.center?.lat,
      lng: myLocation?.center?.lng,
    });
  };
  // 저장
  const [isMarkShow, setIsMarkShow] = useState<boolean>(false);
  const clickMarkShow = () => {
    setIsMarkShow(!isMarkShow);
  };
  // find
  const clickFindLocation = () => {
    onCurrentLocation(myLocation?.center?.lat, myLocation?.center?.lng);
  };

  // filter
  const [pickFoodType, setPickFoodType] = useState<any>("");
  const [pickDayOfWeek, setPickDayOfWeek] = useState<any>([]);
  const [pickMood, setPickMood] = useState<any>("");
  const filterData = [
    {
      type: "full",
      text: "음식종류",
      textList: tasteData,
      original: foodType,
      new: pickFoodType,
      Fn: (val: any) => setPickFoodType(val),
    },
    {
      type: "full-radius",
      text: "약속요일",
      textList: dayOfWeekData,
      original: dayOfWeek,
      new: pickDayOfWeek,
      Fn: (val: any) => setPickDayOfWeek(val),
    },
    {
      type: "full",
      text: "선호하는 분위기",
      textList: atmosphereKeyword,
      original: mood,
      new: pickMood,
      Fn: (val: any) => setPickMood(val),
    },
  ];

  const requestPermission = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView?.postMessage(JSON.stringify(myLocation));
    } else {
    }
  };

  useEffect(() => {
    requestPermission();
  }, [myLocation]);

  // 처음 세팅
  useEffect(() => {
    setPickFoodType(foodType);
    setPickDayOfWeek(dayOfWeek);
    setPickMood(mood);
    onCurrentLocation(location?.lat, location?.lng);
  }, [location, foodType, dayOfWeek, mood]);

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetPlacesNear(openToast);
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  const dispatch = useAppDispatch();
  const handleClickFilter = () => {
    dispatch(
      changeFilterAction({
        type: "search",
        value: false,
      })
    );
  };

  const { visible } = useAppSelector((state) => state.mapBottomSheet);
  const { sheet, content, closeMapBottomSheet } = useMapBottomSheet({
    use: "use",
    visible,
    handleClickFilter,
  });

  // const goBack = () => {
  //   console.log("MapBottomSheetBack");
  //   closeMapBottomSheet(sheet, true);
  // };

  // useEffect(() => {
  //   if (visible === 1) {
  //     window.addEventListener("popstate", goBack);
  //     return () => {
  //       window.removeEventListener("popstate", goBack);
  //     };
  //   } else {
  //     console.log();
  //   }
  // }, [visible]);

  return (
    <>
      <KakaoMapWrapper height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
        {myLocation?.error?.code === 1 ? (
          <LocationError />
        ) : !myLocation?.loaded ? (
          <LoadingCircle size={height - globalValue.BOTTOM_NAVIGATION_HEIGHT} />
        ) : (
          <KakaoMap
            lat={currentLocation?.center?.lat}
            lng={currentLocation?.center?.lng}
            myLat={myLocation?.center?.lat}
            myLng={myLocation?.center?.lng}
            onCurrentLocation={onCurrentLocation}
            data={data?.[0]?.contents}
            isMarkShow={isMarkShow}
          />
        )}
      </KakaoMapWrapper>

      <FindLocationButton clickFindLocation={clickFindLocation} />
      <MapBottomSheet sheet={sheet} content={content}>
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
              <LocationTitle type={type} data={data?.[0]?.totalElements} />
            )}
            <Spacing size={14} />
            {type === "location" ? <FilterSelection /> : null}
            {isLoading || !myLocation?.loaded ? (
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

        <FoodSelection
          clickMyLocation={clickMyLocation}
          clickMarkShow={clickMarkShow}
        />
      </TopWrapper>
      {isShowToast && (
        <Toast message="조건에 일치하는 장소가 없습니다" close={closeToast} />
      )}

      {filterAction ? (
        <FilterButton
          filter={{
            pickFoodType,
            pickDayOfWeek,
            pickMood,
          }}
        />
      ) : (
        <BottomNavigation />
      )}
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
