import { useQuery } from "react-query";
import { getReviews } from "api/review";
import { getCookie } from "utils/cookie";
import { getPlacesId } from "api/places";

const useGetStore = (placeId: number): any => {
  const { data, isLoading, error, refetch } = useQuery(
    [],
    async () => {
      const params: any = {
        params: {
          placeId: placeId,
          page: 0,
          size: 10,
        },
      };
      const storeInfoData = await getPlacesId(placeId);
      const reviewsResult = await getReviews(params);
      return {
        storeInfo: storeInfoData,
        reviews: reviewsResult,
      };
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetStore;
