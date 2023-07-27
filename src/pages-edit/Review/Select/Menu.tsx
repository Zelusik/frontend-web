import React from "react";
import styled from "@emotion/styled";
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
const Menu = () => {
  const router = useRouter();
  const image = useAppSelector((state) => state.image);

  const handleClickSkipBtn = () => {
    router.push(Route.REVIEW_KEYWORD());
  };

  return (
    <MenuWrapper>
      <BackTitle type="default" text="메뉴 선택" />
      <ImageWrapper>
        <Swiper className="banner" slidesPerView={1} spaceBetween={20}>
          {image.map((preview: any) => (
            <SwiperSlide key={preview.preview}>
              <Image
                alt="음식 사진"
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
      <ExplanationWrapper>
        <div style={typography.Headline5}>메뉴의 이름은 무엇인가요?</div>
        <ExplanationBubble>사진을 눌러 메뉴를 태그할 수 있어요!</ExplanationBubble>
        <BubbleToolTip />
      </ExplanationWrapper>

      <BottomWrapper>
        <BottomButton
          text="넘어가기"
          radius={8}
          backgroundColor={colors.Orange400}
          color={colors.N0}
          height="54px"
          onClick={handleClickSkipBtn}
        />
      </BottomWrapper>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  height: 100%;
`;

const ImageWrapper = styled.div`
  padding: 20px;
`;
const ExplanationWrapper = styled.div`
  position: relative;
  padding: 0 20px;
`;

const BubbleToolTip = styled.div`
  position: absolute;
  top: 25px;
  left: 40px;
  z-index: 102;

  width: 0;
  height: 0;

  border-bottom: 12px solid ${colors.LightOrange};
  border-top: 12px solid transparent;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
`;
const ExplanationBubble = styled.div`
  width: fit-content;
  border-radius: 12px;
  color: ${colors.N80};
  background-color: ${colors.LightOrange};
  ${typography.Paragraph3};
  padding: 13px 15px;
  margin-top: 19px;
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 50px;
`;

export default Menu;
