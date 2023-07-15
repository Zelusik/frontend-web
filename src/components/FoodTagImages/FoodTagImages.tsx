import { useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import FoodTag from "./FoodTag";
import FoodTagLine from "./FoodTagLine";
import TagImage from "components/TagImage";

export default function FoodTagImages({}: any) {
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
    <div style={{ position: "relative" }}>
      <Swiper spaceBetween={0} onSlideChange={onSlideChange}>
        {images.map((src: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <TagImage key={idx} src={src} ratio={1} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <FoodTagLine percentage={percentage} />

      <FoodTagWrapper>
        <FoodTag
          onClick={() => {
            alert("foodtag");
          }}
        />
      </FoodTagWrapper>
    </div>
  );
}
const FoodTagWrapper = styled.div`
  padding: 0 20px;
  position: absolute;
  bottom: 21px;
  z-index: 999;
`;
