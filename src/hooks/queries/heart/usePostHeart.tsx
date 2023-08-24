import { useMutation } from "react-query";
import { postBookmarks } from "api/bookmarks";

const usePostHeart = () => {
  const { mutate } = useMutation(({ placeId }: any) => postBookmarks(placeId), {
    onSuccess: () => {
      //   console.log("createPost success");
    },
    onError: () => {
      //   console.log("createPost error");
    },
  });
  return { mutate };
};

export default usePostHeart;
