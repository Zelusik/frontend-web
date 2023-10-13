import { forwardRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import { Route } from "constants/Route";

import Image from "components/Image";

import { typography } from "constants/typography";
import { AspectRatio, Box, Divider, Flex, Space } from "components/core";
import { useAppSelector } from "hooks/useReduxHooks";

const ImageBox = forwardRef(function Div({ images }: any, ref: any) {
  const router = useRouter();
  const { display } = useAppSelector((state) => state.global);
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

  const height = (display.width * 281) / 360 - 3;

  return (
    <>
      <Flex
        veiwportRef={ref}
        w="100%"
        h={images?.length > 0 ? height : 50}
        pos="relative"
        onClick={handleClickImage}
      >
        {/* <Box w="100%" h="100%"> */}
        <AspectRatio
          w={images?.length < 2 ? display.width : (display.width - 3) / 2}
          ratio={281 / 360}
        >
          {images?.length > 0 && (
            <Image
              alt="디테일 이미지"
              type="store-detail"
              src={
                images?.length > 0
                  ? images?.[0]?.thumbnailImageUrl
                  : "https://i.ibb.co/2kSZX6Y/60pt.png"
              }
            />
          )}
        </AspectRatio>
        {/* </Box> */}

        {images?.length > 1 && (
          <>
            <Space w={3} />
            <Box>
              <AspectRatio
                w={(display.width - 3) / 2}
                h={images?.length < 3 ? height + 3 : height / 2}
              >
                <Image
                  alt="디테일 이미지"
                  type="review-detail"
                  src={images?.[1]?.thumbnailImageUrl}
                />
              </AspectRatio>
              {images?.length > 2 && (
                <>
                  <Space h={3} />
                  <AspectRatio w={(display.width - 3) / 2} h={height / 2}>
                    <Image
                      alt="디테일 이미지"
                      type="review-detail"
                      src={images?.[2]?.thumbnailImageUrl}
                    />
                    {images?.length > 3 && (
                      <>
                        <ImageCountWrapper />
                        <ImageCount>+{images?.length - 3}</ImageCount>
                      </>
                    )}
                  </AspectRatio>
                </>
              )}
            </Box>
          </>
        )}
      </Flex>
      <Space h={10} />
    </>
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
