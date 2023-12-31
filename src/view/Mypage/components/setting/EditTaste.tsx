import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { colors } from "constants/colors";

import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";

import BottomButton from "components/Button/BottomButton";
import RoundButton from "components/Button/RoundButton";
import BackTitle from "components/Title/BackTitle";
import { tasteDatas } from "constants/globalData";
import useGetMyInfo from "hooks/queries/user/useGetMyInfo";
import { changeUserInfo } from "reducer/slices/user/userSlice";
import { putTaste } from "api/members";
import { Space } from "components/core";
import { typography } from "constants/typography";

const EditTaste = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data } = useGetMyInfo();
  const { favoriteFoodCategories } = useAppSelector((state) => state.user);

  const handleClickTaste = (food: string) => {
    if (favoriteFoodCategories.includes(food)) {
      const tmpFood = favoriteFoodCategories.filter(
        (taste: string) => taste !== food
      );
      dispatch(
        changeUserInfo({
          type: "favoriteFoodCategories",
          value: tmpFood,
        })
      );
    } else {
      dispatch(
        changeUserInfo({
          type: "favoriteFoodCategories",
          value: [...favoriteFoodCategories, food],
        })
      );
    }
  };

  const handleClickEdit = async () => {
    const tasteRes = await putTaste(null, favoriteFoodCategories);
    if (!tasteRes.status) {
      router.back();
    }
  };

  return (
    <TasteWrapper>
      <TopWrapper>
        <BackTitle type="black-left-text" text="" />
      </TopWrapper>
      <MainWrapper>
        <Space h={30} />
        <span style={typography["Headline6"]}>좋아하는 음식을 알려주세요</span>
        <Space h={30} />
        <TasteButtonContainer>
          {tasteDatas.map((taste) => (
            <RoundButton
              key={taste.val}
              type="taste"
              action={favoriteFoodCategories.includes(taste.name)}
              onClick={() => handleClickTaste(taste.name)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <taste.icon /> {taste.val}
              </div>
            </RoundButton>
          ))}
        </TasteButtonContainer>
      </MainWrapper>
      <ButtonWrapper>
        <BottomButton
          text="수정하기"
          radius={8}
          backgroundColor={
            favoriteFoodCategories.length > 0
              ? colors.Orange500
              : colors.Orange200
          }
          color={colors.N0}
          height="56px"
          disabled={
            String(data?.favoriteFoodCategories.map((e: any) => e.value)) ===
            String(favoriteFoodCategories)
          }
          onClick={handleClickEdit}
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

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 50px;
`;
export default EditTaste;
