import { forwardRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import SlideLine from "./SlideLine";
import FoodTag from "./FoodTag";
import ImageHashtag from "components/Common/ImageHashtag";
import { AspectRatio, Box, Image } from "components/core";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";

const ImageBox = forwardRef(function Div({ images }: any, ref: any) {
  const { display } = useAppSelector((state) => state.global);
  const [foodTagShow, setFoodTagShow] = useState<boolean>(false);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  const [percentage, setPercentage] = useState<number[]>([100, 100]);

  const onSlideChange = (e: any) => {
    let newPercentage = percentage;
    newPercentage[0] = ((swiperIndex + 1) / images?.length) * 100;
    setSwiperIndex(e.activeIndex);

    let newSwiper = e.activeIndex;
    newPercentage[1] = ((newSwiper + 1) / images?.length) * 100;
    setPercentage(newPercentage);
  };

  const clickFoodTag = () => {
    setFoodTagShow(!foodTagShow);
  };

  useEffect(() => {
    setPercentage([
      (swiperIndex / images?.length) * 100,
      ((swiperIndex + 1) / images?.length) * 100,
    ]);
  }, [images]);

  return (
    <Box
      veiwportRef={ref}
      w="100%"
      maw={globalValue.MAX_WIDTH}
      pos="fixed"
      top={0}
    >
      <Swiper
        allowSlidePrev={swiperIndex !== 0}
        allowSlideNext={swiperIndex !== images?.length - 1}
        spaceBetween={2}
        onSlideChange={onSlideChange}
        style={{ height: display.width + 4 }}
      >
        {images?.map((data: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <AspectRatio ratio={1}>
                {foodTagShow &&
                  data?.menuTags?.map((data2: any, idx2: number) => {
                    return (
                      <ImageHashtag
                        key={idx2}
                        text={data2.content}
                        top={data2?.point?.x}
                        left={data2?.point?.y}
                      />
                    );
                  })}
                <Image src={data?.imageUrl} alt="음식 사진" fit="cover" />
              </AspectRatio>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <FoodTag onClick={clickFoodTag} />
      <SlideLine percentage={percentage} />
    </Box>
  );
});

export default ImageBox;
