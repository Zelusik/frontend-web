import { useQuery } from "react-query";
import { getReviews } from "api/review";
import { getPlaces, getPlacesId, postPlaces } from "api/places";
import { useAppSelector } from "hooks/useReduxHooks";

const useGetStore = (kakaoId: string, placeId: number): any => {
  const { placeInfo } = useAppSelector((state) => state.search);
  const { data, isLoading, error, refetch } = useQuery(
    [],
    async () => {
      console.log(kakaoId);

      if (kakaoId) {
        const testPlaceInfo = await getPlaces(kakaoId);
        const params: any = {
          params: {
            placeId: 0,
            page: 0,
            size: 10,
          },
        };
        let newPlaceInfo = null;

        if (!testPlaceInfo) {
          const postPlaceInfo = await postPlaces(placeInfo);
          // console.log(postPlaceInfo);
          newPlaceInfo = postPlaceInfo;
          // return {data: {}, isLoading: false, error, refetch};
        } else {
          newPlaceInfo = testPlaceInfo;
          params.params.placeId = testPlaceInfo.id;
        }

        const reviewsResult = await getReviews(params);
        return {
          storeInfo: newPlaceInfo,
          reviews: reviewsResult,
        };
      } else {
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
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetStore;
