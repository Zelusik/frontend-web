import { useRouter } from "next/router";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import Input from "components/Input";
import { useState } from "react";
import TopNavigation from "components/TopNavigation";
import Spacing from "components/Spacing";
import useDisplaySize from "hooks/useDisplaySize";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";

export default function AllDelete() {
  const router = useRouter();

  return (
    <TitleWrapper>
      <div style={typography.Paragraph5}>최근검색</div>
      <Delete typo={typography.Paragraph4} color={colors.N50}>
        모두 지우기
      </Delete>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.div<{ typo: any; color: any }>`
  ${({ typo }) =>
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;
