import { useRouter } from "next/router";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import Text from "components/Text";

export default function AllDelete({ ...props }: any) {
  const router = useRouter();
  const clickAllDelete = () => {
    localStorage.setItem("currentSelection", JSON.stringify([]));
    props.setCurrentSelection([]);
  };

  return (
    <TitleWrapper onClick={clickAllDelete}>
      <Text typo="Paragraph5" color="N100">
        최근검색
      </Text>
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
