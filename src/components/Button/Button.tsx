import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "constants/colors";

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
  fontMargin?: any;
  fontPadding?: any;
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
  fontMargin,
  fontPadding,
}: Props) {
  return (
    <div
      style={{
        width: width,
        height: height,
        margin: margin,
        display: "flex",
        borderRadius: radius,
        color: color,
        backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{
          margin: "auto",
          padding: fontPadding,
        }}
      >
        {frontIcon}
        <span style={{ margin: fontMargin }}>{text}</span>
        {backIcon}
      </div>
    </div>
  );
}

const ButtonCss = css``;
