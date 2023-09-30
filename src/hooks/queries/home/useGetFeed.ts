import { reviewsApi } from "api/reviews";
import { getFeedProps } from "models/view/homeModel";
import { useInfiniteQuery } from "react-query";

const useGetFeed = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["feed"],
    async ({ pageParam = 0 }) => await reviewsApi.getFeed(pageParam),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      getNextPageParam: (lastPage: getFeedProps) => {
        return lastPage.isLast ? undefined : lastPage.number + 1;
      },
    }
  );
  return { feedDatas: data?.pages, isLoading, fetchNextPage, hasNextPage };
};

export default useGetFeed;
