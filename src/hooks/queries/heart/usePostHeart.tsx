import { useMutation } from "react-query";
import { postBookmarks } from "api/bookmarks";

const usePostHeart = () => {
  const { mutate } = useMutation(({ placeId }: any) => postBookmarks(placeId), {});
  return { mutate };
};

export default usePostHeart;
