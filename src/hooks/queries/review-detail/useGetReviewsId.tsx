import { useQuery } from "react-query";
import { reviewsApi } from "@/api/reviews";

const useGetReviewsId = (reviewId: number): any => {
  const { data, isLoading, error, refetch } = useQuery(
    [],
    async () => {
      const result = await reviewsApi.getReviewsId(reviewId);
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { reviewData: data, isReviewLoading: isLoading, error, refetch };
};

export default useGetReviewsId;
