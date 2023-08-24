import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Route } from "constants/Route";

import Spacing from "components/Spacing";
import ProfileTitle from "components/Title/ProfileTitle";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Text from "components/Text";
import { globalValue } from "constants/globalValue";

export default function StoreCard({ data }: any) {
  // 가게 id
  const router = useRouter();
  const clickStore = () => {
    router.push({ pathname: Route.REVIEW_DETAIL(), query: { id: data.id } });
  };

  return (
    <>
      <Wrapper>
        {/* 선호하는 음식이 아니라면 null */}
        <Text typo="Paragraph1" color="N60">
          내가 선호하는 음식 카테고리
        </Text>
        <Spacing size={6} />

        <ProfileTitle
          type="follow"
          title={data?.writer?.nickname}
          // subTitle="움맘마"
          profileImg={data?.writer?.image?.thumbnailUrl}
        />
        <Spacing size={16} />

        <Image
          alt="음식 사진"
          src={
            data?.reviewImage?.thumbnailUrl
              ? data?.reviewImage?.thumbnailUrl
              : globalValue.BLANK_IMAGE
          }
          type="home"
          onClick={clickStore}
        />

        <StoreTitle
          type="home"
          title={data?.place?.name}
          subTitle={`${data?.place?.category} · ${data?.place?.address?.sido} ${data?.place?.address?.sgg}`}
          onClick={clickStore}
          isMarked={data?.place?.isMarked}
          placeId={data?.place?.id}
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
