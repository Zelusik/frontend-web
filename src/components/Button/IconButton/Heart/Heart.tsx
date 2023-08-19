import { deleteBookmarks, postBookmarks } from "api/bookmarks";
import Icon from "components/Icon";
import { useState } from "react";

interface Props {
  size?: number;
  placeId: number;
  isMarked?: boolean;
}

export default function Heart({ size, placeId, isMarked }: Props) {
  const [marked, setMarked] = useState(isMarked);
  const handleClickMark = async (e: any) => {
    e.stopPropagation();
    if (marked) {
      await deleteBookmarks(placeId);
      setMarked(false);
    } else {
      await postBookmarks(placeId);
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
