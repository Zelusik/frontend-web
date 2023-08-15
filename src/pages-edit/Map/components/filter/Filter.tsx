import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import RoundButton from "components/Button/RoundButton";
import Text from "components/Text";

export default function Filter({ type, data }: any) {
  const router = useRouter();

  return (
    <Wrapper>
      <Text typo="Headline4" color="N100">
        {data.text}
      </Text>
      <Spacing size={16} />

      <ButtonWrapper>
        {data.textList.map((data2: any, idx: number) => {
          return (
            <RoundButton key={idx} type={type} action={false}>
              {data2.val}
            </RoundButton>
          );
        })}
      </ButtonWrapper>

      {type === "full-radius" ? (
        <>
          <Spacing size={16} />
          <Text typo="Paragraph1" color="N80">
            해당 요일에 오픈하는 음식점만 보여드릴게요.
          </Text>
        </>
      ) : undefined}
      <Spacing size={40} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
