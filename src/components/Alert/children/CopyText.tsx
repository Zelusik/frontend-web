import styled from "@emotion/styled";

import useAlert from "hooks/useAlert";
import { useAppSelector } from "hooks/useReduxHooks";

import Icon from "components/Icon";
import Spacing from "components/Spacing";
import Text from "components/Text";
import { sortData } from "constants/globalData";

export default function CopyText() {
  const { closeAlert } = useAlert();

  return (
    <>
      <Text typo="Paragraph6" color="N100">
        복사 되었습니다
      </Text>
      <Spacing size={26} />
      <Wrapper>
        <Inner>
          <div />
          <Text typo="Paragraph6" color="N60" onClick={closeAlert}>
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
