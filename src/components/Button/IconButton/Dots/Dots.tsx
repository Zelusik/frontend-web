import useBottomSheet from "hooks/useBottomSheet";
import Icon from "components/Icon";

interface Props {
  type: string;
  size?: number;
  color?: any;
}

export default function Dots({ type, size, color }: any) {
  const { openBottomSheet } = useBottomSheet({});
  const handleClickDots = () => {
    openBottomSheet(type);
  };

  return (
    <Icon
      icon="Dots"
      width={size}
      height={size}
      fill={color}
      color={color}
      onClick={handleClickDots}
    />
  );
}
