import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Image from "components/Image/Image";
import { typography } from "constants/typography";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { kakaoSearchKeyword } from "api/review";
import Spacing from "components/Spacing/Spacing";
import { colors } from "constants/colors";
import { ChevronRight } from "components/Icon/Chevron";
import BottomButton from "components/Button/BottomButton";

import BackTitle from "components/Title/BackTitle";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import useGetPlace from "hooks/queries/review/useGetPlace";

const Place = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const image = useAppSelector((state) => state.image);
  const { placeInfo } = useAppSelector((state) => state.review);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const {} = useGetPlace();

  const handleClickNextBtn = () => {
    router.push(Route.REVIEW_MENU());
  };

  const handleClickSearchPlace = () => {
    router.push(Route.REVIEW_SEARCH_PLACE());
  };

  useEffect(() => {
    if (!placeInfo.kakaoPid) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (image.length > 0) {
              kakaoSearchKeyword(
                image[0].lng || position.coords.longitude,
                image[0].lat || position.coords.latitude,
                "",
                1,
                (res: any) => {
                  dispatch(
                    changeReviewInfo({
                      type: "placeInfo",
                      value: {
                        kakaoPid: res.documents[0].id,
                        name: res.documents[0].place_name,
                        pageUrl: res.documents[0].place_url,
                        categoryName: res.documents[0].category_name,
                        categoryGroupCode: res.documents[0].category_group_code,
                        phone: res.documents[0].phone,
                        lotNumberAddress: res.documents[0].address_name,
                        roadAddress: res.documents[0].raod_address_name,
                        lat: res.documents[0].y,
                        lng: res.documents[0].x,
                      },
                    })
                  );
                }
              );
            }
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert(
                  "이 문장은 사용자가 Geolocation API의 사용 요청을 거부했을 때 나타납니다!"
                );
                break;

              case error.POSITION_UNAVAILABLE:
                alert("이 문장은 가져온 위치 정보를 사용할 수 없을 때 나타납니다!");
                break;

              case error.TIMEOUT:
                alert(
                  "이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!"
                );
                break;
            }
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }
    }
  }, [image]);

  return (
    <PlaceWrapper>
      <BackTitle type="secondary" text="음식점 선택" />
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
          <ChevronRight />
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
    </PlaceWrapper>
  );
};

const PlaceWrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 0 20px;
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
  gap: 20px;
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
  margin-bottom: 50px;
`;
export default Place;
