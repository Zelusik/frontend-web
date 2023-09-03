import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

export default function FoodTagLine({ percentage }: any) {
  return (
    <>
      <FoodTagLineBack />
      <FoodTagLineBar percentage={percentage} />
    </>
  );
}

const move = (prePercentage: any, percentage: any) => keyframes`
  from {
    width: ${prePercentage}%;
  }
  to {
    width: ${percentage}%;
  }
`;

const FoodTagLineBack = styled.div`
  width: 100%;
  height: 4px;

  position: absolute;
  bottom: 1px;

  background-color: ${colors.N20};
`;
const FoodTagLineBar = styled.div<{ percentage: any }>`
  height: 4px;

  position: absolute;
  bottom: 1px;

  background-color: ${colors.N80};
  animation: ${(props) => move(props.percentage[0], props.percentage[1])} 0.3s
    forwards;
  z-index: 999;
`;
