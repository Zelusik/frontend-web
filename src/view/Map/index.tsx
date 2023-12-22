import type { FC } from "react";
import { useState, useEffect, useRef } from "react";

import {
  useDisplaySize,
  useGeoLocation,
  useSearch,
  useToast,
  useMapBottomSheet,
  useMapStoreDetail,
  useAppDispatch,
  useAppSelector,
  useIntersectionObserver,
} from "@/hooks";
import useGetNear from "@/hooks/queries/map/useGetNear";

import { editDisplaySize } from "@/reducer/slices/global/globalSlice";

import { MapBottomSheet } from "@/components/BottomSheet";

import { FindLocationButton } from "./components";

import { MainMap } from "./MainMap";
import { MapBottomSheetContent } from "./MapBottomSheetContent";
import { Header } from "./Header";
import { MapDetail } from "./MapDetail";

export const Map: FC = () => {
  const dispatch = useAppDispatch();

  const infinityScrollRef = useRef(null);
  const bottomRef = useRef<any>();

  const [isMarkShow] = useState<boolean>(false);
  const [pickFoodType, setPickFoodType] = useState<any>("");
  const [pickDayOfWeek, setPickDayOfWeek] = useState<any>([]);
  const [pickMood, setPickMood] = useState<any>("");
  const [setCurrentLocation] = useState<any>(null);

  const { width, height } = useDisplaySize();
  const { handleStore } = useSearch();
  const myLocation: any = useGeoLocation();
  const { openToast } = useToast();
  const { sheet, content, closeMapBottomSheet, closeMapBottomSheetQuick } =
    useMapBottomSheet({
      use: "use",
    });
  const {
    sheet: mapStoreDetailRef,
    openMapStoreDetail,
    closeMapStoreDetail,
  } = useMapStoreDetail({
    use: "use",
  });

  const {
    store,
    location: searchLocation,

    foodType,
    dayOfWeek,
    mood,
  } = useAppSelector((state) => state.search);
  const { visible: mapBottomSheetVisible } = useAppSelector(
    (state) => state.mapBottomSheet
  );

  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  const handleFindCurrentLocation = (lat: any, lng: any) => {
    setCurrentLocation({
      center: {
        lat,
        lng,
      },
    });
  };

  // find
  const handleClickFindLocation = () => {
    handleFindCurrentLocation(myLocation?.center?.lat, myLocation?.center?.lng);
  };

  const handleClickBack = () => {
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
    if (store.id !== -1) {
      handleFindCurrentLocation(store.point.lat, store.point.lng);
    }
  }, [store.id]);

  // filter, location 처음 세팅
  useEffect(() => {
    setPickFoodType(foodType);
    setPickDayOfWeek(dayOfWeek);
    setPickMood(mood);
    handleFindCurrentLocation(searchLocation?.lat, searchLocation?.lng);
    closeMapBottomSheetQuick(sheet, true);
  }, [searchLocation, foodType, dayOfWeek, mood]);

  useEffect(() => {
    handleStore({ ...store, id: -1, name: "" });
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handleClickBack);
    return () => {
      window.removeEventListener("popstate", handleClickBack);
    };
  }, [mapBottomSheetVisible, store.id]);

  const { nearDatas, isLoadingNear, fetchNextPage, hasNextPage } = useGetNear(
    openToast,
    isMarkShow
  );
  useIntersectionObserver(infinityScrollRef, fetchNextPage, !!hasNextPage, {});

  return (
    <>
      <MainMap nearDatas={nearDatas} />

      <FindLocationButton handleClick={handleClickFindLocation} />

      <MapBottomSheet sheet={sheet} content={content}>
        <MapBottomSheetContent
          nearDatas={nearDatas}
          isLoadingNear={isLoadingNear}
          hasNextPage={hasNextPage}
        />
      </MapBottomSheet>

      <Header />

      <MapDetail
        nearDatas={nearDatas}
        pickFoodType={pickFoodType}
        pickDayOfWeek={pickDayOfWeek}
        pickMood={pickMood}
      />
    </>
  );
};
