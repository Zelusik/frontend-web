import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import RoundButton from "components/Button/RoundButton";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeFilterAction } from "reducer/slices/search/searchSlice";
import Spacing from "components/Spacing";
import { typography } from "constants/typography";
import { useRef } from "react";
import { commonWords } from "constants/commonWords";

export default function Filter({}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.global);
  const filterRef = useRef<any>(null);

  const handleClickFilter = () => {
    dispatch(
      changeFilterAction({
        type: "search",
        value: true,
      })
    );
  };

  return (
    <FilterWrapper>
      <FilterButtonWrapper ref={filterRef} onClick={handleClickFilter}>
        <Menu>
          <Icon icon="Filter" width={16} height={16} color="Orange600" />
          <Count>1</Count>
        </Menu>
      </FilterButtonWrapper>
      <FilterScrollWrapper>
        <div style={{ minWidth: 1 > 6 ? 88 : 80 }} />
        <FilterInner>
          {commonWords.moodList.map((data: any, idx: number) => {
            return (
              <ButtonWrapper
                key={idx}
                marginRight={idx === commonWords.moodList.length - 1}
              >
                <RoundButton type="full" action={false}>
                  {data[language]}
                </RoundButton>
              </ButtonWrapper>
            );
          })}
        </FilterInner>
      </FilterScrollWrapper>
      <Spacing size={14} />
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  position: relative;
`;

const FilterButtonWrapper = styled.div`
  height: 36px;
  padding: 0 13px;
  display: inline-block;

  position: absolute;
  left: 15px;

  border-radius: 48px;
  border: 1.152px solid ${colors.Orange600};
  background-color: ${colors.N0};
`;

const FilterScrollWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

const FilterInner = styled.div`
  display: flex;
  overflow: auto;
`;

const ButtonWrapper = styled.div<{ marginRight: number }>`
  margin-right: ${({ marginRight }) => (marginRight ? `20px` : "6px")};
  display: flex;
`;

const Menu = styled.div<{ typo?: any }>`
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
`;

const Count = styled.div`
  margin-left: 6px;
  ${css`
    ${typography.Headline2}
  `}
  color: ${colors.Orange600};
`;
