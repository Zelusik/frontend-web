import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";

const NEXT_PUBLIC_KAKAO_APP_JS_KEY = "91ce271bfa0a93ac384a49249667fb36";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

export default function KakaoMap() {
  const router = useRouter();

  return (
    <MapWrapper>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
      ></Map>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
`;
