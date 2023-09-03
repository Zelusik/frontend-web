import { useInfiniteQuery, useQuery } from "react-query";
import { getPlaces, getPlacesId, postPlaces } from "api/places";
import { useAppSelector } from "hooks/useReduxHooks";
import { getReviews } from "api/reviews";

const useGetStore = ({ kakaoId, placeId }: any): any => {
  const { placeInfo } = useAppSelector((state) => state.search);

  const { data, isLoading, error, refetch } = useQuery(
    ["search"],
    async () => {
      if (kakaoId) {
        const testPlaceInfo = await getPlaces(kakaoId);
        const params: any = {
          params: {
            placeId: kakaoId,
            page: 0,
            size: 10,
            embed: "WRITER",
          },
        };
        let newPlaceInfo = null;

        if (testPlaceInfo?.data?.code === 3001) {
          const postPlaceInfo = await postPlaces(placeInfo);
          newPlaceInfo = postPlaceInfo;
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
            embed: "WRITER",
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
