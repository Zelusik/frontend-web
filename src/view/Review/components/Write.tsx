import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";

import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { colors } from "constants/colors";
import BottomButton from "components/Button/BottomButton";

import BackTitle from "components/Title/BackTitle";
import { useRouter } from "next/router";
import TextArea from "components/TextArea/TextArea";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";

import { Route } from "constants/Route";
import ReviewLoading from "./ReviewLoading";
import { editReview, postReview } from "api/reviews";
import useGetMyInfo from "hooks/queries/user/useGetMyInfo";
import Gradient from "components/Common/Gradient";
import useDisplaySize from "hooks/useDisplaySize";
import { Space } from "components/core";

const Write = () => {
  const route = useRouter();
  const { height } = useDisplaySize();

  const { data } = useGetMyInfo();
  const dispatch = useAppDispatch();
  const review = useAppSelector((state) => state.review);
  const [textAreaHeight, setTextAreaHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRoute, setShouldRoute] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTextAreaHeight(window.innerHeight * 0.5);
    }
  }, []);

  const handleChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeReviewInfo({
        type: "content",
        value: e.target.value,
      })
    );
  };

  const handleClickUploadBtn = async () => {
    setIsLoading(true);
    if (localStorage.getItem("state") === "edit-review") {
      const result = await editReview({
        reviewId: review.reviewId,
        content: review.content,
      });
      if (!result.status) {
        setShouldRoute(true);
        localStorage.removeItem("state");
      }
    } else {
      const result = await postReview(review);
      if (!result.status) {
        setShouldRoute(true);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (shouldRoute) {
      route.push(Route.MYPAGE());
    }
  }, [shouldRoute]);

  return (
    <Wrapper height={height}>
      {isLoading || shouldRoute ? (
        <ReviewLoading type="review" nickname={data?.nickname} />
      ) : (
        <>
          <div style={{ padding: "0 20px" }}>
            <BackTitle type="black-left-text" text="리뷰 작성" />
          </div>
          <Space h={20} />
          <Gradient size={30} />
          <MainWrapper>
            <div style={typography.Headline5}>
              {route.query.state === "self"
                ? "리뷰를 작성해 주세요."
                : "리뷰를 남겨주세요."}
            </div>
            <Space h={20} />
            <div style={{ position: "relative" }}>
              <TextArea
                size={textAreaHeight}
                placeholder="음식점에서의 경험이나 정보를 자세히 작성해주세요!"
                onChange={handleChangeReview}
                borderColor={colors.N10}
                value={review.content}
                maxLength={400}
              />
              <TextCount>{review.content.length}/400</TextCount>
            </div>
            {route.query.state === "AI" && (
              <div className="AI">
                <Space h={10} />
                <p style={{ color: colors.Orange600 }}>
                  {`*${data?.nickname}*님의 리뷰를 AI가 글로 바꿔드렸어요.`}
                </p>
                <p style={{ color: colors.N80 }}>
                  수정과 추가를 통해 의견을 더할 수 있어요.
                </p>
              </div>
            )}
          </MainWrapper>

          <BottomWrapper>
            <BottomButton
              text="업로드하기"
              radius={8}
              backgroundColor={colors.Orange400}
              color={colors.N0}
              height="54px"
              onClick={handleClickUploadBtn}
              disabled={!review.content}
            />
          </BottomWrapper>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  position: relative;
`;

const MainWrapper = styled.div`
  padding: 0 20px;
  .AI {
    ${typography.Paragraph2};
    p {
      margin: 0;
    }
  }
`;

const TextCount = styled.div`
  ${typography.Paragraph2};
  color: ${colors.Orange600};
  position: absolute;
  bottom: 25px;
  right: 10px;
`;
const BottomWrapper = styled.div`
  width: 100%;
  padding: 0 21px;
  padding-bottom: 40px;

  gap: 8px;
  position: fixed;
  bottom: 0;

  background-color: ${colors["N0"]};
  z-index: 800;
`;

export default Write;
