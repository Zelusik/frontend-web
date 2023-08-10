import styled from "@emotion/styled";
import Image from "components/Image/Image";
import { colors } from "constants/colors";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { typography } from "constants/typography";
import Text from "components/Text/Text";
import Icon from "components/Icon/Icon";
import Hashtag from "components/Hashtags/Hashtag";
import { useRouter } from "next/router";

const FoodComponents = ({ foodInfo }: { foodInfo: any }) => {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const hasImage = foodInfo.images ? true : false;

  const handleClickPlace = () => {
    router.push("/store-detail");
  };
  return (
    <FoodComponentWrapper hasImage={hasImage} onClick={handleClickPlace}>
      {foodInfo.images && (
        <ImageWrapper style={{ position: "relative" }}>
          <Swiper
            className="banner"
            slidesPerView={1}
            spaceBetween={20}
            onSlideChange={(swiper: any) => setCurrentSlideIndex(swiper.activeIndex)}
          >
            {foodInfo.images.map((image: string, index: number) => (
              <SwiperSlide key={image}>
                <Image src={image} alt="음식 사진" type="mark" />
              </SwiperSlide>
            ))}
          </Swiper>
          <ImageBadge>{`${currentSlideIndex + 1}/${
            foodInfo.images.length
          }`}</ImageBadge>
        </ImageWrapper>
      )}
      <PlaceInfo hasImage={hasImage}>
        <div className="place">
          <Text typo="Headline4" color="N100">
            {foodInfo.name}
          </Text>
          <Text
            typo="Paragraph1"
            color="N60"
          >{`${foodInfo.category} · ${foodInfo.region}`}</Text>
        </div>
        <Icon icon="Heart" />
      </PlaceInfo>
      {foodInfo.keywords && (
        <KeywordBox>
          {foodInfo.keywords.map((keyword: string) => (
            <Hashtag key={keyword} type="primary" text={keyword} />
          ))}
        </KeywordBox>
      )}
    </FoodComponentWrapper>
  );
};

const FoodComponentWrapper = styled.div<{ hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  padding: ${({ hasImage }) => (hasImage ? "16px 10px" : "16px 20px")};
  border-radius: 12px;
  background-color: ${colors.N0};
  box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.08);
`;
const ImageWrapper = styled.div`
  width: 100%;
`;
const ImageBadge = styled.span`
  position: absolute;
  top: 20px;
  right: 10px;
  padding: 4px 11px;
  ${typography.Paragraph2};
  color: ${colors.N0};
  background-color: rgba(32, 35, 48, 0.6);
  border-radius: 100px;
  z-index: 10;
`;
const PlaceInfo = styled.div<{ hasImage: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  .place {
    display: flex;
    flex-direction: ${({ hasImage }) => (hasImage ? "row" : "column")};
    gap: ${({ hasImage }) => (hasImage ? "8px" : "5px")};
    align-items: ${({ hasImage }) => (hasImage ? "center" : "initial")};
  }
`;

const KeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  overflow-x: auto;
`;
export default FoodComponents;
