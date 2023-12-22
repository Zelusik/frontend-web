import { useRouter } from "next/router";
import { Button } from "@/components/core";
import { Icon } from "@/components";
import { Route } from "@/constants";

interface Props {
  margin?: string;
  size?: number;
  color?: any;
  point?: any;
}

export default function Edit({ margin, size = 24, color, point }: Props) {
  const router = useRouter();
  const handleClickWriteReview = () => {
    localStorage.setItem("point", JSON.stringify(point));
    router.push(Route.REVIEW());
  };
  return (
    <Button
      maw={size}
      miw={size}
      mah={size}
      mih={size}
      radius={size}
      onClick={handleClickWriteReview}
    >
      <Icon
        icon="Edit"
        width={size}
        height={size}
        margin={margin}
        color={color}
        fill={color}
      />
    </Button>
  );
}
