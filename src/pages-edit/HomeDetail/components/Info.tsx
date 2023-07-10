import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import Spacing from "components/Spacing";
import { css } from "@emotion/react";
import { typography } from "constants/typography";

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
              <ItemTitle>{data}</ItemTitle>
              <ItemDescription>11:30-22:00</ItemDescription>
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

const DescriptionWrapper = styled.ul``;

const Description = styled.ul`
  display: flex;
  ${css`
    ${typography.Paragraph3}
  `}
`;

const ItemTitle = styled.div`
  width: 56px;
  margin-right: 20px;
  color: ${colors.N80};
`;

const ItemDescription = styled.div``;
