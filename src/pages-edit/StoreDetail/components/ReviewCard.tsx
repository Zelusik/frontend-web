import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import ProfileTitle from "components/Title/ProfileTitle";
import Description from "components/Description";
import Hashtags from "components/Hashtags";
import SlideImage from "components/Image/SlideImage";

export default function ReivewCard({ data }: any) {
  const router = useRouter();
  const mine = true;

  return (
    <>
      <Wrapper>
        <ProfileTitle
          type={mine ? "mine" : "follow"}
          title={data.writer.nickname}
          // subTitle="움맘마"
          profileImg={data.writer.profileThumbnailImageUrl}
          id={data.writer.id}
        />
        <Spacing size={16} />
      </Wrapper>

      <SlideImage images={data?.reviewThumbnailImageUrls} />

      <Wrapper>
        <Spacing size={10} />
        <Description text={data?.content} />
        <Spacing size={10} />
      </Wrapper>

      <Hashtags type="secondary" hashtags={data?.keywords} />
      <Spacing size={40} />
    </>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
`;
