import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import RoundButton from "components/Button/RoundButton";
import { useAppSelector } from "hooks/useReduxHooks";
import { tasteData } from "constants/globalData";
import useSearch from "hooks/useSearch";

export default function FoodSelection({ clickMarkShow }: any) {
  const router = useRouter();
  const { visible, actionDelay } = useAppSelector(
    (state) => state.mapBottomSheet
  );
  const { foodType } = useAppSelector((state) => state.search);
  const { foodTypeSetting } = useSearch();

  const handleClickFood = (idx: number) => {
    // let newFoods = foods;
    // newFoods[idx].action = !newFoods[idx].action;
    // setFoods(newFoods);
  };

  const clickFilterButton = (val: string) => {
    if (foodType === val) foodTypeSetting("");
    else foodTypeSetting(val);
  };

  return (
    <ScrollWrapper visible={visible} actionDelay={actionDelay}>
      <ScrollInner>
        <ButtonWrapper left={true} right={false}>
          <RoundButton type="map-icon" action={true}>
            내 주변
          </RoundButton>
        </ButtonWrapper>

        <ButtonWrapper left={false} right={false} onClick={clickMarkShow}>
          <RoundButton type="map-icon" action={false}>
            저장
          </RoundButton>
        </ButtonWrapper>

        {tasteData.map((data: any, idx: number) => {
          return (
            <ButtonWrapper
              key={idx}
              left={false}
              right={idx === tasteData.length - 1}
              onClick={() => handleClickFood(idx)}
            >
              <RoundButton
                type="map-text"
                action={data.val === foodType}
                onClick={() => clickFilterButton(data.val)}
              >
                {data.val}
              </RoundButton>
            </ButtonWrapper>
          );
        })}
      </ScrollInner>
    </ScrollWrapper>
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

const ScrollWrapper = styled.div<{
  actionDelay: number;
  visible: number;
}>`
  height: 42px;
  display: ${({ visible }) => (visible === 1 ? "none" : "flex")};
  white-space: nowrap;
  opacity: ${({ visible }) => 1 - visible};
`;

const ScrollInner = styled.div`
  height: 42px;
  display: flex;
  overflow: auto;
`;

const ButtonWrapper = styled.div<{ left: boolean; right: boolean }>`
  height: 40px;
  margin: auto;
  margin-left: ${({ left }) => (left ? "15px" : "0")};
  margin-right: ${({ right }) => (right ? "15px" : "6px")};

  display: inline-block;
  border-radius: 40px;
`;
