import styled from "@emotion/styled";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Toast from "components/Toast/Toast";
import { colors } from "constants/colors";
import { Route } from "constants/Route";
import { typography } from "constants/typography";
import useGetMyReviews from "hooks/queries/user/useGetMyReviews";
import useDisplaySize from "hooks/useDisplaySize";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useRef } from "react";
import { changeRecommendReview } from "reducer/slices/review/recommendReviewSlice";

export default function ReviewList({ type = "mypage" }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { width } = useDisplaySize();
  const recommendReview = useAppSelector((state) => state.recommendReview);
  const { data: myreview, fetchNextPage, hasNextPage } = useGetMyReviews();
  const scrollRef = useRef(null);

  const { isShowToast, openToast, closeToast } = useToast();

  useIntersectionObserver(scrollRef, fetchNextPage, !!hasNextPage, {});

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
    <ReviewWrapper>
      {myreview &&
        myreview
          .flatMap((review_data) => review_data?.contents)
          .map((data: any) => {
            return (
              <ReviewInner
                key={data?.id}
                width={(width - 46) / 2}
                onClick={() => clickReview(data?.id)}
              >
                <Image
                  alt="리뷰 사진"
                  src={
                    data?.images
                      ? data?.images[0].thumbnailUrl
                      : "https://i.ibb.co/2kSZX6Y/60pt.png"
                  }
                  type="mypage-review"
                />
                <StoreTitle
                  type="mypage-review"
                  title={data?.place?.name || "소이연남"}
                  subTitle={
                    data?.place
                      ? `${data?.place?.address?.sido} ${data?.place?.address?.sgg}`
                      : "음식 카테고리 지역"
                  }
                />
                {type === "recommand-best" ? (
                  <CountWrapper action={recommendReview.includes(data?.id)}>
                    {recommendReview.indexOf(data?.id) !== -1
                      ? recommendReview.indexOf(data?.id) + 1
                      : ""}
                  </CountWrapper>
                ) : null}
              </ReviewInner>
            );
          })}
      {isShowToast && <Toast message="3개까지만 선택 가능해요" close={closeToast} />}
      <div ref={scrollRef} style={{ height: hasNextPage ? "30px" : "0px" }}></div>
    </ReviewWrapper>
  );
}

const ReviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ReviewInner = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  height: ${({ width }) => Math.floor((width * 170) / 157)}px;
  position: relative;
`;

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
  background-color: ${({ action }) => (action ? colors.Orange400 : `transparent`)};
  z-index: 700;

  ${typography.Headline2}
  color: ${colors.N0};
`;
