import Icon from "components/Icon";

interface Props {
  size?: number;
  color?: any;
  onClick?: any;
}

export default function Heart({ size, color, onClick }: Props) {
  return (
    <Icon
      icon="Heart"
      width={size}
      height={size}
      color={color}
      fill={color}
      onClick={onClick}
    />
  );
}
