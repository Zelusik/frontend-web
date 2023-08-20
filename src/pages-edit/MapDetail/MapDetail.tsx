import styled from "@emotion/styled";
import KakaoMap from "components/Share/KakaoMap";
import BackTitle from "components/Title/BackTitle";
import { useRouter } from "next/router";

export default function MapDetail() {
  const router = useRouter();
  return (
    <>
      <KakaoMapWrapper>
        <KakaoMap
          lat={Number(router.query.lat)}
          lng={Number(router.query.lng)}
        />
      </KakaoMapWrapper>
      <TitleWrapper>
        <BackTitle type="map" />
      </TitleWrapper>
    </>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  margin-left: 20px;
  position: absolute;
  top: 20px;
  z-index: 900;
`;

const KakaoMapWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;
