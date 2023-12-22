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
  useAlert,
} from "@/hooks";

import { editDisplaySize } from "@/reducer/slices/global/globalSlice";
import { Icon, Toast } from "@/components";
import { Box, Flex, Space, Input } from "@/components/core";
import { FoodSelection } from "./components";

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  const [isMarkShow, setIsMarkShow] = useState<boolean>(false);

  const { width, height } = useDisplaySize();
  const { handleSearchType, handleLocation } = useSearch();
  const myLocation: any = useGeoLocation();
  const { isShowToast, openToast, closeToast } = useToast();

  const { value, type } = useAppSelector((state) => state.search);

  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  // 내 주변
  const handleClickMyLocation = () => {
    handleSearchType("default");
    handleLocation({
      lat: myLocation?.center?.lat,
      lng: myLocation?.center?.lng,
    });
  };
  // 저장
  const handleClickMarkShow = () => {
    setIsMarkShow(!isMarkShow);
  };

  return (
    <>
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
          mark={{ isMarkShow, handleClickMarkShow }}
          onClickMyLocation={handleClickMyLocation}
        />
      </Box>
      {isShowToast && (
        <Toast message="조건에 일치하는 장소가 없습니다" close={closeToast} />
      )}
    </>
  );
};
