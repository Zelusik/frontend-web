import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useReduxHooks";
import {
  getNearContentsImagesProps,
  getNearContentsProps,
} from "@/models/view/mapModel";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Route } from "@/constants/Route";
import Hashtags from "@/components/Hashtags";
import ImageCount from "@/components/ImageCount";
import { globalValue } from "@/constants/globalValue";
import Title from "@/components/Title";
import StoreReviewButton from "@/components/Button/StoreReviewButton";
import Heart from "@/components/Button/IconButton/Heart";
import { AspectRatio, Box, Image, Space } from "@/components/core";

interface StoreCardProps {
  key?: number;
  nearData: getNearContentsProps;
}

export const StoreCard = ({ nearData }: StoreCardProps) => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { display } = useAppSelector((state) => state.global);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    setCurrentIndex(newSwiper);
  };

  const handleClickStore = () => {
    router.push({
      pathname: Route.STORE_DETAIL(),
      query: { id: nearData?.id },
    });
  };

  return (
    <Box mh={15} pos="relative">
      {nearData?.images?.length === 0 ? (
        <AspectRatio ratio={330 / 192}>
          <Image src={globalValue.BLANK_IMAGE} alt="음식 이미지" radius={12} />
        </AspectRatio>
      ) : (
        <>
          <Swiper
            ref={swiperRef}
            allowSlidePrev={currentIndex !== 0}
            allowSlideNext={currentIndex !== nearData?.images?.length - 1}
            spaceBetween={20}
            onSlideChange={onSlideChange}
            style={{ height: ((display.width - 30) * 32) / 55 }}
          >
            {nearData?.images?.map(
              (image: getNearContentsImagesProps, idx: number) => {
                return (
                  <SwiperSlide key={idx}>
                    <AspectRatio ratio={330 / 192} onClick={handleClickStore}>
                      <Image
                        src={
                          image?.thumbnailUrl
                            ? image.thumbnailUrl
                            : globalValue.ERROR_IMAGE
                        }
                        alt="음식 이미지"
                        fit="cover"
                        radius={12}
                      />
                    </AspectRatio>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
          <ImageCount
            top={16}
            right={16}
            currentIndex={currentIndex}
            length={nearData?.images?.length}
          />
        </>
      )}
      <Space h={16} />

      <Title
        height={47}
        padding={5}
        renderLeft={
          <StoreReviewButton
            type="store"
            id={nearData?.id}
            name={nearData?.name}
            category={nearData?.category}
            nameColor="N100"
            nameTypo="Headline4"
            categoryColor="N60"
            categoryTypo="Paragraph1"
          />
        }
        // buttonRight={<Edit />}
        renderRight={
          <Heart id={nearData?.id} isMarked={nearData?.isMarked} size={24} />
        }
      />

      {nearData?.top3Keywords.length === 0 ? undefined : (
        <>
          <Space h={10} />
          <Hashtags
            hashColor="Orange600"
            hashTypo="Paragraph4"
            textColor="N100"
            textTypo="Paragraph2"
            hashtagTextDatas={nearData?.top3Keywords}
          />
        </>
      )}
      <Space h={30} />
    </Box>
  );
};
