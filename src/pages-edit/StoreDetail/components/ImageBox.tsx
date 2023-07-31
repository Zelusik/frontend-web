import { forwardRef } from "react";
import styled from "@emotion/styled";

import Image from "components/Image";
import useDisplaySize from "hooks/useDisplaySize";
import { colors } from "constants/colors";
import Spacing from "components/Spacing";
import Hr from "components/Hr";
import { globalValue } from "constants/globalValue";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import { css } from "@emotion/react";
import { typography } from "constants/typography";

const ImageBox = forwardRef(({ images }: any, ref) => {
  const router = useRouter();
  const { width } = useDisplaySize();
  const handleClickImage = () => {
    router.push(Route.IMAGE_DETAIL());
  };

  return (
    <ImageBoxWrapper
      ref={ref}
      style={{ height: (width * 281) / 360 }}
      onClick={handleClickImage}
    >
      <ImageWrapper>
        <ImageHorizonal
          width={images.length < 2 ? width : width / 2}
          height={(width * 281) / 360}
        >
          {images.length > 0 ? (
            <Image
              alt="디테일 이미지"
              type="home-detail"
              src={
                images.length > 0
                  ? images[0]
                  : "https://i.ibb.co/2kSZX6Y/60pt.png"
              }
            />
          ) : null}
        </ImageHorizonal>
      </ImageWrapper>

      {images.length > 1 ? (
        <>
          <Hr size={3} />
          <ImageWrapper>
            <ImageHorizonal
              width={width / 2 - 3}
              height={
                images.length === 2
                  ? (width * 281) / 360
                  : (width * 281) / 360 / 2 - 1.5
              }
            >
              <Image alt="디테일 이미지" type="store-detail" src={images[1]} />
            </ImageHorizonal>
            {images.length > 2 ? (
              <>
                <Spacing size={3} />
                <ImageHorizonal
                  width={width / 2 - 3}
                  height={(width * 281) / 360 / 2 - 1.5}
                >
                  <Image
                    alt="디테일 이미지"
                    type="store-detail"
                    src={images[2]}
                  />
                  {images.length > 3 ? (
                    <>
                      <ImageCountWrapper />
                      <ImageCount>+{images.length - 3}</ImageCount>
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
