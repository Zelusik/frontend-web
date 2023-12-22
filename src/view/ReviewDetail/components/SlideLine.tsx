import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "@/components/core";
import { colors } from "@/constants/colors";

export default function FoodTagLine({ percentage }: any) {
  return (
    <>
      <Box w="100%" h={4} pos="absolute" bottom={1} bg="N20" />
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

const FoodTagLineBar = styled.div<{ percentage: any }>`
  height: 4px;

  position: absolute;
  bottom: 1px;

  background-color: ${colors.N80};
  animation: ${(props) => move(props.percentage[0], props.percentage[1])} 0.3s
    forwards;
  z-index: 999;
`;
