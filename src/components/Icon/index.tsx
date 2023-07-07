import React from "react";
import styled from "@emotion/styled";

import * as icons from "components/Icon/icons";

interface IconProps {
  icon: string;
  width?: number;
  height?: number;
  rotate?: number;
  color?: string;
}

const Icon = ({ icon, width, height, rotate, color }: IconProps) => {
  const IconComponent = icons[icon as keyof typeof icons];
  return (
    <IconWrapper width={width} height={height} rotate={rotate} color={color}>
      <IconComponent />
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{
  width?: number;
  height?: number;
  rotate?: number;
  color?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  ${({ rotate }) =>
    rotate && {
      transform: `rotate(${rotate}deg)`,
    }}
  >svg {
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;

    path {
      fill: ${({ color }) => color};
    }
  }
`;

export default Icon;
