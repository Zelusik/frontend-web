import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import Copy from "components/Button/IconButton/Copy";
import Text from "components/Text";

export default function Info({ data }: any) {
  const router = useRouter();

  return (
    <>
      <Text typo="Headline4" color="N100">
        {data.title}
      </Text>
      <Spacing size={18} />

      {data.info_list.map((info: any, idx: number) => {
        return (
          <div key={idx}>
            <InfoWrapper>
              <Text typo="Paragraph4" color="N80" style={{ minWidth: 52 }}>
                {info.info_title}
              </Text>

              <Text
                typo="Paragraph4"
                color="N100"
                style={
                  data.title === "문의 연락" && info.info_desc !== "없음"
                    ? { textDecoration: "underline" }
                    : {}
                }
              >
                {info.info_desc}
              </Text>

              <IconWrapper>{info.copy ? <Copy /> : undefined}</IconWrapper>
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
