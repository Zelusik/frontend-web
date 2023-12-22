import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { postBookmarks } from "@/api/bookmarks";
import { feedQueryKeys } from "../home/useGetFeed";
import { recommendReviewsQueryKeys } from "../mypage/useGetRecommendReviews";

const usePostHeart = () => {
  const { query } = useRouter();
  const memberId: any = query.id;

  const queryClient = useQueryClient();
  return useMutation(({ id }: any) => postBookmarks(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(feedQueryKeys.id);
      queryClient.invalidateQueries(recommendReviewsQueryKeys.byId(memberId));
    },
  });
};

export default usePostHeart;
