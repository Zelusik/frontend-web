import { forwardRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import { Route } from "constants/Route";

import Image from "components/Image";
import Spacing from "components/Spacing";
import Hr from "components/Hr";

import { typography } from "constants/typo";

const ImageBox = forwardRef(function Div({ images }: any, ref: any) {
  const router = useRouter();
  const { width } = useDisplaySize();
  const handleClickImage = () => {
    router.push({
      pathname: Route.IMAGE_DETAIL(),
      query: {
        length: images.length,
        image1: images[0]?.imageUrl,
        image2: images[1]?.imageUrl,
        image3: images[2]?.imageUrl,
        image4: images[3]?.imageUrl,
        image5: images[4]?.imageUrl,
        image6: images[5]?.imageUrl,
        image7: images[6]?.imageUrl,
        image8: images[7]?.imageUrl,
        image9: images[8]?.imageUrl,
      },
    });
  };

  return (
    <ImageBoxWrapper
      ref={ref}
      style={{ height: (width * 281) / 360 }}
      onClick={handleClickImage}
    >
      <ImageWrapper>
        <ImageHorizonal
          width={images?.length < 2 ? width : width / 2}
          height={(width * 281) / 360}
        >
          {images?.length > 0 ? (
            <Image
              alt="디테일 이미지"
              type="store-detail"
              src={
                images?.length > 0
                  ? images[0]?.thumbnailImageUrl
                  : "https://i.ibb.co/2kSZX6Y/60pt.png"
              }
            />
          ) : null}
        </ImageHorizonal>
      </ImageWrapper>

      {images?.length > 1 ? (
        <>
          <Hr size={3} />
          <ImageWrapper>
            <ImageHorizonal
              width={width / 2 - 3}
              height={
                images?.length === 2
                  ? (width * 281) / 360
                  : (width * 281) / 360 / 2 - 1.5
              }
            >
              <Image
                alt="디테일 이미지"
                type="review-detail"
                src={images[1]?.thumbnailImageUrl}
              />
            </ImageHorizonal>
            {images?.length > 2 ? (
              <>
                <Spacing size={3} />
                <ImageHorizonal
                  width={width / 2 - 3}
                  height={(width * 281) / 360 / 2 - 1.5}
                >
                  <Image
                    alt="디테일 이미지"
                    type="review-detail"
                    src={images[2]?.thumbnailImageUrl}
                  />
                  {images?.length > 3 ? (
                    <>
                      <ImageCountWrapper />
                      <ImageCount>+{images?.length - 3}</ImageCount>
                    </>
                  ) : undefined}
                </ImageHorizonal>
              </>
            ) : undefined}
          </ImageWrapper>
        </>
      ) : undefined}
    </ImageBoxWrapper>
  );
});

const ImageBoxWrapper = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;

  display: flex;
  position: fixed;
  top: 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageHorizonal = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: relative;
`;

const ImageCountWrapper = styled.div`
  width: 100%;
  height: 100%;

  opacity: 0.4;
  position: absolute;
  top: 0;
  background-color: ${colors.N100};
`;

const ImageCount = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  ${css`
    ${typography.Headline3}
  `}

  color: ${colors.N0};
  transform: translate(-50%, -50%);
`;

export default ImageBox;
