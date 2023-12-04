import styled from "@emotion/styled";
import { Box } from "components/core";
import Text from "components/core/Text";
import { globalValue } from "constants/globalValue";

export default function NoneText({ text }: any) {
  return (
    <Box h="calc(100% - 126px)" dis="flex">
      <Text
        c="N80"
        typo="Paragraph5"
        m="auto"
      >{`해당 ${text}의 정보가 아직 없습니다`}</Text>
    </Box>
  );
}

const Wrapper = styled.div`
  height: calc(100% - 151px);
  display: flex;
`;
