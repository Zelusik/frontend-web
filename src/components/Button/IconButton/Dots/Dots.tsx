import useBottomSheet from "hooks/useBottomSheet";
import Icon from "components/Icon";
import { Button } from "components/core";

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

export default function Dots({ type, size = 24, color }: DotsProps) {
  const { openBottomSheet } = useBottomSheet({});
  const handleClickDots = () => {
    openBottomSheet(type);
  };

  return (
    <Button
      maw={size}
      miw={size}
      mah={size}
      mih={size}
      radius={size}
      onClick={handleClickDots}
    >
      <Icon icon="Dots" width={size} height={size} fill={color} color={color} />
    </Button>
  );
}
