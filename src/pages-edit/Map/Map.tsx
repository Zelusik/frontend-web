import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useAppSelector } from "hooks/useReduxHooks";
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
import SearchPlace from "modal-edit/SearchPlace";
import MapStoreDetail from "modal-edit/MapStoreDetail";
import useMapStoreDetail from "hooks/useMapStoreDetail";

declare const window: any;

export default function Map() {
  const router = useRouter();
  const infinityScrollRef = useRef(null);
  const bottomRef = useRef<any>();
  const { height } = useDisplaySize();

  const { handleSearchType } = useSearch();
  const myLocation: any = useGeolocation();
  const { isShowToast, openToast, closeToast } = useToast();
  const { handleLocation } = useSearch();
  const {
    store,
    location: searchLocation,

    value,
    type,
    filterVisible,

    foodType,
    dayOfWeek,
    mood,
  } = useAppSelector((state) => state.search);
  const { visible: mapBottomSheetVisible } = useAppSelector(
    (state) => state.mapBottomSheet
  );
  const {
    sheet,
    content,
    closeMapBottomSheet,
    openMapBottomSheetStore,
    closeMapBottomSheetStore,
    closeMapBottomSheetQuick,
  } = useMapBottomSheet({
    use: "use",
  });
  const {
    sheet: mapStoreDetailRef,
    openMapStoreDetail,
    closeMapStoreDetail,
  } = useMapStoreDetail({
    use: "use",
  });

  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const onCurrentLocation = (lat: any, lng: any) => {
    setCurrentLocation({
      center: {
        lat,
        lng,
      },
    });
  };

  // 내 주변
  const clickMyLocation = () => {
    handleSearchType("default");
    handleLocation({
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

  useEffect(() => {
    if (store.id !== -1) {
      onCurrentLocation(store.point.lat, store.point.lng);
    }
  }, [store.id]);

  // fliter, location 처음 세팅
  useEffect(() => {
    setPickFoodType(foodType);
    setPickDayOfWeek(dayOfWeek);
    setPickMood(mood);
    onCurrentLocation(searchLocation?.lat, searchLocation?.lng);
    closeMapBottomSheetQuick(sheet, true);
  }, [searchLocation, foodType, dayOfWeek, mood]);

  const goBack = () => {
    const pathname = location.pathname;
    if (mapBottomSheetVisible === 1) {
      closeMapBottomSheet(sheet, true);
    } else if (pathname === "/map-store-detail-modal") {
      openMapStoreDetail(mapStoreDetailRef, height, true, pathname);
    } else if (store.id !== -1 && pathname === "/map") {
      closeMapStoreDetail(mapStoreDetailRef, true);
      closeMapBottomSheet(sheet, true);
      bottomRef?.current?.style.setProperty("transform", `translateY(0)`);
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", goBack);
    return () => {
      window.removeEventListener("popstate", goBack);
    };
  }, [mapBottomSheetVisible, store.id]);

  // data
  const { placeData, isLoading, fetchNextPage, hasNextPage } = useGetPlacesNear(
    openToast,
    isMarkShow
  );
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      {isLoading || !myLocation?.loaded ? (
        <LoadingCircle />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <KakaoMapWrapper
            height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}
          >
            {myLocation?.error?.code === 1 ? (
              <LocationError />
            ) : !myLocation?.loaded ? (
              <LoadingCircle
                size={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}
              />
            ) : (
              <KakaoMap
                lat={currentLocation?.center?.lat}
                lng={currentLocation?.center?.lng}
                myLat={myLocation?.center?.lat}
                myLng={myLocation?.center?.lng}
                onCurrentLocation={onCurrentLocation}
                data={placeData?.flatMap(
                  (page_data: any) => page_data?.contents
                )}
                isMarkShow={isMarkShow}
                clickMap={() => {
                  openMapBottomSheetStore(sheet);
                  closeMapStoreDetail(mapStoreDetailRef);
                  bottomRef?.current?.style.setProperty(
                    "transform",
                    `translateY(0)`
                  );
                }}
                clickMarker={() => {
                  closeMapBottomSheetStore(sheet, height);
                  openMapStoreDetail(
                    mapStoreDetailRef,
                    height,
                    true,
                    location.pathname
                  );
                  bottomRef?.current?.style.setProperty(
                    "transform",
                    `translateY(88px)`
                  );
                }}
              />
            )}
          </KakaoMapWrapper>

          <FindLocationButton clickFindLocation={clickFindLocation} />
          <MapBottomSheet sheet={sheet} content={content}>
            {filterVisible ? (
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
                  <LocationTitle
                    type={type}
                    data={placeData?.[0]?.totalElements}
                  />
                )}
                <Spacing size={14} />
                {type === "location" ? <FilterSelection /> : null}
                {isLoading || !myLocation?.loaded ? (
                  <LoadingCircle
                    size={
                      (height - 136 - globalValue.BOTTOM_NAVIGATION_HEIGHT) *
                      0.2
                    }
                  />
                ) : (
                  <>
                    {placeData
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
                setValue={() => {}}
              />
            </InputWrapper>

            {type !== "default" ? (
              <IconWrapper>
                <Icon
                  icon="CircleXButton"
                  width={24}
                  height={24}
                  onClick={() => handleSearchType("default")}
                />
              </IconWrapper>
            ) : undefined}
            <Spacing size={8} />

            <FoodSelection
              mark={{ isMarkShow, clickMarkShow }}
              clickMyLocation={clickMyLocation}
            />
          </TopWrapper>
          {isShowToast && (
            <Toast
              message="조건에 일치하는 장소가 없습니다"
              close={closeToast}
            />
          )}
        </motion.div>
      )}

      {filterVisible ? (
        <FilterButton
          filter={{
            pickFoodType,
            pickDayOfWeek,
            pickMood,
          }}
        />
      ) : (
        <BottomNavigation ref={bottomRef} />
      )}

      <MapStoreDetail ref={mapStoreDetailRef} />
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
