import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getAddressInfo } from "utils/getAddressInfo";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";

import useToast from "hooks/useToast";
import { colors } from "constants/colors";
import { Route } from "constants/Route";
import { typography } from "constants/typography";
import Toast from "components/Toast/Toast";

import {
  changeRecommendReview,
  initializeRecommendReview,
} from "reducer/slices/review/recommendReviewSlice";
import { AspectRatio, Box, Flex, Image, Space } from "components/core";
import Title from "components/Title";
import StoreReviewButton from "components/Button/StoreReviewButton";

export default function ReviewList({
  type = "mypage",
  reviewDatas,
  fetchNextPage,
  hasNextPage,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { display } = useAppSelector((state) => state.global);
  const recommendReview = useAppSelector((state) => state.recommendReview);
  const scrollRef = useRef(null);
  const { isShowToast, openToast, closeToast } = useToast();

  useIntersectionObserver(scrollRef, fetchNextPage, !!hasNextPage, {});

  useEffect(() => {
    dispatch(initializeRecommendReview());
  }, []);

  const clickReview = (id: number) => {
    switch (type) {
      case "mypage":
        router.push({ pathname: Route.REVIEW_DETAIL(), query: { id: id } });
        break;
      case "recommand-best":
        if (recommendReview.length === 3) {
          if (!recommendReview.includes(id)) {
            openToast();
          } else {
            dispatch(changeRecommendReview({ reviewId: id }));
          }
        } else {
          dispatch(changeRecommendReview({ reviewId: id }));
        }
        break;
    }
  };

  return (
    <>
      <Space h={20} />
      <Flex wrap="wrap" gap={6}>
        {reviewDatas
          ?.flatMap((review_data: any) => review_data?.contents)
          .map((reviewData: any, idx: number) => {
            return (
              <AspectRatio
                key={idx}
                w={(display.width - 46) / 2}
                radius={12}
                ratio={157 / 170}
              >
                <Image
                  alt="리뷰 사진"
                  src={
                    reviewData?.reviewImage?.thumbnailUrl ||
                    reviewData?.reviewThumbnailImageUrls?.[0]
                  }
                />
                <Title
                  height={39}
                  padding={10}
                  position="absolute"
                  bottom={15}
                  renderLeft={
                    <StoreReviewButton
                      type="review"
                      id={reviewData?.place?.id}
                      name={reviewData?.place?.name}
                      category={reviewData?.place?.category}
                      color="N0"
                      nameTypo="Headline3"
                      categoryTypo="Paragraph2"
                    />
                  }
                />
              </AspectRatio>
            );
          })}
        {isShowToast && (
          <Toast message="3개까지만 선택 가능해요" close={closeToast} />
        )}
        <Box veiwportRef={scrollRef} h={hasNextPage ? 30 : 0} />
      </Flex>
      <Space h={20} />
    </>
  );
}
