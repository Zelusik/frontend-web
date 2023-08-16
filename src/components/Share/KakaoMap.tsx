import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { globalValue } from "constants/globalValue";
// https://react-kakao-maps-sdk.jaeseokim.dev/

export default function KakaoMap({ lat, lng, ...props }: any) {
  const router = useRouter();

  return (
    <MapWrapper>
      <Map
        center={{ lat: lat, lng: lng }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* 현재 위치 마커 */}
        <MapMarker
          position={{
            lat: lat,
            lng: lng,
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
