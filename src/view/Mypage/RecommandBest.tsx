import styled from "@emotion/styled";
import BottomButton from "components/Button/BottomButton";
import Gradient from "components/Common/Gradient";

import Text from "components/core/Text";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import useDisplaySize from "hooks/useDisplaySize";
import ReviewList from "./components/ReviewList";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { initializeRecommendReview } from "reducer/slices/review/recommendReviewSlice";
import { useRouter } from "next/router";
import {
  postRecommendReviews,
  updateRecommendReviews,
} from "api/recommend-reviews";
import useGetMembersReviews from "hooks/queries/user/useGetReviews";
import { Space } from "components/core";

export default function RecommandBest() {
  const router = useRouter();
  const { height } = useDisplaySize();
  const dispatch = useAppDispatch();
  const recommendReview = useAppSelector((state) => state.recommendReview);
  const { reviewDatas, fetchNextPage, hasNextPage } = useGetMembersReviews();

  const handleClickStore = async () => {
    const recommendReviews = recommendReview.map(
      (reviewId: any, index: any) => ({
        reviewId: reviewId,
        ranking: index + 1,
      })
    );

    if (localStorage.getItem("state") === "postRecommendReview") {
      // 등록
      for (const reviewData of recommendReviews) {
        await postRecommendReviews(reviewData);
      }
    } else {
      // 수정
      await updateRecommendReviews(recommendReviews);
    }
    dispatch(initializeRecommendReview());
    localStorage.removeItem("state");
    router.back();
  };
  return (
    <>
      <TitleWrapper>
        <BackTitle type="black-x-button" text="추천 베스트 수정하기" />
        <Space h={20} />
        <Text typo="Headline5">
          추천 베스트 3를
          <br />
          선택해주세요!
        </Text>
        <Space h={20} />
      </TitleWrapper>
      <Space h={146} />

      <RecommandBestWrapper height={height - 240}>
        <ReviewList
          type="recommand-best"
          membersReviews={reviewDatas && reviewDatas}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
        <Space h={30} />
      </RecommandBestWrapper>

      <Gradient size={30} />
      <ButtonWrapper>
        <BottomButton
          type="default"
          onClick={() => dispatch(initializeRecommendReview())}
          disabled={false}
        >
          초기화
        </BottomButton>
        <BottomButton
          type="primary"
          onClick={handleClickStore}
          disabled={recommendReview.length !== 3}
        >
          저장하기
        </BottomButton>
      </ButtonWrapper>
    </>
  );
}

const RecommandBestWrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  padding: 0 20px;
  overflow-y: scroll;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 0 20px;

  position: fixed;
  top: 0;
  z-index: 800;
  background-color: ${colors.N0};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 94px;
  padding: 0 17.5px;

  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 0;
  z-index: 800;
  background-color: ${colors.N0};
`;
