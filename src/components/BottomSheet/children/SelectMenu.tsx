import styled from "@emotion/styled";
import RoundButton from "components/Button/RoundButton";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import useGetMenus from "hooks/queries/review/useGetMenus";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import React from "react";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import { FoodType } from "types/review";

const SelectMenu = () => {
  const dispatch = useAppDispatch();

  const { data } = useGetMenus();
  const { foodInfo } = useAppSelector((state) => state.review);
  const handleClickFood = (foodName: string) => {
    if (foodInfo.map((item: FoodType) => item.foodName).includes(foodName)) {
      dispatch(
        changeReviewInfo({
          type: "foodInfo",
          value: foodInfo.filter((e: FoodType) => e.foodName !== foodName),
        })
      );
    } else {
      dispatch(
        changeReviewInfo({
          type: "foodInfo",
          value: [...foodInfo, { foodName: foodName, foodKeyword: [] }],
        })
      );
    }
  };
  return (
    <SelectMenuWrapper>
      <MenuContainer>
        {data
          ? data.menus.map((menu: string) => (
              <RoundButton
                key={menu}
                type="text"
                text={menu}
                radius="8px"
                act={foodInfo.map((item: FoodType) => item.foodName).includes(menu)}
                height={46}
                onClick={() => handleClickFood(menu)}
              />
            ))
          : null}
      </MenuContainer>
      <div
        style={{
          ...typography.Paragraph3,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p style={{ color: colors.N60 }}>찾는 메뉴가 없다면?</p>
        <p style={{ color: colors.Orange600, textDecoration: "underline" }}>
          직접 등록하기
        </p>
      </div>
    </SelectMenuWrapper>
  );
};

const SelectMenuWrapper = styled.div`
  padding: 29px 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  p {
    margin: 0;
  }
`;

const MenuContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-bottom: 57px;
`;
export default SelectMenu;
