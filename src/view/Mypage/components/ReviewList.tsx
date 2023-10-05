import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getAddressInfo } from "utils/getAddressInfo";
import styled from "@emotion/styled";
import { Box, Flex, Text, Space, AspectRatio } from "@mantine/core";
import useDisplaySize from "hooks/useDisplaySize";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";

import useToast from "hooks/useToast";
import { colors } from "constants/colors";
import { Route } from "constants/Route";
import { typography } from "constants/typography";

import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Toast from "components/Toast/Toast";

import {
  changeRecommendReview,
  initializeRecommendReview,
} from "reducer/slices/review/recommendReviewSlice";
import { globalValue } from "constants/globalValue";

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
          .map((data: any, idx: number) => {
            return (
              <AspectRatio
                key={idx}
                w={(display.width - 46) / 2}
                ratio={157 / 170}
              >
                <Image
                  alt="리뷰 사진"
                  src={
                    globalValue.BLANK_IMAGE
                    // data?.reviewImage?.thumbnailUrl ||
                    // data?.reviewThumbnailImageUrls[0]
                  }
                  type="mypage-review"
                />
              </AspectRatio>
              //   {/* <StoreTitle
              //   type="mypage-review"
              //   title={data?.place?.name}
              //   subTitle={getAddressInfo(data?.place)}
              // />
              // {type === "recommand-best" ? (
              //   <CountWrapper action={recommendReview.includes(data?.id)}>
              //     {recommendReview.indexOf(data?.id) !== -1
              //       ? recommendReview.indexOf(data?.id) + 1
              //       : ""}
              //   </CountWrapper>
              // ) : null} */}
              // </ReviewInner>
            );
          })}
        {isShowToast && (
          <Toast message="3개까지만 선택 가능해요" close={closeToast} />
        )}
        <Box ref={scrollRef} style={{ height: hasNextPage ? 30 : 0 }}></Box>
      </Flex>
      <Space h={20} />
    </>
  );
}

const CountWrapper = styled.div<{ action: boolean }>`
  width: 20px;
  height: 20px;

  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 999px;
  border: 2px solid ${({ action }) => (action ? colors.Orange400 : colors.N40)};
  background-color: ${({ action }) =>
    action ? colors.Orange400 : `transparent`};
  z-index: 700;

  ${typography.Headline2}
  color: ${colors.N0};
`;
