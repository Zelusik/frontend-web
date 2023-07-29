import React from "react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

const RegisterMenu = () => {
  return (
    <RegisterMenuWrapper>
      <Input type="text" placeholder="메뉴명을 입력하세요" />
    </RegisterMenuWrapper>
  );
};

const RegisterMenuWrapper = styled.div``;
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
