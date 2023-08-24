import { useMutation } from "react-query";
import { deleteBookmarks } from "api/bookmarks";

const useDeleteHeart = () => {
  const { mutate } = useMutation(
    ({ placeId }: any) => deleteBookmarks(placeId),
    {
      onSuccess: () => {
        //   console.log("createPost success");
      },
      onError: () => {
        //   console.log("createPost error");
      },
    }
  );
  return { mutate };
};

export default useDeleteHeart;
