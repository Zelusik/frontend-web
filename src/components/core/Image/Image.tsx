import React from "react";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";
import { globalValue } from "constants/globalValue";

type ImageProps = ComponentsProps & {
  alt: string;
  src: any;
};

const CustomImage = ({ children, ...props }: ImageProps) => {
  return (
    <img
      alt={props?.alt}
      src={globalValue.BLANK_IMAGE}
      width={props?.w}
      style={{
        ...coreStyles(props),
        ...props.style,
      }}
    />
  );
};

export default CustomImage;
