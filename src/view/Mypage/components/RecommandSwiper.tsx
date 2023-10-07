import { useState } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Flex, Space, AspectRatio, Image } from "@mantine/core";

import Swiper from "components/Swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Route } from "constants/Route";
import { colors } from "constants/colors";
import StoreTitle from "components/Title/StoreTitle";
import NewButton from "./NewButton";
import { getAddressInfo } from "utils/getAddressInfo";
import useDisplaySize from "hooks/useDisplaySize";
import { globalValue } from "constants/globalValue";
import { useAppSelector } from "hooks/useReduxHooks";
import NothingButton from "components/Button/NothingButton";

export default function RecommandSwiper({
  recommendReviewDatas,
  mine,
  touch,
}: any) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const clickReviewDetail = (reviewId: number) => {
    router.push({ pathname: Route.REVIEW_DETAIL(), query: { id: reviewId } });
  };
  const handleClickRecommendReview = () => {
    router.push({ pathname: Route.RECOMMEND_BEST() });
  };

  return (
    <>
      <Space h={20} />
      <Swiper
        index={{ currentIndex, setCurrentIndex }}
        touch={touch}
        length={recommendReviewDatas?.length}
      >
        {recommendReviewDatas?.map((data: any, idx: number) => {
          return (
            <SwiperSlide key={idx} style={{ padding: "0 5px" }}>
              <AspectRatio ratio={300 / 340}>
                <Image
                  alt="음식 이미지"
                  src={globalValue.BLANK_IMAGE}
                  // src={data.review.images[0].imageUrl}
                  radius={12}
                  onClick={() => clickReviewDetail(data.review.id)}
                />
                {/* <NumberWrapper>
                  <Text typo="Paragraph7">{idx + 1}</Text>
                </NumberWrapper> */}
                {/* <StoreTitle
                  type="home"
                  title={data.review.place.name}
                  subTitle={getAddressInfo(data.review.place)}
                  onClick={() => clickReviewDetail(data.review.id)}
                  isMarked={data.review.place.isMarked}
                  placeId={data.review.place.id}
                /> */}
              </AspectRatio>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Space h={26} />

      <Flex mb={30} justify="center">
        <Flex gap={4}>
          {recommendReviewDatas?.map((data: any, idx: number) => {
            return <Index key={idx} act={currentIndex === idx} />;
          })}
        </Flex>
      </Flex>

      {mine && (
        <NothingButton
          buttonText="추천 베스트 수정하기"
          buttonClick={handleClickRecommendReview}
        />
      )}
      <Space h={20} />
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

const Index = styled.div<{ act: boolean }>`
  width: 4px;
  height: 4px;
  display: flex;

  animation: ${(props) => trans(props.act)} 0.3s forwards;
  border-radius: 2px;
`;
