import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { globalValue } from "constants/globalValue";
import useDisplaySize from "hooks/useDisplaySize";
// https://react-kakao-maps-sdk.jaeseokim.dev/

export default function KakaoMap({ lat, lng, ...props }: any) {
  const router = useRouter();

  return (
    <MapWrapper>
      <Map
        center={{ lat: lat, lng: lng }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: 33.450701,
            lng: 126.570667,
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
