import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";

export default function TextArea({
  size,
  text,
  placeholder,
  onChange,
  borderColor,
}: any) {
  return (
    <>
      <TextAreaWrapper
        placeholder={placeholder}
        size={size}
        onChange={onChange}
        borderColor={borderColor}
      />
      <Spacing size={12} />
      <BoxText>{text}</BoxText>
    </>
  );
}

const TextAreaWrapper = styled.textarea<{ size: number; borderColor?: string }>`
  width: 100%;
  height: ${({ size }) => size}px;
  padding: 13px 14px;

  border-radius: 12px;
  border: 1px solid ${({ borderColor }) => (borderColor ? borderColor : colors.N40)};
  background-color: ${colors.N10};
  resize: none;
`;

const BoxText = styled.div`
  ${css`
    ${typography.Paragraph1}
  `}
  color: ${colors.N80};
`;
