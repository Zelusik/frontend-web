/* eslint-disable @next/next/no-img-element */
type ObjectFitOption = "fill" | "contain" | "cover" | "none" | "scale-down";

interface Props {
  alt: string;
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
  objectFit?: ObjectFitOption;

  margin?: string;
  padding?: string;
  onClick?: any;
}

export default function Image({
  alt,
  src,
  width = "100%",
  height,
  ratio = 9 / 16,
  radius = 0,
  objectFit = "cover",

  margin = "0",
  padding = "0",
  onClick,
}: Props) {
  return (
    <img
      alt={alt}
      onClick={onClick}
      src={src}
      style={{
        width: width,
        height: height,
        margin: margin,
        padding: padding,

        aspectRatio: ratio,
        borderRadius: radius,
        objectFit: objectFit,
      }}
    />
  );
}
