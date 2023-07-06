interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Image({
  src,
  width = "100%",
  height,
  ratio = 9 / 16,
  radius = 0,
}: Props) {
  return (
    <img
      src={src}
      style={{
        width: width,
        height: height,
        aspectRatio: ratio,
        borderRadius: radius,
      }}
    />
  );
}
