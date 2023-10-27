import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "hooks/useReduxHooks";
import {
  getBookmarksContentsImagesProps,
  getBookmarksContentsProps,
} from "models/view/markModel";

import Swiper from "components/Swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { globalValue } from "constants/globalValue";
import { colors } from "constants/colors";
import { Route } from "constants/Route";
import Hashtags from "components/Hashtags";

import { AspectRatio, Box, Image, Space } from "components/core";
import Title from "components/Title";
import StoreReviewButton from "components/Button/StoreReviewButton";
import Heart from "components/Button/IconButton/Heart";
import ImageCount from "components/ImageCount";

interface StoreCardProps {
  key?: number;
  touch: any;
  markData: getBookmarksContentsProps;
}

const StoreCard = ({ touch, markData }: StoreCardProps) => {
  const router = useRouter();
  const { display } = useAppSelector((state) => state.global);
  const [swiperIndex, setSwiperIndex] = useState(0);

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
        mh={15}
        pv={16}
        ph={10}
        bg="N0"
        pos="relative"
        radius={12}
        style={{
          boxShadow: "0px 3px 18px 0px rgba(0, 0, 0, 0.08)",
        }}
        onClick={handleClickStore}
      >
        {markData?.images?.length > 0 && (
          <Swiper
            gap={10}
            index={{ swiperIndex, setSwiperIndex }}
            touch={touch}
            length={markData?.images?.length}
          >
            {markData?.images?.map(
              (image: getBookmarksContentsImagesProps, idx: number) => {
                return (
                  <SwiperSlide key={idx}>
                    <AspectRatio ratio={300 / 192} radius={12}>
                      <Image
                        src={
                          globalValue.BLANK_IMAGE
                          // image?.thumbnailUrl
                          //   ? image?.thumbnailUrl
                          //   : globalValue.ERROR_IMAGE
                        }
                        alt="음식 이미지"
                        fit="cover"
                      />
                    </AspectRatio>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        )}
        <ImageCount
          top={32}
          right={26}
          currentIndex={swiperIndex}
          length={markData?.images?.length}
        />
        <Space h={10} />

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
              hashColor="Orange300"
              hashTypo="Paragraph4"
              textColor="N100"
              textTypo="Paragraph2"
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
