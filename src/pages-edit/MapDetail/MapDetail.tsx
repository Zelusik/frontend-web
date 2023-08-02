import styled from "@emotion/styled";
import Icon from "components/Icon";
import KakaoMap from "components/KakaoMap";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import { useRouter } from "next/router";

export default function MapDetail() {
  const router = useRouter();
  const clickBack = () => {
    router.back();
  };
  return (
    <>
      <KakaoMapWrapper>
        <KakaoMap lat={33.450701} lng={126.570667} />
      </KakaoMapWrapper>
      <TitleWrapper>
        <BackTitle type="tertiary" />
      </TitleWrapper>
    </>
  );
}

const TitleWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 900;
`;

const KakaoMapWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;
