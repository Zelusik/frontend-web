import styled from "@emotion/styled";

import useAlert from "hooks/useAlert";
import { Space, Text } from "components/core";

export default function CopyText() {
  const { closeAlert } = useAlert();

  return (
    <>
      <Text typo="Paragraph6" c="N100">
        복사 되었습니다
      </Text>
      <Space h={26} />
      <Wrapper>
        <Inner>
          <div />
          <Text typo="Paragraph6" c="N60" onClick={closeAlert}>
            확인
          </Text>
        </Inner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`;
