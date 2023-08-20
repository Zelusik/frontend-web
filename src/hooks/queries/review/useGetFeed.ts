import React from "react";
import { getFeed } from "api/reviews";
import { useInfiniteQuery } from "react-query";

const useGetFeed = () => {
  const {
    data: responseData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["feed"],
    async ({ pageParam = 0 }) => await getFeed(pageParam),
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

export default useGetFeed;
