import { forwardRef, useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import TagImage from "components/Image/TagImage";
import useDisplaySize from "hooks/useDisplaySize";
import FoodTagLine from "./FoodTagLine";
import FoodTag from "./FoodTag";
import ImageHashtag from "components/Share/ImageHashtag";

const ImageBox = forwardRef(function Div({}, ref: any) {
  const { width } = useDisplaySize();
  const [foodTagShow, setFoodTagShow] = useState(false);
  const imageDatas = [
    {
      src: "https://i.ibb.co/0Z6FNN7/60pt.png",
      hashtags: [
        { text: "똠얌칼국수", top: 10, left: 20 },
        { text: "똠얌칼국수", top: 20, left: 80 },
        { text: "똠얌칼국수", top: 60, left: 20 },
      ],
    },
    {
      src: "https://i.ibb.co/0Z6FNN7/60pt.png",
      hashtags: [
        { text: "똠얌칼국수", top: 27, left: 31 },
        { text: "똠얌칼국수", top: 43, left: 87 },
      ],
    },
    {
      src: "https://i.ibb.co/0Z6FNN7/60pt.png",
      hashtags: [
        { text: "똠얌칼국수", top: 20, left: 80 },
        { text: "똠얌칼국수", top: 60, left: 20 },
      ],
    },
  ];
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [percentage, setPercentage] = useState([
    (swiperIndex / imageDatas.length) * 100,
    ((swiperIndex + 1) / imageDatas.length) * 100,
  ]);

  const onSlideChange = (e: any) => {
    let newPercentage = percentage;
    newPercentage[0] = ((swiperIndex + 1) / imageDatas.length) * 100;
    setSwiperIndex(e.activeIndex);
    let newSwiper = e.activeIndex;
    newPercentage[1] = ((newSwiper + 1) / imageDatas.length) * 100;
    setPercentage(newPercentage);
  };

  const clickFoodTag = () => {
    setFoodTagShow(!foodTagShow);
  };

  return (
    <FoodTagWrapper ref={ref}>
      {/* <div></div> */}

      <Swiper
        allowSlidePrev={swiperIndex !== 0}
        allowSlideNext={swiperIndex !== imageDatas.length - 1}
        onSlideChange={onSlideChange}
        style={{ height: width + 4 }}
      >
        {imageDatas.map((data: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              {foodTagShow
                ? data.hashtags.map((data2: any, idx2: number) => {
                    return (
                      <ImageHashtag
                        key={idx2}
                        text={data2.text}
                        top={data2.top}
                        left={data2.left}
                      />
                    );
                  })
                : null}

              <TagImage key={idx} src={data.src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <FoodTagLine percentage={percentage} />

      <FoodTagInner>
        <FoodTag onClick={clickFoodTag} />
      </FoodTagInner>
    </FoodTagWrapper>
  );
});

const FoodTagWrapper = styled.div`
  width: 100%;
  max-width: 820px;

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
