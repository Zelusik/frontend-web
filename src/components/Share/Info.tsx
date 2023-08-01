import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import Spacing from "components/Spacing";
import { css } from "@emotion/react";
import { typography } from "constants/typography";
import Copy from "components/Button/IconButton/Copy";

export default function Info() {
  const router = useRouter();

  return (
    <>
      <Title>영업 정보</Title>
      <Spacing size={18} />
      {["운영시간", "휴무일"].map((data: any, idx: number) => {
        return (
          <DescriptionWrapper key={idx}>
            <Description>
              <ItemSpan>
                <ItemTitle>{data}</ItemTitle>
              </ItemSpan>
              <ItemSpan style={{ marginRight: 50 }}>
                11:30-22:00 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
              </ItemSpan>
              <CopyWrapper>
                <Copy />
              </CopyWrapper>
            </Description>

            <Spacing size={8} />
          </DescriptionWrapper>
        );
      })}
      <Spacing size={32} />
    </>
  );
}

const Title = styled.div`
  ${css`
    ${typography.Headline4}
  `}
`;

const DescriptionWrapper = styled.div``;

const Description = styled.div`
  width: 100%;
  display: flex;
  ${css`
    ${typography.Paragraph4}
  `};
`;

const ItemSpan = styled.span``;

const ItemTitle = styled.div`
  width: 56px;
  margin-right: 20px;
  color: ${colors.N80};
`;

const CopyWrapper = styled.div`
  position: absolute;
  right: 20px;
`;
