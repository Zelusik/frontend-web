import Icon from "components/Icon";
import { Route } from "constants/Route";
import { useRouter } from "next/router";

interface Props {
  margin?: string;
  size?: number;
  color?: any;
  point?: any;
}

export default function Edit({ margin, size, color, point }: Props) {
  const router = useRouter();
  const handleClickWriteReview = () => {
    localStorage.setItem("point", JSON.stringify(point));
    router.push(Route.REVIEW());
  };
  return (
    <Icon
      icon="Edit"
      width={size}
      height={size}
      margin={margin}
      color={color}
      fill={color}
      onClick={handleClickWriteReview}
    />
  );
}
