import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const router = useRouter();

  return (
    <MapWrapper>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
      ></Map>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  width: 100%;
  max-width: 820px;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
`;
