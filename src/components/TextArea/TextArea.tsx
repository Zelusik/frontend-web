import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";

export default function TextArea({ size, text, placeholder, onChange }: any) {
  return (
    <>
      <TextAreaWrapper placeholder={placeholder} size={size} onChange={onChange} />
      <Spacing size={12} />
      <BoxText>{text}</BoxText>
    </>
  );
}

const TextAreaWrapper = styled.textarea<{ size: number }>`
  width: 100%;
  height: ${({ size }) => size}px;
  padding: 13px 14px;

  border-radius: 12px;
  border: 1px solid ${colors.N40};
  background-color: ${colors.N10};
  resize: none;
`;

const BoxText = styled.div`
  ${css`
    ${typography.Paragraph1}
  `}
  color: ${colors.N80};
`;
