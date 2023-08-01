import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

export default function RecommandButton({ text }: any) {
  return (
    <ButtonWrapper>
      <Menu>추천 베스트 {text}하기</Menu>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  height: 48px;
  margin: auto;
  padding: 0 18.5px;

  display: flex;
  border-radius: 999px;
  background-color: ${colors.Orange600};
`;

const Menu = styled.div`
  margin: auto;
  display: flex;

  ${css`
    ${typography.Paragraph5}
  `}
  color: ${colors.N0};
`;
