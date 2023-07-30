import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";
import { globalValue } from "constants/globalValue";

export default function KakaoMap({ lat, lng }: any) {
  const router = useRouter();

  return (
    <MapWrapper>
      <Map
        center={{ lat: lat, lng: lng }}
        style={{ width: "100%", height: "100%" }}
      ></Map>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: 100%;
`;
