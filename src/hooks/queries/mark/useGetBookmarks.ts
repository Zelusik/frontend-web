import { placesApi } from "api/places";
import { useInfiniteQuery } from "react-query";

const useGetBookmarks = ({ getData, type, keyword }: any) => {
  const fetchBookmarks = async ({ pageParam = 0 }) => {
    if (keyword !== "" && getData) {
      const params: any = {
        type: type,
        keyword: keyword,
        page: pageParam,
        size: 10,
      };
      return await placesApi.getBookmarks(params);
    }
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(["mark", keyword], fetchBookmarks, {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      getNextPageParam: (lastPage: any) => {
        return lastPage.isLast ? undefined : lastPage.number + 1;
      },
    });

  return {
    markDatas: data?.pages,
    isLoadingMark: isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  };
};

export default useGetBookmarks;
