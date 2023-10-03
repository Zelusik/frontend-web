import { useRouter } from "next/router";
import Icon from "components/Icon";

interface BackArrowProps {
  size?: number;
  color?: string;
}

const BackArrow = ({ size, color }: BackArrowProps) => {
  const router = useRouter();
  const handleClickDots = () => {
    router.back();
  };

  return (
    <Icon
      icon="LeftArrow"
      width={size}
      height={size}
      fill={color}
      color={color}
      onClick={handleClickDots}
    />
  );
};
export default BackArrow;
