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
import Hashtags from "components/Hashtags";
import StoreTitle from "components/Title/StoreTitle";
import Spacing from "components/Spacing";
import useDisplaySize from "hooks/useDisplaySize";
import Number from "components/Share/Number";

const StoreCard = ({ placeInfo }: { placeInfo: any }) => {
  const router = useRouter();
  const { width } = useDisplaySize();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickPlace = () => {
    router.push({
      pathname: Route.STORE_DETAIL(),
      query: { id: placeInfo.id },
    });
  };

  return (
    <Wrapper hasImage={placeInfo?.images?.length} onClick={handleClickPlace}>
      <div>
        {placeInfo?.images?.length > 0 && (
          <>
            <NumberWrapper>
              <Number
                currentIndex={currentIndex}
                length={placeInfo?.images?.length}
              />
            </NumberWrapper>
            <Swiper
              className="banner"
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={(swiper: any) =>
                setCurrentIndex(swiper.activeIndex)
              }
              allowSlidePrev={currentIndex !== 0}
              allowSlideNext={currentIndex !== placeInfo?.images?.length - 1}
              style={{ height: ((width - 25) * 192) / 310 }}
            >
              {placeInfo?.images?.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image?.thumbnailUrl}
                    alt="음식 사진"
                    type="mark"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Spacing size={10} />
          </>
        )}
      </div>

      <StoreTitle
        type="mark"
        title={placeInfo?.name}
        subTitle={`${placeInfo?.category} · ${placeInfo?.address?.sido} ${placeInfo?.address?.sgg}`}
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
`;

const NumberWrapper = styled.div`
  position: absolute;
  top: 31px;
  right: 20px;
  z-index: 800;
`;

export default StoreCard;
