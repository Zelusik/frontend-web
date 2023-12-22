import { useInfiniteQuery, useQuery } from "react-query";
import { placesApi } from "@/api/places";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { getReviews } from "@/api/reviews";

const useGetReviews = ({ currentIndex, kakaoId, placeId }: any): any => {
  const { placeInfo } = useAppSelector((state) => state.search);

  // 음식점 정보
  const getStoreId = async () => {
    if (kakaoId) {
      const isExistPlace = await placesApi.getExistence(kakaoId);
      if (isExistPlace && isExistPlace.existenceOfPlace) {
        const res = await placesApi.getPlaces(kakaoId);
        return res.id;
      } else {
        const res = await placesApi.postPlaces(placeInfo);
        return res.id;
      }
    } else {
      return placeId;
    }
  };

  // 리뷰 목록 조회
  const getReviewsWithParams = async ({ pageParam = 0 }) => {
    const newId = await getStoreId();

    return getReviews({
      params: {
        placeId: newId ? newId : kakaoId,
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
  } = useInfiniteQuery(
    ["store-detail-reviews", placeId],
    getReviewsWithParams,
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage?.isLast ? undefined : lastPage?.number + 1;
      },
      enabled: currentIndex === 0,
    }
  );
  const reviewDatas = data?.pages;

  return {
    reviewDatas,
    fetchNextPage,
    hasNextPage,
    isReviewsLoading,
  };
};

export default useGetReviews;
