import styled from "@emotion/styled";
import Image from "components/Image/Image";
import { colors } from "constants/colors";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { typography } from "constants/typography";
import Text from "components/Text/Text";
import Hashtag from "components/Hashtags/Hashtag";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import Heart from "components/Button/IconButton/Heart/Heart";

const FoodComponents = ({ placeInfo }: { placeInfo: any }) => {
  const router = useRouter();
  const hasImage = placeInfo.images ? true : false;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleClickPlace = () => {
    router.push({ pathname: Route.STORE_DETAIL(), query: { id: placeInfo.id } });
  };

  return (
    <FoodComponentWrapper hasImage={hasImage} onClick={handleClickPlace}>
      {placeInfo.images.length > 0 && (
        <ImageWrapper style={{ position: "relative" }}>
          <Swiper
            className="banner"
            slidesPerView={1}
            spaceBetween={20}
            onSlideChange={(swiper: any) => setCurrentSlideIndex(swiper.activeIndex)}
            allowSlidePrev={currentSlideIndex !== 0}
            allowSlideNext={currentSlideIndex !== placeInfo.images.length - 1}
          >
            {placeInfo.images.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <Image src={image.thumbnailUrl} alt="음식 사진" type="mark" />
              </SwiperSlide>
            ))}
          </Swiper>
          <ImageBadge>{`${currentSlideIndex + 1}/${
            placeInfo.images.length
          }`}</ImageBadge>
        </ImageWrapper>
      )}
      <PlaceInfo>
        <div className="place">
          <Text typo="Headline4" color="N100">
            {placeInfo.name}
          </Text>
          <Text
            typo="Paragraph1"
            color="N100"
          >{`${placeInfo.category} · ${placeInfo.address.sido} ${placeInfo.address.sgg}`}</Text>
        </div>
        <Heart size={24} placeId={placeInfo.id} isMarked={true} />
      </PlaceInfo>
      {placeInfo.keywords && placeInfo.images && (
        <KeywordBox>
          {placeInfo.keywords.map((keyword: string) => (
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
const PlaceInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .place {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const KeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  overflow-x: auto;
`;
export default FoodComponents;
