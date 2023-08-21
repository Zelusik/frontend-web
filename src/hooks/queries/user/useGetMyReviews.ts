import React from "react";
import { getMyReviews } from "api/reviews";
import { useInfiniteQuery } from "react-query";

const useGetMyReviews = () => {
  const {
    data: responseData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["myreview"],
    async ({ pageParam = 0 }) =>
      await getMyReviews({
        page: pageParam,
        size: 20,
      }),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.number + 1;
      },
    }
  );
  const data = responseData?.pages;
  return { data, fetchNextPage, hasNextPage };
};

export default useGetMyReviews;
