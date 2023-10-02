import { useRouter } from "next/router";
import { Box, Text, Space } from "@mantine/core";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { globalValue } from "constants/globalValue";
import { useAppSelector } from "hooks/useReduxHooks";
import useSearch from "hooks/useSearch";
import { getNearContentsProps } from "models/view/mapModel";
// https://react-kakao-maps-sdk.jaeseokim.dev/

interface KakaoMapProps {
  height?: number;
  lat: number;
  lng: number;
  markerDatas: getNearContentsProps[];

  // props
  myLat?: number;
  myLng?: number;

  isMarkShow?: boolean;
  onCurrentLocation?: any;
  handleClickMap?: any;
  handleClickMarker?: any;
}

export default function KakaoMap({
  height,
  lat,
  lng,
  markerDatas,
  ...props
}: any) {
  const router = useRouter();
  const { display } = useAppSelector((state) => state.global);
  const { store } = useAppSelector((state) => state.search);
  const { handleStore } = useSearch();

  return (
    <>
      <Box maw={globalValue.MAX_WIDTH} h={height ? height : display.height}>
        <Map
          isPanto={true}
          center={{
            lat: lat,
            lng: lng,
          }}
          onCenterChanged={(map: any) =>
            props?.onCurrentLocation &&
            props?.onCurrentLocation(
              map.getCenter().getLat(),
              map.getCenter().getLng()
            )
          }
          style={{ width: "100%", height: "100%" }}
          onClick={() => {
            if (store.id !== -1) {
              props?.handleClickMap();
            }
          }}
        >
          <CustomOverlayMap
            position={{
              lat: store?.point?.lat,
              lng: store?.point?.lng,
            }}
            yAnchor={1}
          >
            <Box>
              <Box component="span" className="title">
                {store.name}
              </Box>
            </Box>
          </CustomOverlayMap>
          {/* 마커들 */}
          {markerDatas &&
            markerDatas?.map((markerData: getNearContentsProps) => {
              return (
                ((props?.isMarkShow && markerData?.isMarked) ||
                  !props?.isMarkShow) && (
                  <MapMarker
                    key={markerData?.id}
                    position={{
                      lat: Number(markerData?.point?.lat),
                      lng: Number(markerData?.point?.lng),
                    }}
                    image={{
                      src: markerData?.isMarked
                        ? "https://eatery-bucket.s3.ap-northeast-2.amazonaws.com/assets/Component36.png"
                        : "https://eatery-bucket.s3.ap-northeast-2.amazonaws.com/assets/Component35.png",
                      size: {
                        width: store.id === markerData?.id ? 72 : 56,
                        height: store.id === markerData?.id ? 72 : 56,
                      },
                    }}
                    onClick={() => {
                      handleStore(markerData);
                      props?.handleClickMarker();
                    }}
                  />
                )
              );
            })}

          {/* 현재 위치 마커 */}
          <MapMarker
            position={{
              lat: Number(props?.myLat),
              lng: Number(props?.myLng),
            }}
            image={{
              src: "https://eatery-bucket.s3.ap-northeast-2.amazonaws.com/assets/myplace.png",
              size: {
                width: 24,
                height: 24,
              },
            }}
          />
        </Map>
      </Box>
    </>
  );
}
