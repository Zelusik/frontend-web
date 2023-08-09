import Icon from "components/Icon";

interface Props {
  size?: number;
  color?: any;
}

export default function Heart({ size, color }: Props) {
  return (
    <Icon
      icon="Heart"
      width={size}
      height={size}
      color={color}
      fill={color}
      onClick={() => {
        alert("heart");
      }}
    />
  );
}
