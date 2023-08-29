import React from "react";
import { getMyReviews } from "api/reviews";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";

const useGetMyReviews = () => {
  const { query } = useRouter();
  const {
    data: responseData,
    isLoading,
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
      enabled: !query.id,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.number + 1;
      },
    }
  );
  const data = responseData?.pages;
  return { data, isLoading, fetchNextPage, hasNextPage };
};

export default useGetMyReviews;
