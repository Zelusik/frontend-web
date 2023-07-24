interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;

  margin?: string;
  padding?: string;
  onClick?: any;
}

export default function TagImage({
  src,
  width = "100%",
  height,
  ratio = 9 / 16,
  radius = 0,
  margin = "0",
  padding = "0",
  onClick,
}: Props) {
  return (
    <img
      onClick={onClick}
      src={src}
      style={{
        width: width,
        height: height,
        margin: margin,
        padding: padding,

        aspectRatio: ratio,
        borderRadius: radius,
      }}
    />
  );
}