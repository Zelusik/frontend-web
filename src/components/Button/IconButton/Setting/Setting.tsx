import Icon from "components/Icon";
import { Route } from "constants/Route";
import { useRouter } from "next/router";

interface Props {
  margin?: string;
  size?: number;
  color?: any;
}

export default function Setting({ margin, size, color }: Props) {
  const router = useRouter();
  const clickSetting = () => {
    router.push(Route.SETTING());
  };

  return (
    <Icon
      icon="Setting"
      width={size}
      height={size}
      margin={margin}
      color={color}
      fill={color}
      onClick={clickSetting}
    />
  );
}
