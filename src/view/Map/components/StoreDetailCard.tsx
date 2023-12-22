import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useReduxHooks";
import Hashtags from "@/components/Hashtags";
import Title from "@/components/Title";
import StoreReviewButton from "@/components/Button/StoreReviewButton";
import { AspectRatio, Box, Image, Space } from "@/components/core";
import { Route } from "@/constants/Route";

export const StoreDetailCard = () => {
  const router = useRouter();
  const { store } = useAppSelector((state) => state.search);

  const handleClick = () => {
    router.push({
      pathname: Route.STORE_DETAIL(),
      query: { id: store?.id },
    });
  };

  return (
    <Box h={88} ph={15} dis="flex" gap={12} onClick={handleClick}>
      <AspectRatio miw={88} ratio={1} radius={8}>
        <Image src={store?.images?.[0]?.thumbnailUrl} alt="음식 사진" />
      </AspectRatio>
      <Box dis="flex" dir="column" justify="space-between">
        <Title
          height={46}
          renderLeft={
            <StoreReviewButton
              type="store"
              id={store?.id}
              name={store?.name}
              category={store?.category}
              //   color="N0"
              nameTypo="Headline4"
              categoryColor="N60"
              categoryTypo="Paragraph1"
            />
          }
        />

        <Hashtags
          type="slendar"
          hashtagTextDatas={[...store?.top3Keywords]}
          color="N65"
          typo="Paragraph1"
          background="N20"
        />
      </Box>
    </Box>
  );
};
