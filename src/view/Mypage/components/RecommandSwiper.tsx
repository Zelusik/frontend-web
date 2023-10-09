import { useState } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import Swiper from "components/Swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Route } from "constants/Route";
import { colors } from "constants/colors";
import NothingButton from "components/Button/NothingButton";
import { AspectRatio, Flex, Image, Space, Gradient } from "components/core";
import Title from "components/Title";
import StoreReviewButton from "components/Button/StoreReviewButton";
import Heart from "components/Button/IconButton/Heart";
import ImageCount from "./ImageCount";
import { getRecommendReviewsProps } from "models/view/mypageModel";

interface RecommandSwiperProps {
  recommendReviewDatas?: getRecommendReviewsProps[];
  mine?: boolean;
  touch?: any;
}

const RecommandSwiper = ({
  recommendReviewDatas,
  mine,
  touch,
}: RecommandSwiperProps) => {
  const router = useRouter();
  const [swiperIndex, setSwiperIndex] = useState<number>(0);

  const clickReviewDetail = (id: number) => {
    router.push({ pathname: Route.REVIEW_DETAIL(), query: { id } });
  };
  const handleClickRecommendReview = () => {
    router.push({ pathname: Route.RECOMMEND_BEST() });
  };

  return (
    <>
      <Space h={20} />
      <Swiper
        index={{ swiperIndex, setSwiperIndex }}
        touch={touch}
        length={recommendReviewDatas?.length}
      >
        {recommendReviewDatas?.map(
          (recommendReviewData: getRecommendReviewsProps, idx: number) => {
            const DATA = recommendReviewData?.review?.place;

            return (
              <SwiperSlide key={idx} style={{ padding: "0 5px" }}>
                <AspectRatio ratio={300 / 340} radius={12}>
                  <Image
                    alt="음식 이미지"
                    src={recommendReviewData?.review?.images?.[0]?.imageUrl}
                    fit="cover"
                    onClick={() =>
                      clickReviewDetail(recommendReviewData?.review?.id)
                    }
                  />
                  <Gradient
                    h={94}
                    bottom={0}
                    direction="bottom"
                    o={0.8}
                    style={{
                      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) -11.22%, rgba(0, 0, 0, 0.00) 100%)`,
                    }}
                  />
                  <Title
                    height={56}
                    padding={20}
                    position="absolute"
                    bottom={30}
                    renderLeft={
                      <StoreReviewButton
                        type="review"
                        id={DATA?.id}
                        name={DATA?.name}
                        category={DATA?.category}
                        color="N0"
                        nameTypo="Headline6"
                        categoryTypo="Paragraph4"
                      />
                    }
                    renderRight={
                      <Heart
                        size={28}
                        id={DATA?.id}
                        isMarked={DATA?.isMarked}
                      />
                    }
                  />
                  <ImageCount currentIndex={idx + 1} />
                </AspectRatio>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
      <Space h={26} />

      <Flex mb={30} justify="center">
        <Flex gap={4}>
          {recommendReviewDatas?.map((_: any, idx: number) => {
            return <Index key={idx} act={swiperIndex === idx} />;
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
};

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

export default RecommandSwiper;
