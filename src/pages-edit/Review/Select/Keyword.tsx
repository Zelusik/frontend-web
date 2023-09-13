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
import { Route } from "constants/Route";
import { atmosphereKeyword, foodKeyword } from "data/keywordData";
import RoundButton from "components/Button/RoundButton";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import Spacing from "components/Spacing/Spacing";
import Toast from "components/Toast/Toast";
import useToast from "hooks/useToast";
import useGetAutoReview from "hooks/queries/review/useGetAutoReview";
import ReviewLoading from "../components/ReviewLoading";
import useGetMyInfo from "hooks/queries/user/useGetMyInfo";

const Keyword = () => {
  const route = useRouter();
  const { data: userInfo } = useGetMyInfo();
  const dispatch = useAppDispatch();
  const { isShowToast, openToast, closeToast } = useToast();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isRouteTransition, setIsRouteTransition] = useState(false);

  const { keywords, foodInfo } = useAppSelector((state) => state.review);
  const { isLoading } = useGetAutoReview(isButtonClicked);

  useEffect(() => {
    if (isButtonClicked && !isLoading) {
      setIsRouteTransition(true);
    }
  }, [isLoading, isButtonClicked]);

  useEffect(() => {
    if (isRouteTransition) {
      route.push({ pathname: Route.REVIEW_WRITE(), query: { state: "AI" } });
    }
  }, [isRouteTransition]);

  const handleCloseToast = () => {
    closeToast();
  };

  const handleClickKeywords = (keyword: string) => {
    if (keywords.length >= 3) {
      if (keywords.includes(keyword)) {
        dispatch(
          changeReviewInfo({
            type: "keywords",
            value: keywords.filter((e: string) => e !== keyword),
          })
        );
      } else {
        openToast();
      }
    } else {
      if (keywords.includes(keyword)) {
        dispatch(
          changeReviewInfo({
            type: "keywords",
            value: keywords.filter((e: string) => e !== keyword),
          })
        );
      } else {
        dispatch(
          changeReviewInfo({
            type: "keywords",
            value: [...keywords, keyword],
          })
        );
      }
    }
  };

  const handleClickNextBtn = () => {
    if (foodInfo.length === 0) {
      setIsButtonClicked(true);
    } else {
      route.push(Route.REVIEW_FOOD_KEYWORD());
    }
  };

  const handleClickSelfBtn = () => {
    dispatch(
      changeReviewInfo({
        type: "autoCreatedContent",
        value: "",
      })
    );
    dispatch(
      changeReviewInfo({
        type: "content",
        value: "",
      })
    );
    route.push({ pathname: Route.REVIEW_WRITE(), query: { state: "self" } });
  };

  return (
    <KeywordWrapper>
      {isLoading || isRouteTransition ? (
        <ReviewLoading type="auto" nickname={userInfo?.nickname} />
      ) : (
        <>
          <BackTitle type="black-left-text" text="음식점 리뷰" />
          <Spacing size={20} />
          <MainWrapper>
            <div style={typography.Headline5}>음식점은 어떠셨나요?</div>
            <KeywordContainer>
              <KeywordBox>
                <span style={typography.Headline2}>음식/가격</span>
                <div className="keywords">
                  {foodKeyword.map((keyword) => (
                    <RoundButton
                      key={keyword.text}
                      borderRadius="12px"
                      type="text"
                      action={keywords.includes(keyword.value)}
                      height={38}
                      onClick={() => handleClickKeywords(keyword.value)}
                    >
                      {keyword.text}
                    </RoundButton>
                  ))}
                </div>
              </KeywordBox>
              <KeywordBox>
                <span style={typography.Headline2}>분위기</span>
                <div className="keywords">
                  {atmosphereKeyword.map((keyword) => (
                    <RoundButton
                      key={keyword.text}
                      borderRadius="12px"
                      type="text"
                      action={keywords.includes(keyword.value)}
                      height={38}
                      onClick={() => handleClickKeywords(keyword.value)}
                    >
                      {keyword.text}
                    </RoundButton>
                  ))}
                </div>
              </KeywordBox>
            </KeywordContainer>
          </MainWrapper>

          <BottomWrapper>
            <span style={{ ...typography.Paragraph1, color: colors.N80 }}>
              1-3개 선택할 수 있어요
            </span>
            <BottomButton
              text={foodInfo.length === 0 ? "AI 도움받기" : "다음으로"}
              radius={8}
              backgroundColor={colors.Orange400}
              color={colors.N0}
              height="54px"
              onClick={handleClickNextBtn}
              disabled={keywords.length === 0}
            />
            <ReviewButton
              onClick={handleClickSelfBtn}
              disabled={keywords.length === 0}
            >
              직접 리뷰쓰기
            </ReviewButton>
          </BottomWrapper>
          {isShowToast && (
            <Toast message="3개까지만 선택 가능해요" close={handleCloseToast} />
          )}
        </>
      )}
    </KeywordWrapper>
  );
};

const KeywordWrapper = styled.div`
  height: 100vh;
  padding: 0 20px;
`;

const MainWrapper = styled.div``;

const KeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const KeywordBox = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .keywords {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  margin-bottom: 40px;
`;

const ReviewButton = styled.button`
  ${typography.Paragraph5};
  color: ${colors.N60};
  margin-top: 8px;
  width: 100%;
`;

export default Keyword;
