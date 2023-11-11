import { useMutation, useQueryClient } from "react-query";
import { postBookmarks } from "api/bookmarks";
import { feedQueryKeys } from "../home/useGetFeed";

const usePostHeart = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id }: any) => postBookmarks(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(feedQueryKeys.id);
    },
  });
};

export default usePostHeart;
