import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import RoundButton from "components/Button/RoundButton";
import { useAppSelector } from "hooks/useReduxHooks";
import { tasteData } from "constants/globalData";

export default function Selections({ state }: any) {
  const router = useRouter();
  const { visible, actionDelay } = useAppSelector(
    (state) => state.mapBottomSheet
  );

  const handleClickFood = (idx: number) => {
    // let newFoods = foods;
    // newFoods[idx].action = !newFoods[idx].action;
    // setFoods(newFoods);
  };

  return (
    <HashtagsWrapper visible={visible} actionDelay={actionDelay}>
      <HashtagsInner>
        <MenuWrapper marginLeft={true} marginRight={false}>
          <RoundButton type="map-icon" action={true}>
            내 주변
          </RoundButton>
        </MenuWrapper>

        <MenuWrapper marginLeft={false} marginRight={false}>
          <RoundButton type="map-icon" action={false}>
            저장
          </RoundButton>
        </MenuWrapper>

        {tasteData.map((data: any, idx: number) => {
          return (
            <MenuWrapper
              key={idx}
              marginLeft={false}
              marginRight={idx === tasteData.length - 1}
              onClick={() => handleClickFood(idx)}
            >
              <RoundButton type="map-text" action={false}>
                {data.val}
              </RoundButton>
            </MenuWrapper>
          );
        })}
      </HashtagsInner>
    </HashtagsWrapper>
  );
}

const fade = (actionDelay: number) => keyframes`
  from {
    opacity: ${actionDelay ? 1 : 0};
  }
  to {
    opacity: ${actionDelay ? 0 : 1};
  }
`;

const HashtagsWrapper = styled.div<{
  actionDelay: number;
  visible: number;
}>`
  height: 42px;
  display: ${({ visible }) => (visible === 1 ? "none" : "flex")};
  white-space: nowrap;
  opacity: ${({ visible }) => 1 - visible};
`;

const HashtagsInner = styled.div`
  height: 42px;
  display: flex;
  overflow: auto;
`;

const MenuWrapper = styled.div<{ marginLeft: boolean; marginRight: boolean }>`
  height: 40px;
  margin: auto;
  margin-left: ${({ marginLeft }) => (marginLeft ? "15px" : "0")};
  margin-right: ${({ marginRight }) => (marginRight ? "15px" : "6px")};

  display: inline-block;
  border-radius: 40px;
`;
