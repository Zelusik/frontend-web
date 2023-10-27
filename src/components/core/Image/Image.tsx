import React from "react";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";
import { globalValue } from "constants/globalValue";

type ImageProps = ComponentsProps & {
  alt: string;
  src: any;
  fit?: string;
};

const CustomImage = ({ children, ...props }: ImageProps) => {
  return (
    <img
      alt={props?.alt}
      src={props?.src || globalValue.BLANK_IMAGE}
      style={{
        ...coreStyles(props),
        objectFit: props?.fit ? props?.fit : "cover",
        ...props.style,
      }}
    />
  );
};

CustomImage.defaultProps = {
  w: "100%",
  h: "100%",
};

export default CustomImage;
