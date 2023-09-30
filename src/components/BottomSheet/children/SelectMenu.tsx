import React, { useState } from "react";
import styled from "@emotion/styled";
import RoundButton from "components/Button/RoundButton";
import Toast from "components/Toast/Toast";
import { colors } from "constants/colors";
import { typography } from "constants/typo";
import useGetMenus from "hooks/queries/review/useGetMenus";
import useDisplaySize from "hooks/useDisplaySize";

import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeVisible } from "reducer/slices/bottomSheet/bottomSheetSlice";
import { appendMenuTag } from "reducer/slices/image/imageSlice";
import { MenuTagType } from "types/image";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";
import useToast from "hooks/useToast";
import { FoodType } from "types/review";
import LoadingDots from "components/Loading/LoadingDots";
import useBottomSheet from "hooks/useBottomSheet";

const SelectMenu = () => {
  const dispatch = useAppDispatch();
  const { height } = useDisplaySize();
  const isEnabled = true;

  const { data, isLoading } = useGetMenus(isEnabled);
  const { isShowToast, openToast, closeToast } = useToast();

  const handleCloseToast = () => {
    closeToast();
  };

  const image = useAppSelector((state) => state.image);
  const { currentIndex } = useAppSelector((state) => state.currIdx);
  const menuTag = useAppSelector((state) => state.menuTag);
  const { foodInfo } = useAppSelector((state) => state.review);
  const [clickedMenu, setClickedMenu] = useState("");
  const { openBottomSheet } = useBottomSheet({});

  const handleClickFood = (foodName: string) => {
    setClickedMenu(foodName);

    if (foodInfo.map((e: FoodType) => e.foodName).includes(foodName)) {
    } else {
      dispatch(
        changeReviewInfo({
          type: "foodInfo",
          value: [...foodInfo, { foodName: foodName, foodKeyword: [] }],
        })
      );
    }

    if (image[currentIndex].menuTag) {
      if (
        image[currentIndex].menuTag
          .map((tagInfo: MenuTagType) => tagInfo.menu)
          .includes(foodName)
      ) {
        openToast();
        setTimeout(() => {
          setClickedMenu("");
        }, 1000);
      } else {
        dispatch(
          appendMenuTag({
            index: currentIndex,
            menuTag: { ...menuTag, menu: foodName },
          })
        );
        setTimeout(() => {
          dispatch(
            changeVisible({
              type: "bottomSheet",
              value: 0,
            })
          );
        }, 300);
      }
    } else {
      dispatch(
        appendMenuTag({
          index: currentIndex,
          menuTag: { ...menuTag, menu: foodName },
        })
      );
      setTimeout(() => {
        dispatch(
          changeVisible({
            type: "bottomSheet",
            value: 0,
          })
        );
      }, 300);
    }
  };

  const handleClickRegisterMenu = () => {
    dispatch(
      changeVisible({
        type: "bottomSheet",
        value: 0,
      })
    );
    openBottomSheet("registerMenu");
  };

  return (
    <SelectMenuWrapper height={height} isLoading={isLoading}>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <MenuContainer>
            {data
              ? data.menus.map((menu: string) => (
                  <RoundButton
                    key={menu}
                    borderRadius="8px"
                    type="text"
                    action={clickedMenu === menu}
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
              gap: "4px",
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
          {isShowToast && (
            <Toast message="이미 선택한 메뉴입니다" close={handleCloseToast} />
          )}
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
  overflow-y: auto;
`;
export default SelectMenu;
