import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { typography } from "constants/typography";
import { colors } from "constants/colors";

import { Text, Space } from "components/core";

export default function TextArea({
  size,
  placeholder,
  value,
  text,
  onChange,
  maxLength,
}: any) {
  return (
    <Wrapper>
      <TextAreaBox
        placeholder={placeholder}
        value={value}
        size={size}
        onChange={onChange}
        maxLength={maxLength}
      />
      <Space h={12} />
      {/* <TextWrapper> */}
      <Text typo="Paragraph1" c="N80">
        {text}
      </Text>
      {/* </TextWrapper> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

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
