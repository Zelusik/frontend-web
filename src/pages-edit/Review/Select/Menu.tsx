/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Image from "components/Image/Image";
import { typography } from "constants/typography";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Spacing from "components/Spacing/Spacing";
import { colors } from "constants/colors";
import BottomButton from "components/Button/BottomButton";

import BackTitle from "components/Title/BackTitle";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import {
  changeVisible,
  changeVisibleType,
} from "reducer/slices/bottomSheet/bottomSheetSlice";
import { deleteMenuTag, modifyMenuTag } from "reducer/slices/image/imageSlice";
import { ImageType, MenuTagType } from "types/image";
import { setCurrentImageIndex } from "reducer/slices/image/currIdxSlice";
import { changeMenuTag } from "reducer/slices/image/menuTagSlice";
import Icon from "components/Icon/Icon";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import { OriginalImageDataType, TransformedImageDataType } from "types/review";

const Menu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuTagRef = useRef<any>([]);
  const image = useAppSelector((state) => state.image);
  const { foodInfo } = useAppSelector((state) => state.review);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevMenuTag, setPrevMenuTag] = useState<MenuTagType>({}); // modifyMenuTag를 위해

  useEffect(() => {
    if (currentSlideIndex < image.length && image[currentSlideIndex]?.menuTag) {
      if (image[currentSlideIndex] && image[currentSlideIndex].menuTag) {
        menuTagRef.current = menuTagRef.current.slice(
          0,
          image[currentSlideIndex].menuTag.length
        );
      }
    }
  }, [image[currentSlideIndex]?.menuTag]);

  const transformData = (
    originalData: OriginalImageDataType[]
  ): TransformedImageDataType[] => {
    return originalData.map((data) => ({
      image: data.image,
      menuTags:
        data.menuTag &&
        data.menuTag.map((tag) => ({
          content: tag.menu,
          point: {
            x: tag.x,
            y: tag.y,
          },
        })),
    }));
  };

  const handleClickNextBtn = () => {
    dispatch(
      changeReviewInfo({
        type: "images",
        value: transformData(image),
      })
    );
    router.push(Route.REVIEW_KEYWORD());
  };

  const handleClickImage = (event: any, index: number) => {
    try {
      dispatch(
        changeVisibleType({
          type: "bottomSheet",
          value: [1, "selectMenu"],
        })
      );
      const imageElement = event.target;

      // 이미지의 offset
      const offsetX = imageElement.getBoundingClientRect().left;
      const offsetY = imageElement.getBoundingClientRect().top;
      const width = imageElement.offsetWidth;
      const height = imageElement.offsetHeight;

      // 마우스의 상대적인 위치
      const relativeX = event.clientX - offsetX;
      const relativeY = event.clientY - offsetY;

      // 마우스 위치를 퍼센트로 변환
      const percentageX = (relativeX / width) * 100;
      const percentageY = (relativeY / height) * 100;

      dispatch(setCurrentImageIndex(index));

      dispatch(
        changeMenuTag({
          type: "x",
          value: percentageX,
        })
      );
      dispatch(
        changeMenuTag({
          type: "y",
          value: percentageY,
        })
      );
    } catch (error) {
      console.log("handleClickImage", error);
    }
  };

  const handleDeleteMenuTag = (menuTag: any, index: number) => {
    dispatch(
      changeVisible({
        type: "bottomSheet",
        value: 0,
      })
    );

    dispatch(
      deleteMenuTag({
        index,
        menuTag,
      })
    );
  };

  const handleDragStart = (e: any, idx: number, index: number) => {
    setPrevMenuTag(image[index].menuTag[idx]);
  };

  const handleDrag = (e: any, idx: number) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (menuTagRef.current[idx] && menuTagRef.current[idx].parentElement) {
      const parentRect =
        menuTagRef.current[idx].parentElement.getBoundingClientRect();

      const relativeX = clientX - parentRect.left;
      const relativeY = clientY - parentRect.top;

      // 마우스 위치를 퍼센트로 변환
      const percentageX = (relativeX / parentRect.width) * 100;
      const percentageY = (relativeY / parentRect.height) * 100;

      menuTagRef.current[idx].style.left = `${percentageX}%`;
      menuTagRef.current[idx].style.top = `${percentageY}%`;
    }
  };

  const handleDragEnd = (e: any, idx: number, index: number) => {
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    if (menuTagRef.current[idx] && menuTagRef.current[idx].parentElement) {
      const parentRect =
        menuTagRef.current[idx].parentElement.getBoundingClientRect();

      const relativeX = clientX - parentRect.left;
      const relativeY = clientY - parentRect.top;

      // 마우스 위치를 퍼센트로 변환
      const percentageX = (relativeX / parentRect.width) * 100;
      const percentageY = (relativeY / parentRect.height) * 100;
      // console.log(percentageX, percentageY, image);
      menuTagRef.current[idx].style.left = `${percentageX}%`;
      menuTagRef.current[idx].style.top = `${percentageY}%`;

      dispatch(
        modifyMenuTag({
          index: index,
          prevMenuTag: prevMenuTag,
          currMenuTag: {
            x: percentageX,
            y: percentageY,
            menu: prevMenuTag.menu,
          },
        })
      );
    }
  };
  return (
    <MenuWrapper>
      <BackTitle type="black-left-text" text="메뉴 선택" />
      <ImageWrapper style={{ position: "relative" }}>
        <Swiper
          className="banner"
          slidesPerView={1}
          spaceBetween={20}
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
        >
          {image.map((imageInfo: ImageType, index: number) => (
            <SwiperSlide key={imageInfo.preview}>
              <Image
                alt="음식 사진"
                src={imageInfo.preview}
                type="review"
                onClick={(event: any) => handleClickImage(event, index)}
              />
              {imageInfo?.menuTag && (
                <>
                  {imageInfo.menuTag.map((tag: any, idx: number) => (
                    <MenuTag
                      ref={(el) => (menuTagRef.current[idx] = el)}
                      key={tag.x}
                      x={tag.x}
                      y={tag.y}
                      onTouchStart={(e) => handleDragStart(e, idx, index)}
                      onTouchMove={(e) => handleDrag(e, idx)}
                      onTouchEnd={(e) => handleDragEnd(e, idx, index)}
                    >
                      {tag.menu}

                      <Icon
                        icon="XButton"
                        color="N0"
                        width={12}
                        height={12}
                        onTouchEnd={(event: any) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleDeleteMenuTag(tag, index);
                        }}
                      />
                    </MenuTag>
                  ))}
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <ImageBadge>{`${currentSlideIndex + 1}/${image.length}`}</ImageBadge>
      </ImageWrapper>
      <Spacing size={10} />
      <ExplanationWrapper>
        <div style={typography.Headline5}>메뉴의 이름은 무엇인가요?</div>
        <ExplanationBubble>
          {image.length && image.map((e: any) => e.menuTag).flat()[0]
            ? "태그를 길게 눌러 위치를 옮길 수 있어요!"
            : "사진을 눌러 메뉴를 태그할 수 있어요!"}
        </ExplanationBubble>
        <BubbleToolTip />
      </ExplanationWrapper>

      <BottomWrapper>
        <BottomButton
          text={foodInfo.length === 0 ? "넘어가기" : "다음으로"}
          radius={8}
          backgroundColor={colors.Orange400}
          color={colors.N0}
          height="54px"
          onClick={handleClickNextBtn}
          disabled={false}
        />
      </BottomWrapper>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 0 20px;
`;

const ImageWrapper = styled.div`
  padding: 20px 0;
`;

const MenuTag = styled.span<{ x?: number; y?: number }>`
  position: absolute;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 4px;

  border-radius: 8px;
  color: ${colors.N0} !important;
  background-color: rgba(32, 35, 48, 0.6);
  ${typography.Paragraph1};
  padding: 6px 10px;
`;

const ImageBadge = styled.span`
  position: absolute;
  bottom: 40px;
  right: 20px;
  padding: 4px 11px;
  ${typography.Paragraph2};
  color: ${colors.N0};
  background-color: rgba(32, 35, 48, 0.6);
  border-radius: 100px;
  z-index: 10;
`;

const ExplanationWrapper = styled.div`
  position: relative;
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
  left: 20px;
  right: 20px;
  margin-bottom: 40px;
`;

export default Menu;
