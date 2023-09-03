import { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { globalValue } from "constants/globalValue";
// https://react-kakao-maps-sdk.jaeseokim.dev/

export default function KakaoMap({ lat, lng, data, ...props }: any) {
  const router = useRouter();

  return (
    <MapWrapper>
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
      >
        {/* 마커들 */}
        {data &&
          data?.map((d: any, idx: number) => {
            return (
              ((props?.isMarkShow && d?.isMarked) || !props?.isMarkShow) && (
                <MapMarker
                  key={idx}
                  position={{
                    lat: d?.point?.lat,
                    lng: d?.point?.lng,
                  }}
                  image={{
                    src: d?.isMarked
                      ? "https://eatery-bucket.s3.ap-northeast-2.amazonaws.com/assets/Component36.png"
                      : "https://eatery-bucket.s3.ap-northeast-2.amazonaws.com/assets/Component35.png",
                    size: {
                      width: 56,
                      height: 56,
                    },
                  }}
                />
              )
            );
          })}

        {/* 현재 위치 마커 */}
        <MapMarker
          position={{
            lat: props?.myLat,
            lng: props?.myLng,
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
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: 100%;
`;
