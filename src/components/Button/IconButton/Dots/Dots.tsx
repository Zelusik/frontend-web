import useBottomSheet from "hooks/useBottomSheet";
import Icon from "components/Icon";

interface DotsProps {
  type:
    | "share-report"
    | "delete-edit"
    | "report-store"
    | "selectMenu"
    | "registerMenu";
  size?: number;
  color?: string;
}

export default function Dots({ type, size, color }: DotsProps) {
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
