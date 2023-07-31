import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import { commonWords } from "constants/commonWords";
import { typography } from "constants/typography";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import {
  changeAlertVisible,
  changeSort,
} from "reducer/slices/alert/alertSlice";

export default function Sort() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.global);
  const { sortId } = useAppSelector((state) => state.alert);

  const handleClickSort = (idx: number) => {
    dispatch(
      changeSort({
        type: "alert",
        value: idx + 1,
      })
    );
  };

  const closeAlert = () => {
    dispatch(
      changeAlertVisible({
        type: "alert",
        value: [false, "sort"],
      })
    );
  };

  return (
    <>
      <SortTitle>정렬기준</SortTitle>
      <Spacing size={26} />
      <SortWrapper>
        {commonWords.alertSort.map((data: any, idx: number) => {
          const action = sortId === idx + 1;

          return (
            <SortSelection onClick={() => handleClickSort(idx)}>
              <Menu action={action}>{data[language]}</Menu>
              {action ? (
                <Menu>
                  <Icon
                    icon="Check"
                    width={20}
                    height={20}
                    color={colors.Orange600}
                  />
                </Menu>
              ) : null}
            </SortSelection>
          );
        })}
        <SortSelection>
          <Menu />
          <Menu style={{ color: colors.N60 }} onClick={closeAlert}>
            취소
          </Menu>
        </SortSelection>
      </SortWrapper>
    </>
  );
}

const SortTitle = styled.div`
  ${css`
    ${typography.Headline3}
  `}
`;

const SortWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SortSelection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div<{ action?: boolean }>`
  margin: auto 0;
  display: flex;

  ${css`
    ${typography.Paragraph6}
  `}

  ${({ action }) =>
    action &&
    css`
      color: ${colors.Orange600};
    `}
`;
