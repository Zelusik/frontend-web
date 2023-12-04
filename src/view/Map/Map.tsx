import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { useAppSelector } from "hooks/useReduxHooks";
import useDisplaySize from "hooks/useDisplaySize";
import useGeolocation from "hooks/useGeolocation";
import useSearch from "hooks/useSearch";
import useGetNear from "hooks/queries/map/useGetNear";
import useToast from "hooks/useToast";
import useMapBottomSheet from "hooks/useMapBottomSheet";
import useMapStoreDetail from "hooks/useMapStoreDetail";
import { useAppDispatch } from "hooks/useReduxHooks";
import { editDisplaySize } from "reducer/slices/global/globalSlice";

import { globalValue } from "constants/globalValue";
import {
  atmosphereKeyword,
  dayOfWeekData,
  tasteDatas,
} from "constants/globalData";

import KakaoMap from "components/Common/KakaoMap";
import MapBottomSheet from "components/BottomSheet/MapBottomSheet";
import BottomNavigation from "components/BottomNavigation";
import Icon from "components/Icon";

import FoodSelection from "./components/FoodSelection";
import FindLocationButton from "./components/FindLocationButton";
import StoreCard from "./components/StoreCard";
import LocationTitle from "./components/LocationTitle";

import FilterSelection from "./components/filter/FilterSelection";
import Filter from "./components/filter/Filter";
import FilterButton from "./components/filter/FilterButton";
import LoadingCircle from "components/Loading/LoadingCircle";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import Toast from "components/Toast";
import SadBobpool from "components/Error/SadBobpool";
import useAlert from "hooks/useAlert";
import MapStoreDetail from "./components/MapStoreDetail";
import {
  FilterDatasProps,
  getNearContentsProps,
  getNearProps,
} from "models/view/mapModel";
import Sort from "components/Sort";
import { Box, Flex, Space, Input } from "components/core";
import StoreDetailCard from "./components/StoreDetailCard";

declare const window: any;

export default function Map() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const infinityScrollRef = useRef(null);
  const bottomRef = useRef<any>();
  const { width, height } = useDisplaySize();
  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );
  const { openAlert } = useAlert();

  const { handleStore, handleSearchType } = useSearch();
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
  const handleClickFindLocation = () => {
    onCurrentLocation(myLocation?.center?.lat, myLocation?.center?.lng);
  };

  // map
  const handleClickMap = () => {
    openMapBottomSheetStore(sheet);
    closeMapStoreDetail(mapStoreDetailRef);
    bottomRef?.current?.style.setProperty("transform", `translateY(0)`);
  };
  const handleClickMarker = () => {
    closeMapBottomSheetStore(sheet, height);
    openMapStoreDetail(mapStoreDetailRef, height, true, location.pathname);
    // bottomRef?.current?.style.setProperty("transform", `translateY(88px)`);
  };

  // filter
  const [pickFoodType, setPickFoodType] = useState<any>("");
  const [pickDayOfWeek, setPickDayOfWeek] = useState<any>([]);
  const [pickMood, setPickMood] = useState<any>("");
  const filterDatas: FilterDatasProps[] = [
    {
      type: "full",
      text: "음식종류",
      textList: tasteDatas,
      original: foodType,
      new: pickFoodType,
      Fn: (val: string) => setPickFoodType(val),
    },
    {
      type: "full-radius",
      text: "약속요일",
      textList: dayOfWeekData,
      original: dayOfWeek,
      new: pickDayOfWeek,
      Fn: (val: string) => setPickDayOfWeek(val),
    },
    {
      type: "full",
      text: "선호하는 분위기",
      textList: atmosphereKeyword,
      original: mood,
      new: pickMood,
      Fn: (val: string) => setPickMood(val),
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

  useEffect(() => {
    handleStore({ ...store, id: -1, name: "" });
  }, []);

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

  const { nearDatas, isLoadingNear, fetchNextPage, hasNextPage } = useGetNear(
    openToast,
    isMarkShow
  );
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      <Box
        w={width}
        h={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}
        pos="absolute"
        zIndex={0}
      >
        {myLocation?.error?.code === 1 ? (
          <>
            <Space h={116} />
            <SadBobpool
              height={height - 116 - height * 0.35}
              text="지도 권한을 허용해야 볼 수 있어요"
              buttonText="설정 방법 보기"
              buttonClick={() => openAlert("location-setting")}
            />
          </>
        ) : !myLocation?.loaded ? (
          <LoadingCircle
            height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}
          />
        ) : (
          <KakaoMap
            height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}
            lat={currentLocation?.center?.lat}
            lng={currentLocation?.center?.lng}
            myLat={myLocation?.center?.lat}
            myLng={myLocation?.center?.lng}
            onCurrentLocation={onCurrentLocation}
            markerDatas={nearDatas?.flatMap(
              (page_data: getNearProps) => page_data?.contents
            )}
            isMarkShow={isMarkShow}
            handleClickMap={handleClickMap}
            handleClickMarker={handleClickMarker}
          />
        )}
      </Box>

      {/* {location.pathname !== "/map-store-detail-modal" && ( */}
      <FindLocationButton handleClick={handleClickFindLocation} />
      {/* )} */}
      <MapBottomSheet sheet={sheet} content={content}>
        {filterVisible ? (
          <>
            {filterDatas?.map((filterData: FilterDatasProps, idx: number) => {
              return (
                <Filter
                  key={idx}
                  type={filterData.type}
                  filterData={filterData}
                />
              );
            })}
          </>
        ) : (
          <>
            {type === "store" ? (
              <Sort />
            ) : (
              <LocationTitle
                type={type}
                length={nearDatas?.[0]?.totalElements}
              />
            )}
            <Space h={14} />
            {type === "location" && <FilterSelection />}
            {isLoadingNear || !myLocation?.loaded ? (
              <LoadingCircle
                height={
                  (height - 136 - globalValue.BOTTOM_NAVIGATION_HEIGHT) * 0.2
                }
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {nearDatas
                  ?.flatMap((page_data: getNearProps) => page_data?.contents)
                  ?.map((nearData: getNearContentsProps) => {
                    return (
                      ((isMarkShow && nearData?.isMarked) || !isMarkShow) && (
                        <StoreCard key={nearData?.id} nearData={nearData} />
                      )
                    );
                  })}
                <Box veiwportRef={infinityScrollRef} />
                {hasNextPage ? (
                  <>
                    <LoadingCircle height={30} />
                    <Space h={30} />
                  </>
                ) : null}
              </motion.div>
            )}
          </>
        )}
      </MapBottomSheet>

      <Box pos="relative">
        <Space h={15} />
        <Flex h={52} ph={15}>
          <Input
            type="shadow"
            placeholder="지역, 음식점, 닉네임 검색"
            value={value}
            setValue={() => {}}
            shadow={true}
          />
        </Flex>

        {type !== "default" && (
          <Box pos="absolute" top={29} right={27}>
            <Icon
              icon="CircleXButton"
              width={24}
              height={24}
              onClick={() => handleSearchType("default")}
            />
          </Box>
        )}
        <Space h={8} />

        <FoodSelection
          mark={{ isMarkShow, clickMarkShow }}
          clickMyLocation={clickMyLocation}
        />
      </Box>
      {isShowToast && (
        <Toast message="조건에 일치하는 장소가 없습니다" close={closeToast} />
      )}

      <MapStoreDetail ref={mapStoreDetailRef}>
        <LocationTitle type={type} length={nearDatas?.[0]?.totalElements} />
        <Space h={14} />
        <StoreDetailCard />
      </MapStoreDetail>
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
    </>
  );
}
