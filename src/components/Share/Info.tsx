import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import Copy from "components/Button/IconButton/Copy";
import Text from "components/Text";

export default function Info() {
  const router = useRouter();

  return (
    <>
      <Text typo="Headline4" color="N100">
        영업 정보
      </Text>
      <Spacing size={18} />
      {["운영시간", "휴무일"].map((data: any, idx: number) => {
        return (
          <div key={idx}>
            <InfoWrapper>
              <Text typo="Paragraph4" color="N80">
                {data}
              </Text>
              <Text typo="Paragraph4" color="N100">
                11:30-22:00 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
              </Text>
              <IconWrapper>
                <Copy />
              </IconWrapper>
            </InfoWrapper>
            <Spacing size={8} />
          </div>
        );
      })}
      <Spacing size={32} />
    </>
  );
}

const InfoWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 10fr 2fr;
  grid-gap: 10px;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 20px;
`;
