import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Box, Text, Space, AspectRatio, Image } from "@mantine/core";

import Spacing from "components/Spacing";
import Description from "components/Description";
import Hashtags from "components/Hashtags";
import SlideImage from "components/Image/SlideImage";
import BasicTitle from "components/Title/Title";

export default function ReivewCard({ data }: any) {
  const router = useRouter();
  const mine = true;

  return (
    <>
      <Wrapper>
        <BasicTitle
          height={37}
          renderLeft={
            <Image
              src={
                data.writer.profileThumbnailImageUrl ||
                "https://i.ibb.co/2kSZX6Y/60pt.png"
              }
              alt="프로필 이미지"
              w={30}
              h={30}
              radius={10}
            />
          }
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
