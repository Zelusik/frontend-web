import Icon from "components/Icon";

interface Props {
  margin?: string;
  size?: number;
  color?: any;
}

export default function Heart({ margin, size, color }: Props) {
  return (
    <Icon
      icon="Heart"
      width={size}
      height={size}
      margin={margin}
      color={color}
      fill={color}
      onClick={() => {
        alert("setting");
      }}
    />
  );
}
