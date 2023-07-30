import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import ProfileTitle from "../../../components/Title/ProfileTitle";
import Image from "components/Image";

import { typography } from "constants/typography";
import { Route } from "constants/Route";
import StoreTitle from "components/Title/StoreTitle";

export default function StoreBox({ id }: any) {
  const router = useRouter();

  return (
    <BoxWrapper>
      <ProfileTitle title="고작가" subTitle="움맘마" />
      <Spacing size={16} />
      <ImageWrapper>
        <Image
          alt="음식 사진"
          src="https://i.ibb.co/0Z6FNN7/60pt.png"
          type="home"
          onClick={() => {
            router.push(Route.HOME_DETAIL());
          }}
        />
        <StoreTitle
          type="default"
          title="소이연남"
          subTitle="음식 카테고리 지역"
          onClick={() => {
            router.push(Route.HOME_DETAIL());
          }}
        />
      </ImageWrapper>
      <Spacing size={24} /> {/* 6 */}
    </BoxWrapper>
  );
}

const BoxWrapper = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
`;
