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
  const { mutate: deleteHeartMutate } = useDeleteHeart();
  const { mutate: postHeartMutate } = usePostHeart();

  const handleClickMark = async (e: any) => {
    e.stopPropagation();
    if (isMarked) {
      deleteHeartMutate({ id });
    } else {
      postHeartMutate({ id });
    }
  };

  return (
    <Icon
      icon="Heart"
      width={size}
      height={size}
      color={isMarked ? "Red" : "undefined"}
      fill={isMarked ? "Red" : "undefined"}
      onClick={handleClickMark}
    />
  );
}
