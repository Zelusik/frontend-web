import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import * as icons from "components/Icon/icons";

interface Props {
  icon: string;
  width?: number;
  height?: number;
  margin?: string;
  style?: any;

  rotate?: number;
  fill?: string;
  color?: string;

  onClick?: any;
  onTouchEnd?: any;
}

const Icon = ({
  icon,
  width,
  height,
  margin,
  style,

  rotate,
  fill,
  color,

  onClick,
  onTouchEnd,
}: Props) => {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <IconWrapper
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      style={{ width: width, height: height, margin: margin }}
      rotate={rotate}
      fill={fill}
      color={color}
      styles={style}
    >
      <IconComponent />
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{
  width?: number;
  height?: number;
  rotate?: number;
  fill?: string;
  color?: string;
  styles?: any;
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
  svg {
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;

    path {
      stroke: ${({ color }) => color};
      fill: ${({ fill }) => fill};
    }
  }

  ${({ styles }) => css`
    ${styles}
  `}
`;

export default Icon;
