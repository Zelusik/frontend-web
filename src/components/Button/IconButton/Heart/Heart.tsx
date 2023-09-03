import { deleteBookmarks, postBookmarks } from "api/bookmarks";
import Icon from "components/Icon";
import useDeleteHeart from "hooks/queries/heart/useDeleteHeart";
import usePostHeart from "hooks/queries/heart/usePostHeart";
import { useState } from "react";
import { useMutation } from "react-query";

interface Props {
  size?: number;
  placeId: number;
  isMarked?: boolean;
}

export default function Heart({ size, placeId, isMarked }: Props) {
  const [marked, setMarked] = useState(isMarked);
  const { mutate: deleteHeartMutate } = useDeleteHeart();
  const { mutate: postHeartMutate } = usePostHeart();

  const handleClickMark = async (e: any) => {
    e.stopPropagation();
    if (marked) {
      deleteHeartMutate({ placeId });
      setMarked(false);
    } else {
      postHeartMutate({ placeId });
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
