import { useState } from "react";
import useDeleteHeart from "hooks/queries/heart/useDeleteHeart";
import usePostHeart from "hooks/queries/heart/usePostHeart";
import Icon from "components/Icon";

interface Props {
  size?: number;
  id: number;
  isMarked?: boolean;
}

export default function Heart({ size, id, isMarked }: Props) {
  const [marked, setMarked] = useState(isMarked);
  const { mutate: deleteHeartMutate } = useDeleteHeart();
  const { mutate: postHeartMutate } = usePostHeart();

  const handleClickMark = async (e: any) => {
    e.stopPropagation();
    if (marked) {
      deleteHeartMutate({ id });
      setMarked(false);
    } else {
      postHeartMutate({ id });
      setMarked(true);
    }
  };

  return (
    <Icon
      icon="Heart"
      width={size}
      height={size}
      color={marked ? "Red" : "undefined"}
      fill={marked ? "Red" : "undefined"}
      onClick={handleClickMark}
    />
  );
}
