import { useRouter } from "next/router";
import { Box, Text, Space, AspectRatio, Image } from "@mantine/core";
import { Route } from "constants/Route";

import { globalValue } from "constants/globalValue";
import { getTimeSinceVisit } from "utils/getTimeSinceVisit";
import { getFeedContentsProps } from "models/view/homeModel";
import Title from "components/Title";
import Dots from "components/Button/IconButton/Dots";
import ProfileButton from "components/Button/ProfileButton";
import Heart from "components/Button/IconButton/Heart";
import StoreReviewButton from "components/Button/StoreReviewButton";
import useDisplaySize from "hooks/useDisplaySize";

interface ReviewCardProps {
  key: number;
  feedData: getFeedContentsProps;
}

export default function ReviewCard({ feedData }: ReviewCardProps) {
  const router = useRouter();
  const { width } = useDisplaySize();
  const clickStore = () => {
    router.push({
      pathname: Route.REVIEW_DETAIL(),
      query: { id: feedData?.id },
    });
  };

  return (
    <>
      <Box pos="relative">
        {/* <Text color={colors["N60"]} style={typography["Paragraph1"]}>
          내가 선호하는 음식 카테고리
        </Text>
        <Space h={6} /> */}
        <Title
          height={37}
          renderLeft={
            <ProfileButton
              id={feedData?.writer?.id}
              image={
                feedData?.writer?.image?.thumbnailUrl ||
                "https://i.ibb.co/2kSZX6Y/60pt.png"
              }
              nickname={feedData?.writer?.nickname}
              createdAt={getTimeSinceVisit(feedData?.createdAt)}
            />
          }
          renderRight={<Dots type="share-report" size={20} color="N80" />}
        />
        <Space h={16} />

        <AspectRatio ratio={8 / 9}>
          <Image
            src={
              // globalValue.ERROR_IMAGE
              feedData?.reviewImage?.thumbnailUrl
                ? feedData?.reviewImage?.thumbnailUrl
                : globalValue.ERROR_IMAGE
            }
            alt="음식 사진"
            fit="cover"
            radius={20}
            onClick={clickStore}
          />
          <Title
            height={58}
            padding={20}
            position="absolute"
            bottom={26}
            renderLeft={
              <StoreReviewButton
                type="review"
                id={feedData?.id}
                name={feedData?.place?.name}
                category={feedData?.place?.category}
                color="N0"
                nameTypo="Headline6"
                categoryTypo="Paragraph4"
              />
            }
            renderRight={
              <Heart
                id={feedData?.place?.id}
                isMarked={feedData?.place?.isMarked}
                size={28}
              />
            }
          />
        </AspectRatio>
      </Box>
      <Space h={30} />
    </>
  );
}
