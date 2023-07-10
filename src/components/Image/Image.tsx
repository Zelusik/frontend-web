interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;

  margin?: string;
  padding?: string;
}

export default function Image({
  src,
  width = "100%",
  height,
  ratio = 9 / 16,
  radius = 0,
  margin,
  padding,
}: Props) {
  return (
    <img
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
