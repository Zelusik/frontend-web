import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Numbers from "components/Share/Number";
import Spacing from "components/Spacing";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import Image from "components/Image";

export default function ImageDetail({}: any) {
  const router = useRouter();
  const { width, height } = useDisplaySize();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    setCurrentIndex(newSwiper);
  };

  const imageLen: any = Number(router.query.length);
  // const [images, setImages] = useState<any>([
  //   // router.query.image1,
  //   // router.query.image2,
  //   // router.query.image3,
  //   // router.query.image4,
  // ]);

  // useEffect(() => {
  //   setImages([
  //     router.query.image1,
  //     router.query.image2,
  //     router.query.image3,
  //     router.query.image4,
  //   ]);
  //   // console.log(router.query);
  // }, [router]);
  // console.log(images);

  return (
    <ImageDetailWrapper>
      <TitleWrapper>
        <BackTitle type="white-left" />
        <NumberWrapper>
          <Numbers currentIndex={currentIndex} length={router.query.length} />
        </NumberWrapper>
      </TitleWrapper>

      <Swiper
        allowSlidePrev={currentIndex !== 0}
        allowSlideNext={currentIndex !== imageLen - 1}
        onSlideChange={onSlideChange}
        style={{ marginTop: ((height - width) / 2 - 50) * 0.9 }}
      >
        {router.query.image1 !== "" ? (
          <SwiperSlide>
            <Image
              type="store-detail"
              alt="상세 이미지"
              src={router.query.image1}
            />
          </SwiperSlide>
        ) : undefined}
        {router.query.image2 !== "" ? (
          <SwiperSlide>
            <Image
              type="store-detail"
              alt="상세 이미지"
              src={router.query.image2}
            />
          </SwiperSlide>
        ) : undefined}
        {router.query.image3 !== "" ? (
          <SwiperSlide>
            <Image
              type="store-detail"
              alt="상세 이미지"
              src={router.query.image3}
            />
          </SwiperSlide>
        ) : undefined}
        {router.query.image4 !== "" ? (
          <SwiperSlide>
            <Image
              type="store-detail"
              alt="상세 이미지"
              src={router.query.image4}
            />
          </SwiperSlide>
        ) : undefined}
      </Swiper>

      <Spacing size={50} />
    </ImageDetailWrapper>
  );
}

const NumberWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;

  transform: translate(0, -50%);
  z-index: 800;
`;

const ImageDetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.Shadow};
`;

const TitleWrapper = styled.div`
  padding: 0 20px;
  position: relative;
`;
