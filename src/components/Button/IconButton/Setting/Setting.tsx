import { useRouter } from "next/router";
import { Button } from "@/components/core";
import { Icon } from "@/components";
import { Route } from "@/constants";

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
