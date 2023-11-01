import { useMutation, useQueryClient } from "react-query";
import { deleteBookmarks } from "api/bookmarks";
import { feedQueryKeys } from "../home/useGetFeed";

const useDeleteHeart = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id }: any) => deleteBookmarks(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(feedQueryKeys.id);
    },
  });
};

export default useDeleteHeart;
