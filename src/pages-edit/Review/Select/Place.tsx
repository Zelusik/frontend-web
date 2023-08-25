import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Image from "components/Image/Image";
import { typography } from "constants/typography";
import { useAppSelector } from "hooks/useReduxHooks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Spacing from "components/Spacing/Spacing";
import { colors } from "constants/colors";
import BottomButton from "components/Button/BottomButton";

import BackTitle from "components/Title/BackTitle";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import useGetPlace from "hooks/queries/review/useGetPlace";
import useGetPlaceInfo from "hooks/queries/review/useGetPlaceInfo";

import Icon from "components/Icon/Icon";
import LoadingDots from "components/Loading/LoadingDots";

const Place = () => {
  const router = useRouter();

  const image = useAppSelector((state) => state.image);
  const { placeInfo } = useAppSelector((state) => state.review);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [isEnabled, setIsEnabled] = useState(false);
  const { data, isLoading: placeLoading, error } = useGetPlace(isEnabled);
  const { isLoading } = useGetPlaceInfo(image);

  useEffect(() => {
    if (data && !placeLoading && !error) {
      router.push(Route.REVIEW_MENU());
    }
  }, [data, placeLoading, error, router]);

  const handleClickNextBtn = () => {
    setIsEnabled(true);
  };

  const handleClickSearchPlace = () => {
    router.push(Route.REVIEW_SEARCH_PLACE());
  };

  return (
    <PlaceWrapper>
      {isLoading || placeLoading ? (
        <div className="icon">
          <LoadingDots />
        </div>
      ) : (
        <>
          <BackTitle type="black-left-text" text="음식점 선택" />
          <ImageWrapper style={{ position: "relative" }}>
            <Swiper
              className="banner"
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
            >
              {image.map((preview: any, index: number) => (
                <SwiperSlide key={preview.preview}>
                  <Image alt="음식 사진" src={preview.preview} type="review" />
                </SwiperSlide>
              ))}
            </Swiper>
            <ImageBadge>{`${currentSlideIndex + 1}/${image.length}`}</ImageBadge>
          </ImageWrapper>
          <Spacing size={10} />
          <PlaceContainer>
            <div style={typography.Headline5}>어느 음식점인가요?</div>
            <Spacing size={20} />
            <PlaceInputWrapper onClick={handleClickSearchPlace}>
              <PlaceInput type="text" value={placeInfo.name} readOnly />
              <Icon icon="Chevron" />
            </PlaceInputWrapper>
          </PlaceContainer>
          <BottomWrapper>
            <BottomButton
              text="다음으로"
              radius={8}
              color={colors.N0}
              height="54px"
              onClick={handleClickNextBtn}
              disabled={false}
            />
          </BottomWrapper>
        </>
      )}
    </PlaceWrapper>
  );
};

const PlaceWrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 0 20px;

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
`;

const ImageWrapper = styled.div`
  padding-top: 20px;
`;

const ImageBadge = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 4px 11px;
  ${typography.Paragraph2};
  color: ${colors.N0};
  background-color: rgba(32, 35, 48, 0.6);
  border-radius: 100px;
  z-index: 10;
`;

const PlaceContainer = styled.div`
  padding: 20px 0;
`;

const PlaceInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  border: 1px solid ${colors.N40};
  border-radius: 12px;
  background-color: ${colors.N0};
  height: 54px;
  justify-content: space-between;
`;

const PlaceInput = styled.input`
  width: 100%;
  border: none;
  ${typography.Headline3}
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  margin-bottom: 40px;
`;
export default Place;
