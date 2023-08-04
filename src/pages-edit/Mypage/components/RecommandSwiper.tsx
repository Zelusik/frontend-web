import styled from "@emotion/styled";
import Image from "components/Image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import StoreTitle from "components/Title/StoreTitle";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import { css, keyframes } from "@emotion/react";
import { typography } from "constants/typography";

export default function RecommandSwiper({ datas, ...props }: any) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    setCurrentIndex(newSwiper);
  };

  return (
    <>
      <Swiper
        allowSlidePrev={currentIndex !== 0}
        allowSlideNext={currentIndex !== datas.length - 1}
        onSlideChange={onSlideChange}
      >
        {datas.map((data: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <ImageWrapper>
                <Image alt="추천 사진" src={data} type="home" />
                <Number>{idx + 1}</Number>
                <StoreTitle
                  type="default"
                  title="소이연남"
                  subTitle="음식 카테고리 지역"
                  onClick={() => {
                    // router.push(Route.HOME_DETAIL());
                  }}
                />
              </ImageWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Spacing size={26} />

      <IndexWrapper>
        <IndexInner>
          {datas.map((data: any, idx: number) => {
            return <Index key={idx} action={currentIndex === idx}></Index>;
          })}
        </IndexInner>
      </IndexWrapper>
      <Spacing size={30} />
    </>
  );
}

const trans = (action: boolean) => keyframes`
  from {
    width: ${action ? 4 : 18}px;
    background-color: ${action ? colors.N40 : colors.N100};
  }
  to {
    width: ${action ? 18 : 4}px;
    background-color: ${action ? colors.N100 : colors.N40};
  }
`;

const ImageWrapper = styled.div`
  margin: 0 10px;
  position: relative;
`;

const IndexWrapper = styled.div`
  display: flex;
`;
const IndexInner = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 4px;
`;

const Index = styled.div<{ action: boolean }>`
  width: 4px;
  height: 4px;
  display: flex;

  animation: ${(props) => trans(props.action)} 0.3s forwards;
  border-radius: 2px;
`;

const Number = styled.div`
  position: absolute;
  top: 20px;
  left: 17px;

  ${css`
    ${typography.Paragraph7}
  `}
  font-style: italic;
`;