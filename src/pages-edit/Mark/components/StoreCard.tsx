import styled from "@emotion/styled";
import Image from "components/Image/Image";
import { colors } from "constants/colors";
import React, { useState } from "react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import Hashtags from "components/Hashtags";
import StoreTitle from "components/Title/StoreTitle";
import Spacing from "components/Spacing";
import useDisplaySize from "hooks/useDisplaySize";
import { getAddressInfo } from "utils/getAddressInfo";

import CustomSlider from "components/CustomSlider";

const StoreCard = ({ placeInfo, touch }: any) => {
  var settings = {
    arrows: false,
    dots: false,
    infinite: false,

    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    touchThreshold: 300,
    pauseOnFocus: true,
    // variableWidth: true,
  };

  const router = useRouter();
  const { width } = useDisplaySize();

  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickPlace = () => {
    router.push({
      pathname: Route.STORE_DETAIL(),
      query: { id: placeInfo.id },
    });
  };

  const onTouchStart = (e: any) => {
    setStartX(e?.changedTouches[0].clientX);
    touch.setTouch(false);
  };

  const onTouchMove = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    setMoveX(e?.changedTouches[0].clientX);

    if (
      (newX < 0 && currentIndex === placeInfo?.images?.length - 1) ||
      (newX > 0 && currentIndex === 0)
    ) {
      touch.setTouch(true);
    }
  };

  const onTouchEnd = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    if (newX < 0 && currentIndex !== placeInfo?.images?.length - 1) {
      // next
      setCurrentIndex(currentIndex + 1);
    } else if (newX > 0 && currentIndex !== 0) {
      // prev
      setCurrentIndex(currentIndex - 1);
    }
    touch.setTouch(true);
  };

  return (
    <Wrapper hasImage={placeInfo?.images?.length} onClick={handleClickPlace}>
      <div>
        {placeInfo?.images?.length > 0 && (
          <>
            <CustomSlider touch={touch} length={placeInfo?.images?.length}>
              {placeInfo?.images?.map((image: any, idx: number) => {
                return (
                  <Image
                    key={idx}
                    src={image?.thumbnailUrl}
                    alt="음식 사진"
                    type="mark"
                  />
                );
              })}
            </CustomSlider>
            <Spacing size={10} />
          </>
        )}
      </div>

      <StoreTitle
        type="mark"
        title={placeInfo?.name}
        subTitle={getAddressInfo(placeInfo)}
        isMarked={true}
        placeId={placeInfo?.id}
        editNone={true}
      />

      {placeInfo?.top3Keywords.length > 0 ? (
        <>
          <Spacing size={10} />
          <Hashtags
            type="hashtags"
            hashtags={placeInfo?.top3Keywords}
            side={0}
          />
        </>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ hasImage: boolean }>`
  width: 100%;
  padding: ${({ hasImage }) => (hasImage ? "16px 10px" : "16px 5px 16px 15px")};

  position: relative;

  border-radius: 12px;
  background-color: ${colors.N0};
  box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export default StoreCard;
