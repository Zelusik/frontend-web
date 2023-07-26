import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import RoundButton from "components/Button/RoundButton";

export default function Selections({ state }: any) {
  const router = useRouter();
  const [actionDelay, setActionDelay] = useState<boolean>(false);

  const [foods, setFoods] = useState<any>([
    { food: "한식", action: false },
    { food: "중식", action: false },
    { food: "일식", action: false },
    { food: "고기/구이", action: false },
  ]);

  const handleClickFood = (idx: number) => {
    let newFoods = foods;
    newFoods[idx].action = !newFoods[idx].action;
    setFoods(newFoods);
  };

  useEffect(() => {
    if (state.action) setTimeout(() => setActionDelay(state.action), 300);
    else setActionDelay(state.action);
  }, [state.action]);

  return (
    <HashtagsWrapper visible={state.action} actionDelay={actionDelay}>
      <HashtagsInner>
        <MenuWrapper marginLeft={true} marginRight={false}>
          <RoundButton type="map-icon" act={true} textPadding="0 0 0 8px" />
        </MenuWrapper>

        <MenuWrapper marginLeft={false} marginRight={false}>
          <RoundButton type="map-icon" act={false} textPadding="0 0 0 8px" />
        </MenuWrapper>

        {foods.map((data: any, idx: number) => {
          return (
            <MenuWrapper
              key={idx}
              marginLeft={false}
              marginRight={idx === foods.length - 1}
              onClick={() => handleClickFood(idx)}
            >
              <RoundButton type="map-text" act={data.action} text={data.food} />
            </MenuWrapper>
          );
        })}
      </HashtagsInner>
    </HashtagsWrapper>
  );
}

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible ? 1 : 0};
  }
  to {
    opacity: ${visible ? 0 : 1};
  }
`;

const HashtagsWrapper = styled.div<{
  visible: boolean;
  actionDelay: boolean;
}>`
  height: 42px;
  display: ${({ actionDelay }) => (actionDelay ? "none" : "flex")};
  white-space: nowrap;
  animation: ${(props) => fade(props.visible)} 300ms forwards;
`;

const HashtagsInner = styled.div`
  height: 42px;
  display: flex;
  overflow: auto;
`;

const MenuWrapper = styled.div<{ marginLeft: boolean; marginRight: boolean }>`
  height: 38px;
  margin: auto;
  margin-left: ${({ marginLeft }) => (marginLeft ? "15px" : "0")};
  margin-right: ${({ marginRight }) => (marginRight ? "15px" : "6px")};

  display: inline-block;
  border-radius: 40px;
`;
