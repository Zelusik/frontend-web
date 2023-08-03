import { forwardRef, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import TagImage from "components/Image/TagImage";
import useDisplaySize from "hooks/useDisplaySize";
import FoodTagLine from "./FoodTagLine";
import FoodTag from "./FoodTag";

const ImageBox = forwardRef(({}, ref) => {
  const { width } = useDisplaySize();
  const images = [
    "https://i.ibb.co/0Z6FNN7/60pt.png",
    "https://i.ibb.co/0Z6FNN7/60pt.png",
    "https://i.ibb.co/0Z6FNN7/60pt.png",
    "https://i.ibb.co/0Z6FNN7/60pt.png",
    "https://i.ibb.co/0Z6FNN7/60pt.png",
  ];
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [percentage, setPercentage] = useState([
    (swiperIndex / images.length) * 100,
    ((swiperIndex + 1) / images.length) * 100,
  ]);

  const onSlideChange = (e: any) => {
    let newPercentage = percentage;
    newPercentage[0] = ((swiperIndex + 1) / images.length) * 100;
    setSwiperIndex(e.activeIndex);
    let newSwiper = e.activeIndex;
    newPercentage[1] = ((newSwiper + 1) / images.length) * 100;
    setPercentage(newPercentage);
  };

  return (
    <FoodTagWrapper ref={ref}>
      <Swiper
        allowSlidePrev={swiperIndex !== 0}
        allowSlideNext={swiperIndex !== images.length - 1}
        onSlideChange={onSlideChange}
        style={{ height: width + 4 }}
      >
        {images.map((src: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <TagImage key={idx} src={src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <FoodTagLine percentage={percentage} />

      <FoodTagInner>
        <FoodTag
          onClick={() => {
            alert("foodtag");
          }}
        />
      </FoodTagInner>
    </FoodTagWrapper>
  );
});

const FoodTagWrapper = styled.div<{ height: number }>`
  width: 100%;
  max-width: 820px;
  height: ${({ height }) => height}px;

  position: fixed;
  top: 0;
`;

const FoodTagInner = styled.div`
  padding: 0 20px;
  position: absolute;
  bottom: 21px;
  z-index: 900;
`;
export default ImageBox;
