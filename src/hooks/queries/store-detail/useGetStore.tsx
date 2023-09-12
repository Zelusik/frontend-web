import { useInfiniteQuery, useQuery } from "react-query";
import { getPlaces, getPlacesId, postPlaces } from "api/places";
import { useAppSelector } from "hooks/useReduxHooks";
import { getReviews } from "api/reviews";

const useGetStore = ({ kakaoId, placeId }: any): any => {
  const { placeInfo } = useAppSelector((state) => state.search);

  // 음식점 정보
  const getStoreInfo = async () => {
    if (kakaoId) {
      const storeInfoData = await getPlaces(kakaoId);

      if (storeInfoData?.data?.code === 3001) {
        return await postPlaces(placeInfo);
      } else {
        return storeInfoData;
      }
    } else {
      return await getPlacesId(placeId);
    }
  };

  const {
    data: storeInfoData,
    isLoading: isStoreInfoLoading,
    error,
    refetch,
  } = useQuery(["search"], getStoreInfo, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  // 리뷰 목록 조회
  const getReviewsWithParams = ({ pageParam = 0 }) => {
    return getReviews({
      params: {
        placeId: placeId || storeInfoData.id,
        page: pageParam,
        size: 10,
        embed: "WRITER",
      },
    });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isReviewsLoading,
  } = useInfiniteQuery(["reviews", placeId], getReviewsWithParams, {
    enabled: Boolean(!isStoreInfoLoading && storeInfoData),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.number + 1;
    },
  });
  const reviewsData = data?.pages;

  return {
    storeInfoData,
    isStoreInfoLoading,
    error,
    refetch,
    reviewsData,
    fetchNextPage,
    hasNextPage,
    isReviewsLoading,
  };
};

export default useGetStore;
