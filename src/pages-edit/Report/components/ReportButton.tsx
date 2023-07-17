import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { typography } from "constants/typography";
import { colors } from "constants/colors";
import Spacing from "components/Spacing";

export default function ReportButton({ selected, text, onClick }: any) {
  const router = useRouter();

  return (
    <div onClick={onClick}>
      <ButtonWrapper>
        <Check selected={selected} />
        <CheckText>{text}</CheckText>
      </ButtonWrapper>
      <Spacing size={16} />
    </div>
  );
}

const ButtonWrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
`;

const Check = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  margin: auto 0;
  margin-right: 8px;

  border-radius: 20px;
  border: ${({ selected }) =>
    selected ? `6px solid ${colors.Orange500}` : `2px solid ${colors.N40}`};
`;

const CheckText = styled.div`
  margin: auto 0;
  ${css`
    ${typography.Paragraph4}
  `}
`;
