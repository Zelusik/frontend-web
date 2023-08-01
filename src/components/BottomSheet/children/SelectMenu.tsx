import styled from "@emotion/styled";
import RoundButton from "components/Button/RoundButton";
import Icon from "components/Icon/Icon";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import useGetMenus from "hooks/queries/review/useGetMenus";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import React from "react";
import {
  changeVisible,
  changeVisibleType,
} from "reducer/slices/bottomSheet/bottomSheetSlice";
import { appendMenuTag } from "reducer/slices/image/imageSlice";

import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import { FoodType } from "types/review";

const SelectMenu = () => {
  const dispatch = useAppDispatch();
  const { height } = useDisplaySize();
  const { data, isLoading } = useGetMenus();

  const { foodInfo } = useAppSelector((state) => state.review);
  const { currentIndex } = useAppSelector((state) => state.currIdx);
  const menuTag = useAppSelector((state) => state.menuTag);

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

    dispatch(
      appendMenuTag({
        index: currentIndex,
        menuTag: { ...menuTag, menu: foodName },
      })
    );
  };

  const handleClickRegisterMenu = () => {
    dispatch(
      changeVisible({
        type: "bottomSheet",
        value: 0,
      })
    );
    dispatch(
      changeVisibleType({
        type: "bottomSheet",
        value: [1, "registerMenu"],
      })
    );
  };

  return (
    <SelectMenuWrapper height={height} isLoading={isLoading}>
      {isLoading ? (
        <Icon icon="Loading" />
      ) : (
        <>
          <MenuContainer>
            {data
              ? data.menus.map((menu: string) => (
                  <RoundButton
                    key={menu}
                    borderRadius="8px"
                    type="text"
                    action={foodInfo
                      .map((item: FoodType) => item.foodName)
                      .includes(menu)}
                    height={46}
                    onClick={() => handleClickFood(menu)}
                  >
                    {menu}
                  </RoundButton>
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
            <p
              style={{ color: colors.Orange600, textDecoration: "underline" }}
              onClick={handleClickRegisterMenu}
            >
              직접 등록하기
            </p>
          </div>
        </>
      )}
    </SelectMenuWrapper>
  );
};

const SelectMenuWrapper = styled.div<{ height: number; isLoading: boolean }>`
  padding: 29px 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: ${({ isLoading }) => (isLoading ? "center" : "flex-start")};
  p {
    margin: 0;
  }
  height: ${({ height }) => height * 0.8}px;
`;

const MenuContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-bottom: 57px;
`;
export default SelectMenu;
