import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Space, AspectRatio, Image } from "@mantine/core";
import { useAppSelector } from "hooks/useReduxHooks";
import {
  getBookmarksContentsImagesProps,
  getBookmarksContentsProps,
} from "models/view/markModel";

import { globalValue } from "constants/globalValue";
import { colors } from "constants/colors";
import { Route } from "constants/Route";
import Hashtags from "components/Hashtags";

import InnerSlider from "components/Slider/InnerSlider";
import ImageCount from "components/Image/ImageCount";
import Title from "components/Title";
import StoreReviewButton from "components/Button/StoreReviewButton";
import Heart from "components/Button/IconButton/Heart";

interface StoreCardProps {
  key?: number;
  touch: any;
  markData: getBookmarksContentsProps;
}

const StoreCard = ({ touch, markData }: StoreCardProps) => {
  const router = useRouter();
  const { display } = useAppSelector((state) => state.global);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickStore = () => {
    router.push({
      pathname: Route.STORE_DETAIL(),
      query: { id: markData?.id },
    });
  };

  return (
    <>
      <Box
        w={display.width - 30}
        bg={colors["N0"]}
        pos="relative"
        style={{
          margin: "0 15px",
          padding: "16px 10px",
          borderRadius: 12,
          boxShadow: "0px 3px 18px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        {markData?.images?.length > 0 && (
          <>
            <InnerSlider
              height={((display.width - 50) * 192) / 310}
              index={{ currentIndex, setCurrentIndex }}
              touch={touch}
              length={markData?.images?.length}
            >
              {markData?.images?.map(
                (image: getBookmarksContentsImagesProps, idx: number) => {
                  return (
                    <AspectRatio
                      key={idx}
                      ratio={310 / 192}
                      onClick={handleClickStore}
                    >
                      <Image
                        src={
                          globalValue.BLANK_IMAGE
                          // image?.thumbnailUrl
                          //   ? image?.thumbnailUrl
                          //   : globalValue.ERROR_IMAGE
                        }
                        alt="음식 이미지"
                        fit="cover"
                        radius={12}
                      />
                    </AspectRatio>
                  );
                }
              )}
            </InnerSlider>
            <ImageCount
              currentIndex={currentIndex}
              length={markData?.images?.length}
            />
            <Space h={10} />
          </>
        )}

        <Title
          height={46}
          padding={5}
          renderLeft={
            <StoreReviewButton
              type="store"
              id={markData?.id}
              name={markData?.name}
              category={markData?.category}
              color="N100"
              nameTypo="Headline4"
              categoryTypo="Paragraph1"
            />
          }
          renderRight={<Heart id={markData?.id} isMarked={true} size={24} />}
        />

        {markData?.top3Keywords?.length > 0 && (
          <>
            <Space h={10} />
            <Hashtags
              hashColor={"Orange300"}
              hashTypo={"Paragraph4"}
              textColor={"N100"}
              textTypo={"Paragraph2"}
              hashtagTextDatas={markData?.top3Keywords}
            />
          </>
        )}
      </Box>
      <Space h={20} />
    </>
  );
};

export default StoreCard;
