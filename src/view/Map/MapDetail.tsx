import type { FC } from "react";
import { useRef } from "react";

import {
  useDisplaySize,
  useMapStoreDetail,
  useAppDispatch,
  useAppSelector,
} from "@/hooks";

import { editDisplaySize } from "@/reducer/slices/global/globalSlice";

import { BottomNavigation } from "@/components";
import { Space } from "@/components/core";

import { LocationTitle, MapStoreDetail, StoreDetailCard } from "./components";

import { FilterButton } from "./components/filter";

interface Props {
  nearDatas: any;
  pickFoodType: any;
  pickDayOfWeek: any;
  pickMood: any;
}

export const MapDetail: FC<Props> = ({
  nearDatas,
  pickFoodType,
  pickDayOfWeek,
  pickMood,
}) => {
  const dispatch = useAppDispatch();

  const bottomRef = useRef<any>();

  const { width, height } = useDisplaySize();
  const { sheet: mapStoreDetailRef } = useMapStoreDetail({
    use: "use",
  });

  const { type, filterVisible } = useAppSelector((state) => state.search);

  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  return (
    <>
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
};
