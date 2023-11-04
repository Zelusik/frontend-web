import { Button } from "components/core";
import Icon from "components/Icon";
import { Route } from "constants/Route";
import { useRouter } from "next/router";

interface Props {
  margin?: string;
  size?: number;
  color?: any;
}

export default function Setting({ size, color }: Props) {
  const router = useRouter();
  const clickSetting = () => {
    router.push(Route.SETTING());
  };

  return (
    <Button
      maw={size}
      miw={size}
      mah={size}
      mih={size}
      radius={size}
      onClick={clickSetting}
    >
      <Icon
        icon="Setting"
        width={size}
        height={size}
        color={color}
        fill={color}
      />
    </Button>
  );
}
