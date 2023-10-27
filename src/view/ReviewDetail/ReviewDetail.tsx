/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useDisplaySize from "hooks/useDisplaySize";
import useGetReviewsId from "hooks/queries/review-detail/useGetReviewsId";
import { makeInfo } from "utils/makeInfo";

import { globalValue } from "constants/globalValue";
import KakaoMap from "components/Common/KakaoMap";

import Info from "components/Common/Info";
import Description from "components/Description";
import Hashtags from "components/Hashtags";

import ImageBox from "./components/ImageBox";
import ScaleUpButton from "./components/ScaleUpButton";
import LoadingCircle from "components/Loading/LoadingCircle";
import { Box, Divider, ScrollArea, Space } from "components/core";
import Title from "components/Title";
import BackArrow from "components/Button/IconButton/BackArrow";
import Dots from "components/Button/IconButton/Dots";
import { useAppDispatch } from "hooks/useReduxHooks";
import { editDisplaySize } from "reducer/slices/global/globalSlice";
import { ScrollProps } from "components/core/ScrollArea/ScrollArea";
import StoreReviewButton from "components/Button/StoreReviewButton";
import Heart from "components/Button/IconButton/Heart";
import { makeAddress } from "utils/makeAddress";
import ProfileButton from "components/Button/ProfileButton";

export default function ReviewDetail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const { width, height } = useDisplaySize();
  dispatch(
    editDisplaySize({
      type: "display",
      value: [width, height],
    })
  );

  const [titleChange, setTitleChange] = useState<number>(0);
  const { reviewData, isReviewLoading } = useGetReviewsId(
    Number(router.query.id)
  );

  const handleScroll = ({ scrollY }: ScrollProps) => {
    setTitleChange(scrollY);
  };

  return (
    <>
      {isReviewLoading ? (
        <LoadingCircle height={height - 50} />
      ) : (
        <>
          <ImageBox ref={imageRef} images={reviewData?.reviewImages} />
          <Title
            height={50}
            padding={20}
            position="absolute"
            top={0}
            background={titleChange > width - 50 && "N0"}
            zIndex={802}
            renderLeft={
              <BackArrow color={titleChange <= width - 50 ? "N0" : "N100"} />
            }
            paddingLeft={8}
            textLeft={titleChange > width - 50 && reviewData?.place?.name}
            renderRight={
              <Dots
                type="share-report"
                color={titleChange <= width - 50 ? "N0" : "N100"}
              />
            }
          />
          <ScrollArea
            veiwportRef={scrollRef}
            scroll="y"
            h={height}
            bg="N0"
            onScroll={handleScroll}
          >
            <Space h={width + 4} />
            <Box pos="relative" bg="N0">
              <Space h={20} />
              <Title
                height={49}
                padding={20}
                renderLeft={
                  <StoreReviewButton
                    type="none"
                    id={1}
                    name={reviewData?.place?.name}
                    category={
                      reviewData?.place?.category
                        ? `${
                            reviewData?.place?.category
                              ? reviewData?.place?.category + " . "
                              : ""
                          }${makeAddress(reviewData?.place?.address)}`
                        : ""
                    }
                    color="N100"
                    nameTypo="Headline5"
                    categoryTypo="Paragraph1"
                  />
                }
                renderRight={<Heart id={reviewData?.place?.id} />}
              />
              <Space h={16} />

              <Hashtags
                padding={20}
                textColor="N100"
                hashtagTextDatas={reviewData?.keywords}
              />

              <Box ph={20}>
                <Space h={16} />
                <Description text={reviewData?.content} />
                <Space h={15} />
                <Divider h={1} bg="N20" />
                <Space h={16} />
                <Title
                  height={24}
                  renderLeft={
                    <ProfileButton
                      id={reviewData?.writer?.id}
                      image={reviewData?.writer?.profileThumbnailImageUrl}
                      imageSize={24}
                      nickname={reviewData?.writer?.nickname}
                    />
                  }
                />
                <Space h={16} />
              </Box>

              <Box w="100%" h={(width * 23) / 36} pos="relative">
                <KakaoMap
                  height={(width * 23) / 36}
                  lat={Number(reviewData?.place?.point?.lat)}
                  lng={Number(reviewData?.place?.point?.lng)}
                  myLat={Number(reviewData?.place?.point?.lat)}
                  myLng={Number(reviewData?.place?.point?.lng)}
                />
                <Box
                  w="100%"
                  h={(width * 23) / 36}
                  pos="absolute"
                  top={0}
                  zIndex={800}
                />
                <ScaleUpButton
                  lat={reviewData?.place?.point?.lat}
                  lng={reviewData?.place?.point?.lng}
                  myLat={reviewData?.place?.point?.lat}
                  myLng={reviewData?.place?.point?.lng}
                />
              </Box>

              <Box ph={20}>
                <Space h={40} />
                {makeInfo(reviewData?.place).map((data: any, idx: number) => {
                  return <Info key={idx} data={data} />;
                })}
              </Box>
            </Box>
          </ScrollArea>
        </>
      )}
    </>
  );
}
