import { useQuery } from "react-query";
import { getPlacesId } from "api/places";
import { getReviewsId } from "api/reviews";

const useGetReviewsId = (reviewId: number): any => {
  const { data, isLoading, error, refetch } = useQuery(
    [],
    async () => {
      const result = await getReviewsId(reviewId);
      return result;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetReviewsId;
