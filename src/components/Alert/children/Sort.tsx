import styled from "@emotion/styled";

import useAlert from "hooks/useAlert";
import { useAppSelector } from "hooks/useReduxHooks";

import Icon from "components/Icon";

import { Space, Text } from "components/core";
import { sortData } from "constants/globalData";

export default function Sort() {
  const { sortId } = useAppSelector((state) => state.alert);
  const { closeAlert, handleSortId } = useAlert();

  return (
    <>
      <Text typo="Headline3">정렬기준</Text>
      <Space h={26} />
      <SortWrapper>
        {sortData.map((data: any, idx: number) => {
          const action = sortId === idx + 1;

          return (
            <SortInner key={idx} onClick={() => handleSortId(idx)}>
              <Text typo="Paragraph6" c={action ? "Orange600" : "N100"}>
                {data.val}
              </Text>
              {action ? (
                <Icon icon="Check" width={20} height={20} color="Orange600" />
              ) : null}
            </SortInner>
          );
        })}
        <SortInner>
          <div />
          <Text typo="Paragraph6" c="N60" onClick={closeAlert}>
            취소
          </Text>
        </SortInner>
      </SortWrapper>
    </>
  );
}

const SortWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SortInner = styled.div`
  display: flex;
  justify-content: space-between;
`;
