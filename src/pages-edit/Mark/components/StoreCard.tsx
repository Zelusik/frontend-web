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
import { getAddressInfo } from "utils/getAddressInfo";

import CustomSlider from "components/CustomSlider";
import Number from "components/Common/Number";

const StoreCard = ({ placeInfo, touch }: any) => {
  const router = useRouter();
  const handleClickPlace = () => {
    router.push({
      pathname: Route.STORE_DETAIL(),
      query: { id: placeInfo.id },
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

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
            <CustomSlider
              index={{ currentIndex, setCurrentIndex }}
              touch={touch}
              length={placeInfo?.images?.length}
            >
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

const NumberWrapper = styled.div`
  position: absolute;
  top: 31px;
  right: 20px;
  z-index: 800;
`;

export default StoreCard;
