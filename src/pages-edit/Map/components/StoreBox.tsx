import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Hashtags from "components/Hashtags";
import { Route } from "constants/Route";
import { useAppDispatch } from "hooks/useReduxHooks";
import { changeVisible } from "reducer/slices/bottomSheet/mapBottomSheetSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRef, useState } from "react";
import useDisplaySize from "hooks/useDisplaySize";
import Number from "components/Share/Number";

const images = [
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
  "https://i.ibb.co/2kSZX6Y/60pt.png",
];

export default function StoreBox() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useDisplaySize();

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    setCurrentIndex(newSwiper);
  };

  return (
    <Wrapper
      onClick={() => {
        router.push(Route.STORE_DETAIL());
      }}
    >
      <Inner>
        <NumberWrapper>
          <Number currentIndex={currentIndex} length={images.length} />
        </NumberWrapper>
        <Swiper
          ref={swiperRef}
          allowSlidePrev={currentIndex !== 0}
          allowSlideNext={currentIndex !== images.length - 1}
          onSlideChange={onSlideChange}
          style={{ height: (width * 32) / 55, borderRadius: 12 }}
        >
          {images.map((data: any, idx: number) => {
            return (
              <SwiperSlide key={idx}>
                <Image type="map-bottom-sheet" alt="음식 사진" src={data} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Spacing size={16} />
        <StoreTitle
          type="map"
          title="소이연남"
          subTitle="아시안푸드"
          onClick={() => {
            // router.push(Route.HOME_DETAIL());
          }}
        />
        <Spacing size={10} />
      </Inner>

      <Hashtags
        hashtags={[
          "단체모임에 딱",
          "데이트에 최고",
          "웨이팅 있음",
          "웨이팅 있음",
        ]}
        side={15}
      />
      <Spacing size={30} />
    </Wrapper>
  );
}

const NumberWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 30px;
  z-index: 800;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Inner = styled.div`
  padding: 0 15px;
`;
