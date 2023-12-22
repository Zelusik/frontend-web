import type { FC, PropsWithChildren } from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
  useAlert,
} from "@/hooks";
import useGetNear from "@/hooks/queries/map/useGetNear";

import { editDisplaySize } from "@/reducer/slices/global/globalSlice";

import {
  FilterDatasProps,
  getNearContentsProps,
  getNearProps,
} from "@/models/view/mapModel";

import {
  globalValue,
  atmosphereKeyword,
  dayOfWeekData,
  tasteDatas,
} from "@/constants";

import { BottomNavigation, Icon, Toast, Sort, SadBobpool } from "@/components";
import { Box, Flex, Space, Input } from "@/components/core";
import { LoadingCircle } from "@/components/Loading";
import { KakaoMap } from "@/components/Common";
import { MapBottomSheet } from "@/components/BottomSheet";

import {
  FoodSelection,
  FindLocationButton,
  StoreCard,
  LocationTitle,
  MapStoreDetail,
  StoreDetailCard,
} from "./components";

import { FilterSelection, Filter, FilterButton } from "./components/filter";

interface Props {
  nearDatas: any;
  isLoadingNear: any;
  hasNextPage: any;
}

export const MapBottomSheetContent: FC<Props> = ({
  nearDatas,
  isLoadingNear,
  hasNextPage,
}) => {
  const infinityScrollRef = useRef(null);
  const bottomRef = useRef<any>();

  const [isMarkShow, setIsMarkShow] = useState<boolean>(false);
  const [pickFoodType, setPickFoodType] = useState<any>("");
  const [pickDayOfWeek, setPickDayOfWeek] = useState<any>([]);
  const [pickMood, setPickMood] = useState<any>("");
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const { height } = useDisplaySize();
  const { handleStore } = useSearch();
  const myLocation: any = useGeoLocation();
  const { sheet, closeMapBottomSheet, closeMapBottomSheetQuick } =
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

    type,
    filterVisible,

    foodType,
    dayOfWeek,
    mood,
  } = useAppSelector((state) => state.search);
  const { visible: mapBottomSheetVisible } = useAppSelector(
    (state) => state.mapBottomSheet
  );

  // filter
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

  return (
    <>
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
            <LocationTitle type={type} length={nearDatas?.[0]?.totalElements} />
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
    </>
  );
};
