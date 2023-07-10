import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ArrowLeft } from "components/Icon/Arrow";
import { colors } from "constants/colors";
import Button from "components/Button/Button";
import Spacing from "components/Spacing/Spacing";
import { typography } from "constants/typography";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeAuthState } from "reducer/slices/auth/authSlice";
import { tasteData } from "data/tasteData";
import { PostTerms, PutTaste } from "api/auth";

const TastePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClickBackBtn = () => {
    router.back();
  };
  const { accessToken, favoriteFoodCategories, terms } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(
      changeAuthState({
        type: "favoriteFoodCategories",
        value: [],
      })
    );
  }, [dispatch]);

  const handleClickTaste = (food: string) => {
    if (favoriteFoodCategories.includes(food)) {
      const tmpFood = favoriteFoodCategories.filter(
        (taste: string) => taste !== food
      );
      dispatch(
        changeAuthState({
          type: "favoriteFoodCategories",
          value: tmpFood,
        })
      );
    } else {
      dispatch(
        changeAuthState({
          type: "favoriteFoodCategories",
          value: [...favoriteFoodCategories, food],
        })
      );
    }
  };

  const handleClickStart = () => {
    PostTerms(accessToken, terms);
    PutTaste(accessToken, favoriteFoodCategories);
    router.push("/");
  };

  return (
    <TasteWrapper>
      <TopWrapper>
        <div onClick={handleClickBackBtn}>
          <ArrowLeft />
        </div>
      </TopWrapper>
      <MainWrapper>
        <Spacing size={30} />
        <span style={typography.Headline6}>좋아하는 음식을 알려주세요</span>
        <Spacing size={30} />
        <TasteButtonContainer>
          {tasteData.map((taste) => (
            <TasteButton
              key={taste.val}
              onClick={() => handleClickTaste(taste.val)}
              clicked={favoriteFoodCategories.includes(taste.val)}
            >
              <taste.icon />
              <span>{taste.val}</span>
            </TasteButton>
          ))}
        </TasteButtonContainer>
      </MainWrapper>
      <ButtonWrapper>
        <Button
          text="잇터리 시작하기"
          radius={8}
          backgroundColor={
            favoriteFoodCategories.length > 0 ? colors.Orange500 : colors.Orange200
          }
          color={colors.N0}
          height="56px"
          disabled={favoriteFoodCategories.length > 0 ? false : true}
          onClick={handleClickStart}
        />
      </ButtonWrapper>
    </TasteWrapper>
  );
};

const TasteWrapper = styled.div``;
const TopWrapper = styled.div`
  padding: 30px 20px 0;
`;
const MainWrapper = styled.div`
  padding: 0 20px;
`;
const TasteButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const TasteButton = styled.div<{ clicked: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 10px 14px 10px 12px;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ clicked }) => (clicked ? colors.Orange400 : colors.N20)};
  background-color: ${({ clicked }) => (clicked ? colors.Orange400 : colors.N0)};
  border-radius: 999px;

  span {
    ${typography.Paragraph4}
    color: ${({ clicked }) => (clicked ? colors.N0 : colors.N80)};
  }
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 50px;
`;
export default TastePage;
