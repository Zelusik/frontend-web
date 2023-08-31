import { useInfiniteQuery } from "react-query";
import { getMeetingPlaces } from "api/meeting-places";
import { getFeed } from "api/reviews";
import { getKeyword } from "api/open-api";
import { getMembersSearch } from "api/members";

const useGetSearch = (currentIndex: number, keyword: any): any => {
  const fetchSearch = async ({ pageParam = 0 }) => {
    if (keyword !== "") {
      const params: any =
        currentIndex === 1
          ? {
              category_group_code: "FD6,CE7",
              query: keyword,
              page: pageParam + 1,
              size: 15,
            }
          : {
              params: {
                keyword: keyword,
                page: pageParam,
                size: 15,
              },
            };

      const result =
        currentIndex === 0
          ? await getMeetingPlaces(params)
          : currentIndex === 1
          ? await getKeyword(params)
          : await getMembersSearch(params);
      return result;
    }
  };

  const {
    data: responseData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(["search", currentIndex, keyword], fetchSearch, {
    getNextPageParam: (lastPage: any, allPages: any) => {
      if (lastPage) {
        if (currentIndex === 1) {
          return lastPage?.meta?.is_end ? undefined : allPages.length + 1;
        } else return lastPage.isLast ? undefined : lastPage.number + 1;
      } else {
        return undefined;
      }
    },
  });
  const data = responseData?.pages;
  return { data, isLoading, error, fetchNextPage, hasNextPage, refetch };
};

export default useGetSearch;
