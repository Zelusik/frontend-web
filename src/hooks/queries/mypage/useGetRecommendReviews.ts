import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { membersApi } from "@/api/members";

export const recommendReviewsQueryKeys = {
  id: ["recommendReviews"] as const,
  byId: (id: string) => ["recommendReviews", id] as const,
};

const useGetRecommendReviews = () => {
  const { query } = useRouter();
  const memberId: any = query.id;

  const { data, isLoading, error, refetch } = useQuery(
    recommendReviewsQueryKeys.byId(memberId),
    async () => {
      if (memberId) {
        const res = await membersApi.getRecommendReviews(Number(memberId));
        return res.recommendedReviews;
      } else {
        const res = await membersApi.getMeRecommendReviews();
        return res.recommendedReviews;
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );
  return {
    recommendReviewDatas: data,
    isLoadingRecommendReview: isLoading,
    error,
    refetch,
  };
};

export default useGetRecommendReviews;
