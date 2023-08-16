import React, { useEffect } from "react";
import { getMarkPlaces } from "api/places";
import { useRouter } from "next/router";
import { useInfiniteQuery, useQuery } from "react-query";

const useGetMarkPlaces = () => {
  const { query } = useRouter();
  const type = Array.isArray(query.type) ? query.type[0] : query.type || "";
  const keyword = Array.isArray(query.keyword)
    ? query.keyword[0]
    : query.keyword || "";

  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["markPlaces", query],
    async ({ pageParam = 0 }) => {
      return await getMarkPlaces({
        type: type,
        keyword: keyword,
        page: pageParam,
        size: 20,
      });
    },

    {
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? false : lastPage.number + 1;
      },
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    refetch({ refetchPage: (page) => page === 0 });
  }, [refetch]);
  return { data, fetchNextPage, hasNextPage };
};

export default useGetMarkPlaces;
