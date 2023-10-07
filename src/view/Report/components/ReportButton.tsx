import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

import Text from "components/core/Text";
import { Space } from "components/core";

export default function ReportButton({ selected, text, onClick }: any) {
  const router = useRouter();

  return (
    <>
      <Wrapper onClick={onClick}>
        <Check selected={selected} />
        <Text typo="Paragraph4" c="N100">
          {text}
        </Text>
      </Wrapper>
      <Space h={16} />
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
`;

const Check = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  margin: auto 0;
  margin-right: 8px;

  border-radius: 20px;
  border: ${({ selected }) =>
    selected ? `6px solid ${colors.Orange500}` : `2px solid ${colors.N40}`};
`;
