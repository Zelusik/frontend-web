import { useEffect, useState } from "react";
import useDeleteHeart from "hooks/queries/heart/useDeleteHeart";
import usePostHeart from "hooks/queries/heart/usePostHeart";
import Icon from "components/Icon";

interface Props {
  size?: number;
  id: number;
  isMarked?: boolean;
}

export default function Heart({ size, id, isMarked }: Props) {
  const [mark, setMark] = useState(isMarked);
  const { mutate: deleteHeartMutate } = useDeleteHeart();
  const { mutate: postHeartMutate } = usePostHeart();

  const handleClickMark = async (e: any) => {
    setMark(!mark);
    e.stopPropagation();
    if (mark) {
      deleteHeartMutate({ id });
    } else {
      postHeartMutate({ id });
    }
  };

  useEffect(() => {
    setMark(isMarked);
  }, [isMarked]);

  return (
    <Icon
      icon="Heart"
      width={size}
      height={size}
      color={mark ? "Red" : "undefined"}
      fill={mark ? "Red" : "undefined"}
      onClick={handleClickMark}
    />
  );
}
