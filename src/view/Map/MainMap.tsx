import { type FC, useState, useEffect, useRef } from "react";

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

import { getNearProps } from "@/models/view/mapModel";

import { globalValue } from "@/constants";

import { SadBobpool } from "@/components";
import { Box, Space } from "@/components/core";
import { LoadingCircle } from "@/components/Loading";
import { KakaoMap } from "@/components/Common";

interface Props {
  nearDatas: any;
}

export const MainMap: FC<Props> = ({ nearDatas }) => {
  const dispatch = useAppDispatch();
  const bottomRef = useRef<any>();

  const [isMarkShow] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const { width, height } = useDisplaySize();
  const { openAlert } = useAlert();
  const myLocation: any = useGeoLocation();
  const { sheet, openMapBottomSheetStore, closeMapBottomSheetStore } =
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

  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  const handleFindCurrentLocation = (lat: number, lng: number) => {
    setCurrentLocation({
      center: {
        lat,
        lng,
      },
    });
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

  return (
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
        <LoadingCircle height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT} />
      ) : (
        <KakaoMap
          height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}
          lat={currentLocation?.center?.lat}
          lng={currentLocation?.center?.lng}
          myLat={myLocation?.center?.lat}
          myLng={myLocation?.center?.lng}
          onFindCurrentLocation={handleFindCurrentLocation}
          markerDatas={nearDatas?.flatMap(
            (page_data: getNearProps) => page_data?.contents
          )}
          isMarkShow={isMarkShow}
          handleClickMap={handleClickMap}
          handleClickMarker={handleClickMarker}
        />
      )}
    </Box>
  );
};
