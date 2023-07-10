import { css } from "@emotion/react";
import { colors } from "constants/colors";
import styled from "@emotion/styled";

interface Props {
  frontIcon?: any;
  text?: string;
  backIcon?: any;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  color?: any;
  backgroundColor?: any;

  margin?: any;
  fontColor?: any;
  fontTypo?: any;
  fontMargin?: any;
  fontPadding?: any;

  disabled?: boolean;
  onClick?: any;
}

export default function Button({
  frontIcon,
  text,
  backIcon,
  width = "100%",
  height = "100%",
  radius = 0,
  color = colors.N0,
  backgroundColor = colors.N100,

  margin,
  fontColor,
  fontTypo,
  fontMargin,
  fontPadding,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      style={{
        width: width,
        height: height,
        margin: margin,
        display: "flex",
        borderRadius: radius,
        color: color,
        backgroundColor: backgroundColor,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      <ButtonInner fontTypo={fontTypo} padding={fontPadding} color={fontColor}>
        <span style={{ margin: "auto", display: "flex" }}>{frontIcon}</span>
        <span style={{ margin: fontMargin, display: "flex" }}>{text}</span>
        <span style={{ margin: "auto", display: "flex" }}>{backIcon}</span>
      </ButtonInner>
    </button>
  );
}

const ButtonInner = styled.div<{ fontTypo: any; padding: any; color: any }>`
  margin: auto;
  display: flex;
  padding: ${({ padding }) => padding};

  ${({ fontTypo }) =>
    fontTypo &&
    css`
      ${fontTypo}
    `}
  color: ${({ color }) => color};
`;

const divStyle = css`
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  background: red;
  &:hover {
    color: white;
  }
`;
