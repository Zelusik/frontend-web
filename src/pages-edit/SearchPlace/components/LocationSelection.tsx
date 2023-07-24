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
import Icon from "components/Icon";

const Icons = ["LineMarker", "Restaurant", "LineProfile"];

export default function LocationSelection({
  text,
  subText,
  searchLatter,
}: any) {
  const router = useRouter();

  return (
    <TitleWrapper>
      <div style={{ margin: "auto 0" }}>
        <Text typo={typography.Headline4}>{text}</Text>
        <SubText typo={typography.Paragraph4} color={colors.N80}>
          {subText}
        </SubText>
      </div>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 79px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div<{ typo: any; color?: any }>`
  ${({ typo }) =>
    css`
      ${typo}
    `}
`;

const SubText = styled.div<{ typo: any; color?: any }>`
  ${({ typo }) =>
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;
