import { useState } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Route } from "constants/Route";
import { colors } from "constants/colors";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Spacing from "components/Spacing";
import Text from "components/Text";
import NewButton from "./NewButton";
import { getAddressInfo } from "utils/getAddressInfo";
import useDisplaySize from "hooks/useDisplaySize";

export default function RecommandSwiper({ datas, mine, ...props }: any) {
  const router = useRouter();
  const { width } = useDisplaySize();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    setCurrentIndex(newSwiper);
  };

  const clickReviewDetail = (reviewId: number) => {
    router.push({ pathname: Route.REVIEW_DETAIL(), query: { id: reviewId } });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Swiper
        allowSlidePrev={currentIndex !== 0}
        allowSlideNext={currentIndex !== datas.length - 1}
        onSlideChange={onSlideChange}
      >
        {datas.map((data: any, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <ImageWrapper height={((width - 60) * 9) / 8}>
                <Image
                  type="home"
                  alt="추천 사진"
                  src={data.review.images[0].imageUrl}
                  onClick={() => clickReviewDetail(data.review.id)}
                />
                <NumberWrapper>
                  <Text typo="Paragraph7">{idx + 1}</Text>
                </NumberWrapper>
                <StoreTitle
                  type="home"
                  title={data.review.place.name}
                  subTitle={getAddressInfo(data.review.place)}
                  onClick={() => clickReviewDetail(data.review.id)}
                  isMarked={data.review.place.isMarked}
                  placeId={data.review.place.id}
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
            return <Index key={idx} act={currentIndex === idx}></Index>;
          })}
        </IndexInner>
      </IndexWrapper>
      <Spacing size={30} />

      {mine ? (
        <NewButton buttonText="추천 베스트 수정하기" onClick={props.onClick} />
      ) : null}
    </div>
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

const ImageWrapper = styled.div<{ height: number }>`
  max-height: ${({ height }) => height}px;
  min-height: ${({ height }) => height}px;
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

const Index = styled.div<{ act: boolean }>`
  width: 4px;
  height: 4px;
  display: flex;

  animation: ${(props) => trans(props.act)} 0.3s forwards;
  border-radius: 2px;
`;

const NumberWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 17px;
  font-style: italic;
`;
