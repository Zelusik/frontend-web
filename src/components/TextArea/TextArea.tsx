import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { typography } from "constants/typography";
import { colors } from "constants/colors";

import Text from "components/Text/Text";
import Spacing from "components/Spacing";

export default function TextArea({
  size,
  placeholder,
  value,
  text,
  onChange,
}: any) {
  return (
    <>
      <TextAreaBox
        placeholder={placeholder}
        value={value}
        size={size}
        onChange={onChange}
      />
      <Spacing size={12} />
      <Text typo="Paragraph1" color="N80">
        {text}
      </Text>
    </>
  );
}

const TextAreaBox = styled.textarea<{ size: number }>`
  width: 100%;
  height: ${({ size }) => size}px;
  padding: 14px 15px;

  outline: none;
  ${css`
    ${typography.Paragraph4}
  `}
  color: ${colors.N100};

  border-radius: 12px;
  border: 1px solid ${colors.N40};
  background-color: ${colors.N10};
  resize: none;
`;
