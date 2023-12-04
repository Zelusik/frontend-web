import { useRouter } from "next/router";
import Icon from "components/Icon";
import { Button } from "components/core";

interface BackArrowProps {
  icon?: any;
  size?: number;
  color?: string;
}

const BackArrow = ({
  icon = "LeftArrow",
  size = 24,
  color,
}: BackArrowProps) => {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  return (
    <Button
      maw={size}
      miw={size}
      mah={size}
      mih={size}
      radius={size}
      onClick={handleClickBack}
    >
      <Icon icon={icon} width={size} height={size} fill={color} color={color} />
    </Button>
  );
};
export default BackArrow;
