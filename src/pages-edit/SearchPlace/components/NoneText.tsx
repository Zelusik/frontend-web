import styled from "@emotion/styled";
import Text from "components/Text";

export default function NoneText({ text }: any) {
  return (
    <Wrapper>
      <Text
        typo="Paragraph5"
        color="N80"
        style={{ margin: "auto" }}
      >{`해당 ${text}의 정보가 아직 없습니다`}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100% - 151px);
  display: flex;
`;
