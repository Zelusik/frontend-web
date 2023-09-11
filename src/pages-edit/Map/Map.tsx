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

import KakaoMap from "components/Common/KakaoMap";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Input from "components/Input";
import Icon from "components/Icon";

import FoodSelection from "./components/FoodSelection";
import FindLocationButton from "./components/FindLocationButton";
import FilterButton from "./components/FilterButton";
import LoadingCircle from "components/Loading/LoadingCircle";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import LocationError from "./components/LocationError";
import Toast from "components/Toast";
import useMapBottomSheet from "hooks/useMapBottomSheet";
import SearchPlace from "modal-edit/SearchPlace";
import MapBottomSheet from "modal-edit/MapBottomSheet";

declare const window: any;

export default function Map() {
  const router = useRouter();
  const infinityScrollRef = useRef(null);
  const myLocation: any = useGeolocation();
  const { visible, store, location } = useAppSelector((state) => state.search);
  const { visible: mapBottomSheetVisible } = useAppSelector(
    (state) => state.mapBottomSheet
  );
  const { handleLocation } = useSearch();

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

  useEffect(() => {
    if (store.id !== -1) {
      onCurrentLocation(store.point.lat, store.point.lng);
    }
  }, [store.id]);

  const { width, height } = useDisplaySize();
  const { handleSearchType } = useSearch();
  const {
    value,
    type,
    filterVisible,

    foodType,
    dayOfWeek,
    mood,
  } = useAppSelector((state) => state.search);

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

  const { placeData, isLoading, fetchNextPage, hasNextPage } = useGetPlacesNear(
    openToast,
    isMarkShow
  );
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  const {
    sheet,
    content,
    closeMapBottomSheet,
    openMapBottomSheetStore,
    closeMapBottomSheetStore,
  } = useMapBottomSheet({
    use: "use",
  });

  const goBack = () => {
    if (mapBottomSheetVisible === 1) {
      closeMapBottomSheet(sheet, true);
    } else if (store.id !== -1) {
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", goBack);
    return () => {
      window.removeEventListener("popstate", goBack);
    };
  }, [mapBottomSheetVisible, store.id]);

  if (visible) return <SearchPlace />;
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
            data={placeData?.flatMap((page_data: any) => page_data?.contents)}
            isMarkShow={isMarkShow}
            clickMap={() => openMapBottomSheetStore(sheet)}
            clickMarker={() => closeMapBottomSheetStore(sheet, height)}
          />
        )}
      </KakaoMapWrapper>

      <FindLocationButton clickFindLocation={clickFindLocation} />
      <MapBottomSheet
        sheet={sheet}
        content={content}
        filter={{
          pickFoodType,
          setPickFoodType,
          pickDayOfWeek,
          setPickDayOfWeek,
          pickMood,
          setPickMood,
        }}
        data={{
          placeData,
          isLoading,
          fetchNextPage,
          hasNextPage,
        }}
        myLocation={myLocation}
        isMarkShow={isMarkShow}
      />

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
        <Toast message="조건에 일치하는 장소가 없습니다" close={closeToast} />
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
