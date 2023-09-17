import { getMarkPlaces } from "api/places";
import { useInfiniteQuery } from "react-query";

const useGetMarkPlaces = ({ type, keyword }: any) => {
  const fetchMarkPlaces = async ({ pageParam = 0 }) => {
    if (keyword !== "") {
      const params: any = {
        type: type,
        keyword: keyword,
        page: pageParam,
        size: 10,
      };
      return await getMarkPlaces(params);
    }
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery([`mark`, keyword], fetchMarkPlaces, {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      getNextPageParam: (lastPage: any) => {
        return lastPage.isLast ? undefined : lastPage.number + 1;
      },
    });
  const markData = data?.pages;
  return {
    markData,
    markLoading: isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  };
};

export default useGetMarkPlaces;
