import Icon from "components/Icon";

interface Props {
  width?: number;
  height?: number;
  margin?: string;
  color?: any;
}

export default function Setting({ width, height, margin, color }: Props) {
  return (
    <Icon
      icon="Dots"
      width={width}
      height={height}
      margin={margin}
      color={color}
      fill={color}
      onClick={() => {
        alert("setting");
      }}
    />
  );
}
