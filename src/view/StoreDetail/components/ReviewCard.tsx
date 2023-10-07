import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Image } from "@mantine/core";

import Description from "components/Description";
import Hashtags from "components/Hashtags";
import SlideImage from "components/Image/SlideImage";
import BasicTitle from "components/Title/Title";
import { Space } from "components/core";

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
        <Space h={16} />
      </Wrapper>

      <SlideImage images={data?.reviewThumbnailImageUrls} />

      <Wrapper>
        <Space h={10} />
        <Description text={data?.content} />
        <Space h={10} />
      </Wrapper>

      <Hashtags hashtagTextDatas={data?.keywords} />
      <Space h={40} />
    </>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
`;
