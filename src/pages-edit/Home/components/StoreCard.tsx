import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Route } from "constants/Route";

import Spacing from "components/Spacing";
import ProfileTitle from "components/Title/ProfileTitle";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Text from "components/Text";

export default function StoreCard({ id }: any) {
  const router = useRouter();
  const clickStore = () => {
    router.push({ pathname: Route.REVIEW_DETAIL(), query: { id: 1 } });
  };

  return (
    <>
      <Wrapper>
        {/* 선호하는 음식이 아니라면 null */}
        <Text typo="Paragraph1" color="N60">
          내가 선호하는 음식 카테고리
        </Text>
        <Spacing size={6} />

        <ProfileTitle type="follow" title="고작가" subTitle="움맘마" />
        <Spacing size={16} />

        <Image
          alt="음식 사진"
          src="https://i.ibb.co/2kSZX6Y/60pt.png"
          type="home"
          onClick={clickStore}
        />
        {/* <Spacing size={30} /> */}

        <StoreTitle
          type="home"
          title="소이연남"
          subTitle="음식 카테고리 지역"
          onClick={clickStore}
        />
      </Wrapper>
      <Spacing size={30} />
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;
