/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { colors } from "constants/colors";
import BottomButton from "components/Button/BottomButton";
import BackTitle from "components/Title/BackTitle";
import { useRouter } from "next/router";
import { Route } from "constants/Route";
import RoundButton from "components/Button/RoundButton";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import Spacing from "components/Spacing/Spacing";
import useGetMenuKeywords from "hooks/queries/review/useGetMenuKeywords";
import { FoodType } from "types/review";
import useToast from "hooks/useToast";
import Toast from "components/Toast/Toast";
import useGetAutoReview from "hooks/queries/review/useGetAutoReview";
import ReviewLoading from "../components/ReviewLoading";
import useGetMyInfo from "hooks/queries/user/useGetMyInfo";
import LoadingDots from "components/Loading/LoadingDots";

const FoodKeyword = () => {
  const route = useRouter();
  const { data: userInfo } = useGetMyInfo();
  const dispatch = useAppDispatch();

  const { placeInfo } = useAppSelector((state) => state.review);
  const { keywords, foodInfo } = useAppSelector((state) => state.review);
  const { isShowToast, openToast, closeToast } = useToast();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isRouteTransition, setIsRouteTransition] = useState(false);

  const handleCloseToast = () => {
    closeToast();
  };

  const { data, isLoading: foodKeywordLoading } = useGetMenuKeywords({
    placeCategory: placeInfo.categoryName,
    menus: foodInfo.map((e: FoodType) => e.foodName.replace(",", "")),
  });

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

  const handleClickKeywords = ({
    food,
    keyword,
  }: {
    food: string;
    keyword: string;
  }) => {
    let targetFood = { ...foodInfo.find((e: FoodType) => e.foodName === food) };

    if (!targetFood) {
      return;
    }

    if (!targetFood.foodKeyword.includes(keyword)) {
      if (targetFood.foodKeyword.length >= 3) {
        openToast();
      } else {
        targetFood.foodKeyword = [...targetFood.foodKeyword, keyword];
      }
    } else {
      targetFood.foodKeyword = targetFood.foodKeyword.filter(
        (e: string) => e !== keyword
      );
    }
    dispatch(
      changeReviewInfo({
        type: "foodInfo",
        value: foodInfo.map((e: FoodType) => (e.foodName === food ? targetFood : e)),
      })
    );
  };

  const handleClickAIBtn = () => {
    setIsButtonClicked(true);
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
    <FoodKeywordWrapper>
      {isLoading || isRouteTransition ? (
        <ReviewLoading type="auto" nickname={userInfo?.nickname} />
      ) : (
        <>
          {foodKeywordLoading ? (
            <div className="icon">
              <LoadingDots />
            </div>
          ) : (
            <>
              <BackTitle type="black-left-text" text="식사 리뷰" />
              <Spacing size={20} />

              <MainWrapper>
                <div style={typography.Headline5}>맛은 어떠셨나요?</div>
                <KeywordContainer>
                  {data ? (
                    <>
                      {data.menuKeywords.map(
                        (
                          menuInfo: { menu: string; keywords: string[] },
                          index: number
                        ) => (
                          <KeywordBox key={index}>
                            <span style={typography.Headline2}>{menuInfo.menu}</span>
                            <div className="keywords">
                              {menuInfo.keywords.map((keyword) => (
                                <RoundButton
                                  key={keyword}
                                  borderRadius="12px"
                                  type="text"
                                  height={38}
                                  action={foodInfo
                                    .filter(
                                      (e: FoodType) => e.foodName === menuInfo.menu
                                    )[0]
                                    .foodKeyword.includes(keyword)}
                                  onClick={() =>
                                    handleClickKeywords({
                                      food: menuInfo.menu,
                                      keyword,
                                    })
                                  }
                                >
                                  {keyword}
                                </RoundButton>
                              ))}
                            </div>
                          </KeywordBox>
                        )
                      )}
                    </>
                  ) : null}
                </KeywordContainer>
              </MainWrapper>
              <BottomWrapper>
                <span style={{ ...typography.Paragraph1, color: colors.N80 }}>
                  1-3개 선택할 수 있어요
                </span>
                <BottomButton
                  text="AI 도움받기"
                  radius={8}
                  backgroundColor={colors.Orange400}
                  color={colors.N0}
                  height="54px"
                  onClick={handleClickAIBtn}
                  disabled={foodInfo.flatMap((e: any) => e.foodKeyword).length === 0}
                />
                <ReviewButton
                  onClick={handleClickSelfBtn}
                  disabled={foodInfo.flatMap((e: any) => e.foodKeyword).length === 0}
                >
                  직접 리뷰쓰기
                </ReviewButton>
              </BottomWrapper>
              {isShowToast && (
                <Toast message="3개까지만 선택 가능해요" close={handleCloseToast} />
              )}
            </>
          )}
        </>
      )}
    </FoodKeywordWrapper>
  );
};

const FoodKeywordWrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 0 20px;

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
`;

const MainWrapper = styled.div`
  height: 70%;
  overflow-y: scroll;
`;

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

export default FoodKeyword;
