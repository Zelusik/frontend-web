import { useInfiniteQuery, useQuery } from "react-query";
import { placesApi } from "@/api/places";
import { useAppSelector } from "@/hooks/useReduxHooks";

const useGetStoreInfo = ({ kakaoId, placeId }: any): any => {
  const { placeInfo } = useAppSelector((state) => state.search);

  // 음식점 정보
  const getStoreInfo = async () => {
    if (kakaoId) {
      const isExistPlace = await placesApi.getExistence(kakaoId);
      if (isExistPlace && isExistPlace.existenceOfPlace) {
        const res = await placesApi.getPlaces(kakaoId);
        return res;
      } else {
        const res = await placesApi.postPlaces(placeInfo);
        return res;
      }
    } else {
      return await placesApi.getPlacesId(placeId);
    }
  };

  const {
    data: storeInfoData,
    isLoading: isStoreInfoLoading,
    error,
    refetch,
  } = useQuery(["store-detail"], getStoreInfo, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  return {
    storeInfoData,
    isStoreInfoLoading,
    error,
    refetch,
  };
};

export default useGetStoreInfo;
