import styled from "@emotion/styled";
import React, { useEffect } from "react";
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

const Place = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const image = useAppSelector((state) => state.image);
  const { placeInfo } = useAppSelector((state) => state.review);

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
                        categoryGroupName: res.documents[0].category_name,
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
      <BackTitle type="default" text="음식점 선택" />
      <ImageWrapper>
        <Swiper className="banner" slidesPerView={1} spaceBetween={20}>
          {image.map((preview: any) => (
            <SwiperSlide key={preview.preview}>
              <Image
                src={preview.preview}
                ratio={1.14}
                radius={20}
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageWrapper>
      <Spacing size={10} />
      <PlaceContainer>
        <>
          <div style={typography.Headline5}>어느 음식점인가요?</div>
          <Spacing size={20} />
          <PlaceInputWrapper onClick={handleClickSearchPlace}>
            <PlaceInput type="text" value={placeInfo.name} readOnly />
            <ChevronRight />
          </PlaceInputWrapper>
        </>
      </PlaceContainer>
      <BottomWrapper>
        <BottomButton
          text="다음으로"
          radius={8}
          backgroundColor={colors.Orange400}
          color={colors.N0}
          height="54px"
          onClick={handleClickNextBtn}
        />
      </BottomWrapper>
    </PlaceWrapper>
  );
};

const PlaceWrapper = styled.div`
  height: 100%;
`;

const ImageWrapper = styled.div`
  padding: 20px;
`;
const PlaceContainer = styled.div`
  padding: 0 20px;
`;
const PlaceInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  width: 100%;
  padding: 0 20px 50px;
`;
export default Place;
