import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { deleteBookmarks } from "@/api/bookmarks";
import { feedQueryKeys } from "../home/useGetFeed";
import { recommendReviewsQueryKeys } from "../mypage/useGetRecommendReviews";

const useDeleteHeart = () => {
  const { query } = useRouter();
  const memberId: any = query.id;

  const queryClient = useQueryClient();
  return useMutation(({ id }: any) => deleteBookmarks(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(feedQueryKeys.id);
      queryClient.invalidateQueries(recommendReviewsQueryKeys.byId(memberId));
    },
  });
};

export default useDeleteHeart;
