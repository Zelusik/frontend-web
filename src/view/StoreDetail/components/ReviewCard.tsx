import Description from "@/components/Description";
import Hashtags from "@/components/Hashtags";
import { Box, Space } from "@/components/core";
import SlideImage from "./ImageSlide";
import Title from "@/components/Title";
import ProfileButton from "@/components/Button/ProfileButton";
import { getTimeSinceVisit } from "@/utils/getTimeSinceVisit";

export default function ReivewCard({ data, touch }: any) {
  return (
    <>
      <Box ph={20}>
        <Title
          height={37}
          renderLeft={
            <ProfileButton
              id={data?.writer?.id}
              image={data?.writer?.profileThumbnailImageUrl}
              nickname={data?.writer?.nickname}
              createdAt={getTimeSinceVisit(data?.createdAt)}
            />
          }
        />
        <Space h={16} />
      </Box>

      <SlideImage images={data?.reviewThumbnailImageUrls} touch={touch} />
      <Space h={10} />

      <Box ph={20}>
        <Description text={data?.content} />
        <Space h={10} />

        <Hashtags
          hashtagTextDatas={data?.keywords}
          hashColor="N60"
          textColor="N100"
          background="N10"
        />
        <Space h={40} />
      </Box>
    </>
  );
}
