import { useRouter } from "next/router";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import useDisplaySize from "hooks/useDisplaySize";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import Icon from "components/Icon";

const Icons = ["LineMarker", "Restaurant", "LineProfile"];

export default function CurrentSelection({ text, where }: any) {
  const router = useRouter();

  return (
    <>
      <TitleWrapper>
        <Text typo={typography.Paragraph5}>
          <Icon icon={Icons[where]} width={24} height={24} />
          <div style={{ margin: "auto 0", marginLeft: 8 }}>{text}</div>
        </Text>
        <Delete typo={typography.Paragraph4} color={colors.N50}>
          <Icon icon="XButton" width={24} height={24} color={colors.N60} />
        </Delete>
      </TitleWrapper>
      <Spacing size={20} />
    </>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div<{ typo: any }>`
  display: flex;
  ${({ typo }) =>
    css`
      ${typo}
    `}
`;

const Delete = styled.div<{ typo: any; color: any }>`
  ${({ typo }) =>
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;
