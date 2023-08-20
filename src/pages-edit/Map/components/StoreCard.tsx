import { useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Route } from "constants/Route";
import Number from "components/Share/Number";
import Spacing from "components/Spacing";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Hashtags from "components/Hashtags";

export default function StoreCard({ data }: any) {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useDisplaySize();

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    setCurrentIndex(newSwiper);
  };

  const clickStoreDetail = () => {
    router.push({ pathname: Route.STORE_DETAIL(), query: { id: data.id } });
  };

  return (
    <Wrapper>
      <Inner onClick={clickStoreDetail}>
        {data.images.length === 0 ? (
          <Image
            type="map-bottom-sheet"
            alt="음식 사진"
            src="https://i.ibb.co/2kSZX6Y/60pt.png"
          />
        ) : (
          <>
            <NumberWrapper>
              <Number currentIndex={currentIndex} length={data.images.length} />
            </NumberWrapper>
            <Swiper
              ref={swiperRef}
              allowSlidePrev={currentIndex !== 0}
              allowSlideNext={currentIndex !== data.images.length - 1}
              spaceBetween={20}
              onSlideChange={onSlideChange}
              style={{ height: (width * 32) / 55 }}
            >
              {data.images.map((image: any, idx: number) => {
                return (
                  <SwiperSlide key={idx}>
                    <Image
                      type="map-bottom-sheet"
                      alt="음식 사진"
                      src={image.thumbnailUrl}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
        <Spacing size={16} />
      </Inner>

      <StoreTitle
        type="map"
        title={data.name}
        subTitle={data.category}
        onClick={clickStoreDetail}
        isMarked={data.isMarked}
        placeId={data.id}
      />

      {data.top3Keywords.length === 0 ? undefined : (
        <>
          <Spacing size={10} />
          <Hashtags hashtags={data.top3Keywords} side={15} />
        </>
      )}
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
