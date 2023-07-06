interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
}

export default function Image({
  src,
  width = "100%",
  height = "100%",
  radius = 0,
}: Props) {
  return (
    <img
      src={src}
      style={{ width: width, height: height, borderRadius: radius }}
    />
  );
}
