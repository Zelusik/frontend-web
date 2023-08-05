import Icon from "components/Icon";
import { colors } from "constants/colors";
import { useAppDispatch } from "hooks/useReduxHooks";
import { changeVisibleType } from "reducer/slices/bottomSheet/bottomSheetSlice";

interface Props {
  margin?: string;
  size?: number;
  color?: any;
}

export default function Dots({ margin, size, color }: Props) {
  const dispatch = useAppDispatch();

  const handleClickDots = () => {
    dispatch(
      changeVisibleType({
        type: "bottomSheet",
        value: [1, "report"],
      })
    );
  };

  return (
    <Icon
      icon="Dots"
      width={size}
      height={size}
      margin={margin}
      fill={color}
      color={color}
      onClick={handleClickDots}
    />
  );
}
