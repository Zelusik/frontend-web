import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { appendMenuTag } from "reducer/slices/image/imageSlice";
import { changeVisible } from "reducer/slices/bottomSheet/bottomSheetSlice";
import { patchMenu } from "api/review/menu";
import useGetMenus from "hooks/queries/review/useGetMenus";

const RegisterMenu = () => {
  const { refetch } = useGetMenus();

  const [menu, setMenu] = useState("");
  const { currentIndex } = useAppSelector((state) => state.currIdx);
  const menuTag = useAppSelector((state) => state.menuTag);
  const { placeId } = useAppSelector((state) => state.review);
  const dispatch = useAppDispatch();

  const handleChangeMenu = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenu(event.target.value);
  };
  const handleRegisterMenu = async (event: any) => {
    event.preventDefault();
    const result = await patchMenu(placeId, menu);
    if (result.status) {
    } else {
      // 메뉴 등록 api 성공 시 dispatch
      dispatch(
        appendMenuTag({
          index: currentIndex,
          menuTag: { ...menuTag, menu: menu },
        })
      );
      setMenu("");
      dispatch(
        changeVisible({
          type: "bottomSheet",
          value: 0,
        })
      );
      refetch();
    }
  };

  return (
    <RegisterMenuWrapper onSubmit={handleRegisterMenu}>
      <Input
        type="text"
        placeholder="메뉴명을 입력해주세요"
        value={menu}
        onChange={handleChangeMenu}
      />
    </RegisterMenuWrapper>
  );
};

const RegisterMenuWrapper = styled.form``;
const Input = styled.input`
  border-radius: 8px;
  background-color: ${colors.N10};
  padding: 12px;
  outline: none;
  border: none;
  width: 100%;
  margin-bottom: 16px;
`;
export default RegisterMenu;
