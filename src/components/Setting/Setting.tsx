import Icon from "components/Icon";

interface Props {
  margin?: string;
  size?: number;
  color?: any;
}

export default function Setting({ margin, size, color }: Props) {
  return (
    <Icon
      icon="Dots"
      width={size}
      height={size}
      margin={margin}
      color={color}
      onClick={() => {
        alert("setting");
      }}
    />
  );
}
