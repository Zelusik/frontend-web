import styled from "@emotion/styled";
import Number from "components/Share/Number";
import Spacing from "components/Spacing";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Image from "components/Image";
import useDisplaySize from "hooks/useDisplaySize";

const images = [
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
];

export default function ImageDetail({}: any) {
  const router = useRouter();
  const { width, height } = useDisplaySize();
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    setCurrentIndex(newSwiper);
  };

  return (
    <ImageDetailWrapper>
      <TitleWrapper>
        <BackTitle type="default" />
        <Number currentIndex={currentIndex} imageLength={images.length} />
      </TitleWrapper>

      <Swiper
        ref={swiperRef}
        onSlideChange={onSlideChange}
        style={{ marginTop: ((height - width) / 2 - 50) * 0.9 }}
      >
        {images.map((data: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <Image type="home-detail" alt="상세 이미지" src={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Spacing size={50} />
    </ImageDetailWrapper>
  );
}

const ImageDetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.Shadow};
`;

const TitleWrapper = styled.div`
  padding: 0 20px;
  position: relative;
`;
