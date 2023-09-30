import { useMutation } from "react-query";
import { deleteBookmarks } from "api/bookmarks";

const useDeleteHeart = () => {
  const { mutate } = useMutation(({ placeId }: any) => deleteBookmarks(placeId), {});
  return { mutate };
};

export default useDeleteHeart;
