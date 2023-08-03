import React from "react";
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
import useModal from "hooks/useModal";
import Toast from "components/Toast/Toast";

const Keyword = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const {
    isShowModal: isToast,
    openModal: openToast,
    closeModal: closeToast,
  } = useModal();

  const handleCloseToast = () => {
    closeToast();
  };

  const { keywords, foodInfo } = useAppSelector((state) => state.review);

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
      route.push({ pathname: Route.REVIEW_WRITE(), query: { state: "AI" } });
    } else {
      route.push(Route.REVIEW_FOOD_KEYWORD());
    }
  };

  const handleClickSelfBtn = () => {
    route.push({ pathname: Route.REVIEW_WRITE(), query: { state: "self" } });
  };
  return (
    <KeywordWrapper>
      <BackTitle type="secondary" text="음식점 리뷰" />
      <Spacing size={20} />
      <MainWrapper>
        <div style={typography.Headline5}>음식점은 어떠셨나요?</div>
        <KeywordContainer>
          <KeywordBox>
            <span style={typography.Headline2}>음식/가격</span>
            <div className="keywords">
              {foodKeyword.map((keyword) => (
                <RoundButton
                  key={keyword}
                  borderRadius="12px"
                  type="text"
                  action={keywords.includes(keyword)}
                  height={38}
                  onClick={() => handleClickKeywords(keyword)}
                >
                  {keyword}
                </RoundButton>
              ))}
            </div>
          </KeywordBox>
          <KeywordBox>
            <span style={typography.Headline2}>분위기</span>
            <div className="keywords">
              {atmosphereKeyword.map((keyword) => (
                <RoundButton
                  key={keyword}
                  borderRadius="12px"
                  type="text"
                  action={keywords.includes(keyword)}
                  height={38}
                  onClick={() => handleClickKeywords(keyword)}
                >
                  {keyword}
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
        <ReviewButton onClick={handleClickSelfBtn}>직접 리뷰쓰기</ReviewButton>
      </BottomWrapper>
      {isToast && (
        <Toast message="3개까지만 선택 가능해요" close={handleCloseToast} />
      )}
    </KeywordWrapper>
  );
};

const KeywordWrapper = styled.div`
  height: 100%;
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

const ReviewButton = styled.div`
  ${typography.Paragraph5};
  color: ${colors.N60};
  margin-top: 8px;
`;

export default Keyword;
